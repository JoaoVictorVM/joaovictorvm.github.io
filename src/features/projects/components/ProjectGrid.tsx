import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { inlineLinkClass } from "@/components/ui/inlineLink";
import {
  ProjectCard,
  type ProjectCardEmphasis,
} from "@/features/projects/components/ProjectCard";
import {
  allProjectsUrl,
  type Project,
} from "@/features/projects/data/projects";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

interface ProjectGridProps {
  /** Projetos já filtrados. */
  projects: readonly Project[];
}

/**
 * Grade de projetos (2 colunas a partir de `sm`) e o link para todos no GitHub.
 * O card com o mouse (ou o foco do teclado) fica em destaque e os demais
 * esmaecem, como na lista de certificados.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  const t = useI18n().projects;
  const [focusedId, setFocusedId] = useState<string | null>(null);
  // Um projeto que saiu da lista (filtro) não deixa os outros esmaecidos.
  const activeId = projects.some((project) => project.id === focusedId)
    ? focusedId
    : null;

  function emphasisOf(id: string): ProjectCardEmphasis {
    if (activeId === null) {
      return "none";
    }
    return activeId === id ? "focused" : "dimmed";
  }

  return (
    <div className="flex flex-col gap-12">
      {projects.length > 0 ? (
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard
                project={project}
                emphasis={emphasisOf(project.id)}
                onFocusChange={(isFocused) => {
                  setFocusedId((current) => {
                    if (isFocused) {
                      return project.id;
                    }
                    return current === project.id ? null : current;
                  });
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-detail text-sm">{t.controls.empty}</p>
      )}

      <a
        href={allProjectsUrl}
        target="_blank"
        rel="noreferrer"
        className={cn(inlineLinkClass, "self-start")}
      >
        <span>{t.allProjects}</span>
        <ArrowUpRight size={14} aria-hidden className="text-detail" />
      </a>
    </div>
  );
}
