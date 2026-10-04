import type { KeyboardEvent } from "react";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { ProjectsHeader } from "@/features/projects/components/ProjectsHeader";
import { ShowcaseLink } from "@/features/projects/components/ShowcaseLink";
import { showcaseItems } from "@/features/projects/data/showcase";
import { getShowcaseText } from "@/features/projects/data/showcaseText";
import { useProjectWheel } from "@/features/projects/hooks/useProjectWheel";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";

/**
 * Vitrine de projetos em arco, ocupando uma tela fixa: topo da página e a roda,
 * com espaço embaixo para a alça do rodapé (que nesta página é uma gaveta).
 */
export function ProjectWheel() {
  const { language } = usePreference();
  const t = useI18n().projects;
  const count = showcaseItems.length;
  const { stageRef, wheelRef, cardRefs, rotateTo, onCardClick, wheelHandlers } =
    useProjectWheel(count);

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    const focused = cardRefs.current.findIndex((card) =>
      card?.contains(document.activeElement),
    );
    if (focused === -1) {
      return;
    }
    event.preventDefault();
    // A roda é circular: do primeiro, ← vai ao último (e vice-versa).
    const next =
      (focused + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
    // O foco no card seguinte o centraliza (onFocus → rotateTo).
    cardRefs.current[next]?.querySelector("a")?.focus();
  }

  return (
    <div ref={stageRef} className="flex h-svh flex-col overflow-hidden">
      <div className="pt-16">
        <ProjectsHeader />
      </div>

      {/* `mb-14` reserva o espaço da alça do rodapé, que flutua no fim da tela. */}
      <div
        ref={wheelRef}
        {...wheelHandlers}
        className="relative mb-14 flex-1 touch-none select-none"
      >
        <ul aria-label={t.title} onKeyDown={onListKeyDown}>
          {showcaseItems.map((item, index) => {
            const text = getShowcaseText(item, language);
            return (
              <li
                key={item.key}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                // Largura do conteúdo do site (coluna com o respiro lateral do
                // Container). Invisível até o JS posicionar no arco.
                className="max-w-column absolute left-1/2 w-screen px-4 opacity-0"
              >
                <ShowcaseLink
                  item={item}
                  label={`${text.title}: ${text.description}`}
                  onFocus={() => {
                    rotateTo(index);
                  }}
                  onClick={(event) => {
                    onCardClick(index, event);
                  }}
                >
                  <ProjectCard
                    position={index + 1}
                    title={text.title}
                    cover={
                      item.kind === "project" ? item.project.cover : undefined
                    }
                    isExternal={item.kind === "callout"}
                  />
                </ShowcaseLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
