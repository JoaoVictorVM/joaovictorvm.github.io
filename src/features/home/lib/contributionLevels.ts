import type { ContributionLevel } from "@/features/home/data/githubActivity";

/** Níveis do gráfico, do menos ao mais ativo (ordem da legenda). */
export const contributionLevels: readonly ContributionLevel[] = [0, 1, 2, 3, 4];

/**
 * Escala monocromática, toda derivada da cor do texto: assim os degraus ficam
 * distinguíveis nos dois temas (com `bg-line` no nível 0, o tema claro quase
 * não separava o 0 do 1).
 */
export const levelClasses: Record<ContributionLevel, string> = {
  0: "contribution-level-0 bg-text/10",
  1: "contribution-level-1 bg-text/30",
  2: "contribution-level-2 bg-text/50",
  3: "contribution-level-3 bg-text/75",
  4: "contribution-level-4 bg-text",
};
