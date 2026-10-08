import {
  certificateAreas,
  type CertificateArea,
  type CertificateSort,
} from "@/features/certificates/data/certificates";

/**
 * Filtro e ordem da página de certificados, guardados na URL
 * (`?filter=frontend&sort=importance`). O padrão ("todas" e "mais recentes")
 * não aparece na URL.
 */
export interface CertificateSearch {
  /** Área dos certificados exibidos. */
  filter?: CertificateArea;
  sort?: Exclude<CertificateSort, "recent">;
}

function isCertificateArea(value: unknown): value is CertificateArea {
  return certificateAreas.some((area) => area === value);
}

/** Aceita só valores conhecidos; o resto da URL é ignorado. */
export function validateCertificateSearch(
  search: Record<string, unknown>,
): CertificateSearch {
  const result: CertificateSearch = {};
  if (isCertificateArea(search.filter)) {
    result.filter = search.filter;
  }
  if (search.sort === "importance") {
    result.sort = "importance";
  }
  return result;
}
