import type { CSSProperties } from "react";
import type { Certificate } from "@/features/certificates/data/certificates";
import type { Language } from "@/types/preferences";

const TYPE_CHAR = 35;
const CASCADE_OVERLAP = 0.55;
const CASCADE_GAP = 80;

/**
 * Atraso (ms) da digitação de cada certificado na primeira entrada da lista:
 * cada um começa antes de o anterior terminar, na ordem recebida.
 */
export function cascadeDelays(
  list: readonly Certificate[],
  language: Language,
): Map<string, number> {
  const delays = new Map<string, number>();
  let delay = 0;
  for (const certificate of list) {
    delays.set(certificate.id, delay);
    delay +=
      certificate.title[language].length * TYPE_CHAR * CASCADE_OVERLAP +
      CASCADE_GAP;
  }
  return delays;
}

interface RevealText {
  title: string;
  date: string;
  /** Só quando a instituição aparece na própria linha (lista sem grupos). */
  institution?: string;
}

/**
 * Variáveis da animação de digitação de uma linha. `null` = sem cascata: o
 * texto aparece de uma vez e quem anima é o fade da linha.
 */
export function revealStyle(
  { title, date, institution }: RevealText,
  delay: number | null,
): CSSProperties {
  const isInstant = delay === null;
  return {
    "--seq-delay": `${String(delay ?? 0)}ms`,
    "--title-chars": isInstant ? 0 : title.length,
    "--date-chars": isInstant ? 0 : date.length,
    ...(institution !== undefined && {
      "--inst-chars": isInstant ? 0 : institution.length,
    }),
  } as CSSProperties;
}
