import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
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
import { cn } from "@/shared/lib/cn";

/** `focused`: o card em destaque; `dimmed`: outro card está em destaque. */
export type ProjectCardEmphasis = "none" | "focused" | "dimmed";

interface ProjectCardProps {
  project: Project;
  emphasis: ProjectCardEmphasis;
  /** Mouse ou foco do teclado entrando (true) ou saindo (false) do card. */
  onFocusChange: (isFocused: boolean) => void;
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
 * houver, o projeto no ar) e a descrição curta. O card inteiro leva à página
 * do projeto: o nome é o link, e uma camada dele (`after:`) cobre o card — sem
 * link dentro de link. Os botões ficam acima dessa camada.
 */
export function ProjectCard({
  project,
  emphasis,
  onFocusChange,
}: ProjectCardProps) {
  const { language } = usePreference();
  const t = useI18n().projects;
  const title = project.title[language];
  const repository = getProjectLink(project, "repository");
  const live = getProjectLink(project, "live");
  const { cover } = project;
  const coverClassName = cn(
    "aspect-video w-full rounded-2xl border transition-colors",
    emphasis === "focused" ? "border-text" : "border-line",
  );

  return (
    <article
      onMouseEnter={() => {
        onFocusChange(true);
      }}
      onMouseLeave={() => {
        onFocusChange(false);
      }}
      onFocus={() => {
        onFocusChange(true);
      }}
      onBlur={(event) => {
        // Só sai do destaque quando o foco deixa o card (não entre os links dele).
        if (
          !(event.relatedTarget instanceof Node) ||
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          onFocusChange(false);
        }
      }}
      className={cn(
        "relative flex flex-col gap-4 transition-opacity duration-200 motion-reduce:transition-none",
        emphasis === "dimmed" && "opacity-40",
      )}
    >
      {cover ? (
        <img
          src={asset(cover.src)}
          alt={cover.alt[language]}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          decoding="async"
          className={cn(coverClassName, "object-cover")}
        />
      ) : (
        // Capa provisória até as imagens dos projetos chegarem.
        <div
          aria-hidden
          className={cn(
            coverClassName,
            "text-detail flex items-center justify-center p-4 text-center text-sm",
          )}
        >
          {title}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-text font-normal">
            <Link
              to="/projects/$slug"
              params={{ slug: project.id }}
              // A camada `after:` cobre o card inteiro; o anel de foco vai nela.
              className="focus-visible:after:outline-text after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-solid"
            >
              {title}
            </Link>
          </h2>
          <div className="relative z-10 flex shrink-0 items-center gap-2">
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
