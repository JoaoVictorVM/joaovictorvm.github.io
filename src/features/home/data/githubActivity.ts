/** 0 = sem contribuições … 4 = o quartil mais ativo (escala do GitHub). */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** `"AAAA-MM-DD"`. */
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface LatestRepository {
  name: string;
  url: string;
  description: string;
}

export interface GithubActivity {
  totalContributions: number;
  /** Semanas do calendário (domingo a sábado), da mais antiga à atual. */
  weeks: ContributionDay[][];
  latestRepository: LatestRepository | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPresent<T>(value: T | null): value is T {
  return value !== null;
}

function isLevel(value: unknown): value is ContributionLevel {
  return (
    value === 0 || value === 1 || value === 2 || value === 3 || value === 4
  );
}

function parseDay(value: unknown): ContributionDay | null {
  if (
    !isRecord(value) ||
    typeof value.date !== "string" ||
    typeof value.count !== "number" ||
    !isLevel(value.level)
  ) {
    return null;
  }
  return { date: value.date, count: value.count, level: value.level };
}

function parseWeek(value: unknown): ContributionDay[] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const days = value.map(parseDay);
  return days.every(isPresent) ? days : null;
}

function parseRepository(value: unknown): LatestRepository | null {
  if (
    !isRecord(value) ||
    typeof value.name !== "string" ||
    typeof value.url !== "string" ||
    typeof value.description !== "string"
  ) {
    return null;
  }
  return { name: value.name, url: value.url, description: value.description };
}

/**
 * Valida o JSON gerado por `scripts/fetch-github-activity.mjs`. Formato
 * inesperado = sem dados (a seção sai sem o gráfico), em vez de quebrar a home.
 */
function parseGithubActivity(value: unknown): GithubActivity | null {
  if (
    !isRecord(value) ||
    typeof value.totalContributions !== "number" ||
    !Array.isArray(value.weeks)
  ) {
    return null;
  }
  const weeks = value.weeks.map(parseWeek);
  if (!weeks.every(isPresent)) {
    return null;
  }
  return {
    totalContributions: value.totalContributions,
    weeks,
    latestRepository: parseRepository(value.latestRepository),
  };
}

// O JSON é gerado no build e fica fora do git: com o glob, a falta do arquivo
// (clone novo, sem token) vira "sem dados" em vez de erro de import.
const generated = import.meta.glob<unknown>("./github-activity.json", {
  eager: true,
  import: "default",
});

/** Atividade do GitHub no momento do build; `null` se não foi possível buscar. */
export const githubActivity: GithubActivity | null = parseGithubActivity(
  generated["./github-activity.json"],
);
