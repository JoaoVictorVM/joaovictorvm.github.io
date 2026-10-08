import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import type {
  CertificateArea,
  CertificateSort,
} from "@/features/certificates/data/certificates";
import type { CertificateSearch } from "@/features/certificates/lib/certificateSearch";
import { useIsHydrated } from "@/shared/hooks/useIsHydrated";

const routeApi = getRouteApi("/_site/certificates");

export interface CertificateView {
  /** Área filtrada; `undefined` = todas. */
  filter: CertificateArea | undefined;
  sort: CertificateSort;
  /** Filtro e ordem no padrão (nada a limpar). */
  isDefault: boolean;
  /** A lista já mudou nesta visita (ou chegou filtrada pelo link). */
  hasChanged: boolean;
  setFilter: (filter: CertificateArea | undefined) => void;
  setSort: (sort: CertificateSort) => void;
  reset: () => void;
}

/**
 * Filtro e ordem dos certificados, lidos e escritos na URL. Até hidratar vale o
 * padrão, igual ao HTML pré-renderizado (que não conhece a query).
 */
export function useCertificateView(): CertificateView {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const isHydrated = useIsHydrated();
  const [hasInteracted, setHasInteracted] = useState(false);

  const filter = isHydrated ? search.filter : undefined;
  const sort: CertificateSort =
    (isHydrated ? search.sort : undefined) ?? "recent";
  const isDefault = filter === undefined && sort === "recent";

  function update(change: (current: CertificateSearch) => CertificateSearch) {
    setHasInteracted(true);
    void navigate({
      search: change,
      resetScroll: false,
      // Trocar o filtro não é trocar de página: sem a transição de rota.
      viewTransition: false,
    });
  }

  return {
    filter,
    sort,
    isDefault,
    hasChanged: hasInteracted || !isDefault,
    setFilter: (next) => {
      update(({ sort: currentSort }) =>
        withoutDefaults({ filter: next, sort: currentSort }),
      );
    },
    setSort: (next) => {
      update(({ filter: currentFilter }) =>
        withoutDefaults({
          filter: currentFilter,
          sort: next === "recent" ? undefined : next,
        }),
      );
    },
    reset: () => {
      update(() => ({}));
    },
  };
}

/** Remove as chaves vazias, para a URL não ganhar `?filter=` à toa. */
function withoutDefaults(search: CertificateSearch): CertificateSearch {
  const result: CertificateSearch = {};
  if (search.filter) {
    result.filter = search.filter;
  }
  if (search.sort) {
    result.sort = search.sort;
  }
  return result;
}
