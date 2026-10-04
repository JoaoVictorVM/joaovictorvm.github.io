import type { ShowcaseItem } from "@/features/projects/data/showcase";
import type { Language } from "@/types/preferences";

export interface ShowcaseText {
  title: string;
  description: string;
}

/** Nome e texto curto de um item da vitrine no idioma atual. */
export function getShowcaseText(
  item: ShowcaseItem,
  language: Language,
): ShowcaseText {
  if (item.kind === "callout") {
    return {
      title: item.callout.title[language],
      description: item.callout.details[language],
    };
  }

  return {
    title: item.project.title[language],
    description: item.project.summary[language],
  };
}
