import {
  projectTechnologies,
  type ProjectTechnology,
} from "@/features/projects/data/projects";

/**
 * Filtro da página de projetos, guardado na URL (`?filter=go`). Sem filtro, a
 * URL fica limpa.
 */
export interface ProjectSearch {
  /** Tecnologia dos projetos exibidos. */
  filter?: ProjectTechnology;
}

function isProjectTechnology(value: unknown): value is ProjectTechnology {
  return projectTechnologies.some((technology) => technology === value);
}

/** Aceita só valores conhecidos; o resto da URL é ignorado. */
export function validateProjectSearch(
  search: Record<string, unknown>,
): ProjectSearch {
  return isProjectTechnology(search.filter) ? { filter: search.filter } : {};
}
