import { ArrowUpRight } from "lucide-react";
import { inlineLinkClass } from "@/components/ui/inlineLink";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { allProjectsUrl, projects } from "@/features/projects/data/projects";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

/** Grade de projetos (2 colunas a partir de `sm`) e o link para todos no GitHub. */
export function ProjectGrid() {
  const t = useI18n().projects;

  return (
    <div className="flex flex-col gap-12">
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

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
