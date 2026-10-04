import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectFigure } from "@/features/projects/components/ProjectFigure";
import type { Project } from "@/features/projects/data/projects";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";

interface ProjectDetailProps {
  project: Project;
}

function DetailSection({
  title,
  children,
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-detail text-sm font-normal">{title}</h2>
      {children}
    </section>
  );
}

/** Conteúdo da página de um projeto: capa, descrição, stack, galeria e links. */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const { language } = usePreference();
  const t = useI18n().projects;
  const { cover, gallery = [], stack = [], links = [] } = project;

  return (
    <div className="text-text flex flex-col gap-10">
      {cover && <ProjectFigure image={cover} isPriority />}

      <p>{project.details[language]}</p>

      {stack.length > 0 && (
        <DetailSection title={t.stackLabel}>
          <p className="text-detail">{stack.join(" · ")}</p>
        </DetailSection>
      )}

      {gallery.length > 0 && (
        <DetailSection title={t.galleryLabel}>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((image) => (
              <ProjectFigure key={image.src} image={image} />
            ))}
          </div>
        </DetailSection>
      )}

      {links.length > 0 && (
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="decoration-text/30 hover:decoration-text inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
              >
                {link.label[language]}
                <ArrowUpRight size={14} aria-hidden className="text-detail" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
