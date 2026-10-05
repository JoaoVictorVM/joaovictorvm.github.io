import type { Dictionary } from "@/shared/i18n/dictionary";

export type SiteNavLabel = keyof Omit<Dictionary["footer"]["nav"], "title">;

export interface SiteNavItem {
  to: "/" | "/about" | "/projects" | "/certificates" | "/blog" | "/gamedev";
  label: SiteNavLabel;
}

/** Páginas do site, na ordem de leitura: menu de navegação e rodapé. */
export const siteNavItems: readonly SiteNavItem[] = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/gamedev", label: "gamedev" },
  { to: "/projects", label: "projects" },
  { to: "/certificates", label: "certificates" },
  { to: "/blog", label: "blog" },
];
