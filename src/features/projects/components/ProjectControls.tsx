import { Funnel } from "lucide-react";
import { OptionsMenu } from "@/components/ui/OptionsMenu";
import {
  countTechnologies,
  projects,
  technologyLabels,
  type ProjectTechnology,
} from "@/features/projects/data/projects";
import type { ProjectView } from "@/features/projects/hooks/useProjectView";
import { useI18n } from "@/shared/hooks/useI18n";

type FilterOption = ProjectTechnology | "all";

/** Opções do filtro, das tecnologias mais usadas para as menos. */
const technologyCounts = countTechnologies(projects);

interface ProjectControlsProps {
  view: ProjectView;
}

/** Botão de filtro da página de projetos (por tecnologia). */
export function ProjectControls({ view }: ProjectControlsProps) {
  const t = useI18n().projects.controls;
  const isActive = view.filter !== undefined;

  return (
    <OptionsMenu
      label={isActive ? t.activeLabel : t.label}
      icon={<Funnel size={16} aria-hidden />}
      hasActiveOptions={isActive}
    >
      <OptionsMenu.Group<FilterOption>
        label={t.filter}
        value={view.filter ?? "all"}
        onValueChange={(next) => {
          view.setFilter(next === "all" ? undefined : next);
        }}
      >
        <OptionsMenu.Option value="all">{t.all}</OptionsMenu.Option>
        {technologyCounts.map(({ technology, count }) => (
          <OptionsMenu.Option key={technology} value={technology}>
            <span className="flex items-baseline gap-2">
              {/* O espaço some no flex, mas separa nome e número no leitor de tela. */}
              {technologyLabels[technology]}{" "}
              <span className="text-detail">{count}</span>
            </span>
          </OptionsMenu.Option>
        ))}
      </OptionsMenu.Group>
    </OptionsMenu>
  );
}
