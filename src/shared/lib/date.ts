import { locales } from "@/shared/lib/locale";
import type { Language } from "@/types/preferences";

export type DateFormat = "long" | "short" | "month";

const formats: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  long: { day: "2-digit", month: "long", year: "numeric" },
  short: { day: "2-digit", month: "short", year: "numeric" },
  /** Só o mês abreviado: "out." (PT), "Oct" (EN). */
  month: { month: "short" },
};

/**
 * Formata uma data ISO (YYYY-MM-DD) no idioma da interface. O horário fixo em
 * meio-dia UTC evita que o fuso do visitante empurre a data para o dia anterior.
 */
export function formatDate(
  iso: string,
  language: Language,
  format: DateFormat = "long",
): string {
  const date = new Date(`${iso}T12:00:00Z`);

  return new Intl.DateTimeFormat(locales[language], {
    ...formats[format],
    timeZone: "UTC",
  }).format(date);
}
