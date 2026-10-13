import {
  certificateAreas,
  type CertificateArea,
  type CertificateGrouping,
  type CertificateSort,
} from "@/features/certificates/data/certificates";

/**
 * Filtro, ordem e agrupamento da página de certificados, guardados na URL
 * (`?filter=frontend&sort=importance&group=none`). O padrão ("todas", "mais
 * recentes" e "por instituição") não aparece na URL.
 */
export interface CertificateSearch {
  /** Área dos certificados exibidos. */
  filter?: CertificateArea;
  sort?: Exclude<CertificateSort, "recent">;
  group?: Exclude<CertificateGrouping, "institution">;
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
  if (search.group === "none") {
    result.group = "none";
  }
  return result;
}
