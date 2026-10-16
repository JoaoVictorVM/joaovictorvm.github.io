/**
 * Busca a atividade do GitHub (calendário de contribuições e último
 * repositório com push) e grava em JSON para o pré-render da home.
 *
 * Roda antes do `dev` e do `build`. O token vem de `GITHUB_TOKEN` (CI) ou do
 * `gh` logado na máquina. No CI, qualquer falha derruba o build: melhor manter
 * no ar o deploy anterior do que publicar a seção sem dados. Fora do CI, a
 * falha só avisa e a home sai sem o gráfico.
 */
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const GITHUB_LOGIN = "JoaoVictorVM";
const OUTPUT_FILE = "src/features/home/data/github-activity.json";

/**
 * Repositórios que não contam como "último ativo": o portfólio, o do perfil e
 * o do currículo (atualizados junto com o site, não são projetos).
 */
const IGNORED_REPOSITORIES = new Set([
  `${GITHUB_LOGIN}.github.io`.toLowerCase(),
  GITHUB_LOGIN.toLowerCase(),
  "resume",
]);

const LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      repositories(
        first: 5
        privacy: PUBLIC
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          url
          description
        }
      }
    }
  }
`;

const isCI = process.env.CI === "true";

function resolveToken() {
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch {
    return undefined;
  }
}

async function fetchActivity(token) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_LOGIN } }),
  });
  if (!response.ok) {
    throw new Error(`GitHub respondeu ${String(response.status)}`);
  }
  const { data, errors } = await response.json();
  if (errors?.length || !data?.user) {
    throw new Error(
      `Consulta GraphQL falhou: ${JSON.stringify(errors ?? "sem dados")}`,
    );
  }

  const { contributionCalendar } = data.user.contributionsCollection;
  const latest = data.user.repositories.nodes.find(
    (repository) => !IGNORED_REPOSITORIES.has(repository.name.toLowerCase()),
  );

  return {
    fetchedAt: new Date().toISOString(),
    totalContributions: contributionCalendar.totalContributions,
    weeks: contributionCalendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVELS[day.contributionLevel] ?? 0,
      })),
    ),
    latestRepository: latest
      ? {
          name: latest.name,
          url: latest.url,
          description: latest.description ?? "",
        }
      : null,
  };
}

try {
  const token = resolveToken();
  if (!token) {
    throw new Error("sem token (defina GITHUB_TOKEN ou faça login no gh)");
  }
  const activity = await fetchActivity(token);
  await mkdir(dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(activity, null, 2)}\n`);
  console.log(
    `[github] ${String(activity.totalContributions)} contribuições, último repositório: ${activity.latestRepository?.name ?? "nenhum"}.`,
  );
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  if (isCI) {
    throw new Error(`[github] atividade não carregada: ${message}`, {
      cause: error,
    });
  }
  console.warn(
    `[github] atividade não carregada (${message}); a home sai sem o gráfico.`,
  );
}
