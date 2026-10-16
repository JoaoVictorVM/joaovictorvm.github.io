import { locales } from "@/shared/lib/locale";
import type { Language } from "@/types/preferences";

/** "2.924" (PT) ou "2,924" (EN). */
export function formatNumber(value: number, language: Language): string {
  return new Intl.NumberFormat(locales[language]).format(value);
}
