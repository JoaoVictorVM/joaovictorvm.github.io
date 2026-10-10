import type { Language } from "@/types/preferences";

/** Áreas usadas no filtro da página de certificados. */
export const certificateAreas = ["frontend", "backend"] as const;
export type CertificateArea = (typeof certificateAreas)[number];

/** Ordens da lista: `recent` (padrão) pela data; `importance` pelos destaques. */
export const certificateSorts = ["recent", "importance"] as const;
export type CertificateSort = (typeof certificateSorts)[number];

/** 3 = destaque, 2 = relevante, 1 = complementar. */
export type CertificateImportance = 1 | 2 | 3;

/** Imagem exibida no hover: o certificado em si ou uma badge (ex.: AWS, Oracle). */
export interface CertificateImage {
  /** Caminho a partir de `public/` (ex.: "images/certificates/react.webp"). */
  src: string;
  width: number;
  height: number;
  /** `badge` aparece menor e sem moldura (costuma ter fundo transparente). */
  kind: "certificate" | "badge";
}

export interface Certificate {
  id: string;
  institutionId: string;
  institution: string;
  title: {
    pt: string;
    en: string;
  };
  /** Data de conclusão: `"AAAA-MM-DD"` ou, quando só se sabe o ano, `"AAAA"`. */
  issuedAt: string;
  areas: CertificateArea[];
  importance: CertificateImportance;
  image?: CertificateImage;
}

export interface CertificateGroup {
  institutionId: string;
  institution: string;
  certificates: Certificate[];
}

export const certificates: Certificate[] = [
  {
    id: "nlw-operator",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "NLW Operator - FullStack", en: "NLW Operator - FullStack" },
    issuedAt: "2026-03-17",
    areas: ["frontend", "backend"],
    importance: 3,
  },
  {
    id: "nlw-pocket",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "NLW Pocket - FullStack", en: "NLW Pocket - FullStack" },
    issuedAt: "2025-10-10",
    areas: ["frontend", "backend"],
    importance: 2,
  },
  {
    id: "introducao-csharp-dotnet",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "Introdução ao C# e .NET", en: "Introduction to C# & .NET" },
    issuedAt: "2026-03-11",
    areas: ["backend"],
    importance: 2,
  },
  {
    id: "microservices",
    institutionId: "rocketseat",
    institution: "Rocketseat",
    title: { pt: "Microsserviços Escaláveis", en: "Scalable Microservices" },
    issuedAt: "2026-04-01",
    areas: ["backend"],
    importance: 3,
  },
  {
    id: "frontend-backend-uxui-design",
    institutionId: "origamid",
    institution: "Origamid",
    title: {
      pt: "Front-end, Back-end & UX/UI Design",
      en: "Front-End, Back-End & UX/UI Design",
    },
    issuedAt: "2026",
    areas: ["frontend", "backend"],
    importance: 3,
  },
  {
    id: "html-css",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "HTML & CSS", en: "HTML & CSS" },
    issuedAt: "2026-02-06",
    areas: ["frontend"],
    importance: 1,
  },
  {
    id: "jquery",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "JavaScript & jQuery", en: "JavaScript & jQuery" },
    issuedAt: "2026-03-27",
    areas: ["frontend"],
    importance: 1,
  },
  {
    id: "css-flexbox",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS Flexbox", en: "CSS Flexbox" },
    issuedAt: "2026-02-11",
    areas: ["frontend"],
    importance: 1,
  },
  {
    id: "css-grid-layout",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS Grid Layout", en: "CSS Grid Layout" },
    issuedAt: "2026-02-20",
    areas: ["frontend"],
    importance: 1,
  },
  {
    id: "css-avancado",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS Avançado", en: "Advanced CSS" },
    issuedAt: "2026-02-27",
    areas: ["frontend"],
    importance: 2,
  },
  {
    id: "bootstrap",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "Bootstrap", en: "Bootstrap" },
    issuedAt: "2026-03-13",
    areas: ["frontend"],
    importance: 1,
  },
  {
    id: "sass",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "CSS com SASS", en: "CSS with SASS" },
    issuedAt: "2026-03-20",
    areas: ["frontend"],
    importance: 1,
  },
  {
    id: "tailwind-css",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "Tailwind CSS", en: "Tailwind CSS" },
    issuedAt: "2026-03-06",
    areas: ["frontend"],
    importance: 2,
  },
  {
    id: "javascript-es6",
    institutionId: "origamid",
    institution: "Origamid",
    title: {
      pt: "JavaScript Completo ES6",
      en: "Complete JavaScript ES6",
    },
    issuedAt: "2026-09-16",
    areas: ["frontend"],
    importance: 2,
  },
  {
    id: "react",
    institutionId: "origamid",
    institution: "Origamid",
    title: { pt: "React Completo", en: "Complete React" },
    issuedAt: "2026-10-08",
    areas: ["frontend"],
    importance: 3,
    image: {
      src: "images/certificates/react.webp",
      width: 640,
      height: 450,
      kind: "certificate",
    },
  },
];

/** Ordem fixa das instituições na página (a ordem em que aparecem na lista). */
const institutionOrder = [...new Set(certificates.map((c) => c.institutionId))];

/** Data só com o ano vale como o fim daquele ano ao ordenar. */
function sortableDate(issuedAt: string): string {
  return issuedAt.length === 4 ? `${issuedAt}-12-31` : issuedAt;
}

function byMostRecent(a: Certificate, b: Certificate): number {
  return sortableDate(b.issuedAt).localeCompare(sortableDate(a.issuedAt));
}

const comparators: Record<
  CertificateSort,
  (a: Certificate, b: Certificate) => number
> = {
  recent: byMostRecent,
  // Empate de importância: o mais recente primeiro.
  importance: (a, b) => b.importance - a.importance || byMostRecent(a, b),
};

/** `undefined` = todas as áreas. */
export function filterCertificates(
  list: readonly Certificate[],
  area: CertificateArea | undefined,
): Certificate[] {
  return area ? list.filter((c) => c.areas.includes(area)) : [...list];
}

export function sortCertificates(
  list: readonly Certificate[],
  sort: CertificateSort,
): Certificate[] {
  return [...list].sort(comparators[sort]);
}

/**
 * Agrupa por instituição, mantendo a ordem da lista recebida dentro de cada
 * grupo e a ordem fixa entre os grupos. Grupo sem certificados não aparece.
 */
export function groupCertificates(
  list: readonly Certificate[],
): CertificateGroup[] {
  return institutionOrder.flatMap((institutionId) => {
    const items = list.filter((c) => c.institutionId === institutionId);
    const first = items[0];
    return first
      ? [{ institutionId, institution: first.institution, certificates: items }]
      : [];
  });
}

/** "17/03/2026" (PT), "03/17/2026" (EN) ou só "2026". */
export function formatCertificateDate(
  issuedAt: string,
  language: Language,
): string {
  const [year, month, day] = issuedAt.split("-");
  if (!year || !month || !day) {
    return issuedAt;
  }
  return language === "pt"
    ? `${day}/${month}/${year}`
    : `${month}/${day}/${year}`;
}
