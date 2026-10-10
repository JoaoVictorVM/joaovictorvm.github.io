import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { iconButtonClassName } from "@/components/ui/iconButton";
import {
  getProjectLink,
  type Project,
} from "@/features/projects/data/projects";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import { asset } from "@/shared/lib/asset";

interface ProjectCardProps {
  project: Project;
}

interface CardIconLinkProps {
  href: string;
  label: string;
  children: ReactNode;
}

function CardIconLink({ href, label, children }: CardIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={iconButtonClassName}
    >
      {children}
    </a>
  );
}

/**
 * Card de um projeto na grade: capa, nome com os links (repositório e, se
 * houver, o projeto no ar) e a descrição curta. O card em si não é clicável.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = usePreference();
  const t = useI18n().projects;
  const title = project.title[language];
  const repository = getProjectLink(project, "repository");
  const live = getProjectLink(project, "live");
  const { cover } = project;

  return (
    <article className="flex flex-col gap-4">
      {cover ? (
        <img
          src={asset(cover.src)}
          alt={cover.alt[language]}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          decoding="async"
          className="border-line aspect-video w-full rounded-2xl border object-cover"
        />
      ) : (
        // Capa provisória até as imagens dos projetos chegarem.
        <div
          aria-hidden
          className="border-line text-detail flex aspect-video items-center justify-center rounded-2xl border p-4 text-center text-sm"
        >
          {title}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-text font-normal">{title}</h2>
          <div className="flex shrink-0 items-center gap-2">
            {repository && (
              <CardIconLink
                href={repository.url}
                label={`${title} ${t.repositoryLabel}`}
              >
                <GithubIcon aria-hidden className="size-4" />
              </CardIconLink>
            )}
            {live && (
              <CardIconLink href={live.url} label={`${t.liveLabel} ${title}`}>
                <ArrowUpRight size={16} aria-hidden />
              </CardIconLink>
            )}
          </div>
        </div>
        <p className="text-detail text-sm">{project.summary[language]}</p>
      </div>
    </article>
  );
}
