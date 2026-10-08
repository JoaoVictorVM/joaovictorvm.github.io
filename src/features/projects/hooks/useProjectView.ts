import { getRouteApi } from "@tanstack/react-router";
import type { ProjectTechnology } from "@/features/projects/data/projects";
import { useIsHydrated } from "@/shared/hooks/useIsHydrated";

const routeApi = getRouteApi("/_site/projects/");

export interface ProjectView {
  /** Tecnologia filtrada; `undefined` = todas. */
  filter: ProjectTechnology | undefined;
  setFilter: (filter: ProjectTechnology | undefined) => void;
}

/**
 * Filtro dos projetos, lido e escrito na URL. Até hidratar vale "todas", igual
 * ao HTML pré-renderizado (que não conhece a query).
 */
export function useProjectView(): ProjectView {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const isHydrated = useIsHydrated();

  return {
    filter: isHydrated ? search.filter : undefined,
    setFilter: (next) => {
      void navigate({
        search: next ? { filter: next } : {},
        resetScroll: false,
        // Trocar o filtro não é trocar de página: sem a transição de rota.
        viewTransition: false,
      });
    },
  };
}
