import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { iconButtonClassName } from "@/components/ui/iconButton";
import { siteNavItems } from "@/shared/config/navigation";
import { useI18n } from "@/shared/hooks/useI18n";

/**
 * Menu hambúrguer com as páginas do site (a atual fica destacada) e, separado
 * no fim, o link para a página de privacidade.
 */
export function NavMenu() {
  const t = useI18n();

  return (
    // Não modal: o modo modal trava o scroll e compensa a barra de rolagem no
    // body, o que desloca a navegação fixa.
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={t.nav.menuLabel}
        className={iconButtonClassName}
      >
        <Menu size={16} aria-hidden />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          collisionPadding={8}
          className="border-line bg-bg z-50 min-w-40 rounded-lg border p-1 text-sm"
        >
          {siteNavItems.map((item) => (
            <DropdownMenu.Item key={item.to} asChild>
              <Link
                to={item.to}
                // A home só é a página atual na raiz; as demais incluem as
                // subpáginas (ex.: /projects/<slug> destaca "Projetos").
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-text" }}
                inactiveProps={{ className: "text-detail" }}
                className="data-highlighted:text-text flex cursor-pointer rounded px-3 py-2 transition-colors outline-none"
              >
                {t.nav.pages[item.label]}
              </Link>
            </DropdownMenu.Item>
          ))}
          {/* Acesso permanente à política e à troca da escolha de cookies. */}
          <DropdownMenu.Separator className="bg-line mx-2 my-1 h-px" />
          <DropdownMenu.Item asChild>
            <Link
              to="/privacy"
              activeProps={{ className: "text-text" }}
              inactiveProps={{ className: "text-detail" }}
              className="data-highlighted:text-text flex cursor-pointer rounded px-3 py-2 text-xs transition-colors outline-none"
            >
              {t.nav.privacy}
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
