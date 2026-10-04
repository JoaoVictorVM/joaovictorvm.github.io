import type { FocusEventHandler, MouseEventHandler, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { ShowcaseItem } from "@/features/projects/data/showcase";
import { cn } from "@/shared/lib/cn";

interface ShowcaseLinkProps {
  item: ShowcaseItem;
  /** Rótulo acessível completo (nome + resumo). */
  label: string;
  className?: string;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

/** Link de um item da vitrine: página do projeto ou, no convite final, o GitHub. */
export function ShowcaseLink({
  item,
  label,
  className,
  onFocus,
  onClick,
  children,
}: ShowcaseLinkProps) {
  const classes = cn("group block rounded-2xl", className);

  if (item.kind === "callout") {
    return (
      <a
        href={item.callout.link.url}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        draggable={false}
        onFocus={onFocus}
        onClick={onClick}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to="/projects/$slug"
      params={{ slug: item.project.id }}
      aria-label={label}
      draggable={false}
      onFocus={onFocus}
      onClick={onClick}
      className={classes}
    >
      {children}
    </Link>
  );
}
