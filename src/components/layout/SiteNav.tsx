import { Link } from "@tanstack/react-router";

import { InfoPopover } from "@/components/layout/InfoPopover";
import { NavMenu } from "@/components/layout/NavMenu";
import { PreferencesMenu } from "@/components/layout/PreferencesMenu";
import { iconButtonClassName } from "@/components/ui/iconButton";
import { useHideOnScroll } from "@/shared/hooks/useHideOnScroll";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

/** Faixa do topo em que a navegação nunca se esconde (o `pt-16` das páginas). */
const REVEAL_ZONE = 64;

/**
 * Navegação fixa nos cantos da tela: logo e informações à esquerda,
 * preferências e menu à direita. A partir de `xl` fica na altura do título das
 * páginas, sempre visível; abaixo disso vira uma linha no topo que some ao rolar
 * para baixo e volta ao rolar para cima. Só os botões recebem ponteiro.
 */
export function SiteNav() {
  const { nav } = useI18n();
  const { isHidden, isPastRevealZone } = useHideOnScroll(REVEAL_ZONE);

  return (
    <div
      className={cn(
        "site-nav pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-between px-4 transition-transform duration-300 motion-reduce:transition-none xl:top-16 xl:px-8",
        isHidden && "max-xl:-translate-y-24",
      )}
    >
      {/* Abaixo de xl, a barra fica sobre o conteúdo ao rolar: um degradê da
          cor do fundo atrás dos botões destaca a barra e apaga o texto que
          passa por baixo. Desde o topo da tela (o -top-4 compensa o top-4). */}
      <div
        aria-hidden
        className={cn(
          "from-bg absolute inset-x-0 -top-4 -z-10 h-24 bg-linear-to-b from-60% to-transparent opacity-0 transition-opacity duration-300 motion-reduce:transition-none xl:hidden",
          isPastRevealZone && "opacity-100",
        )}
      />
      <div className="header-enter pointer-events-auto flex gap-2">
        <Link
          to="/"
          aria-label={nav.logoLabel}
          className={cn(iconButtonClassName, "text-2xs")}
        >
          &lt;J/&gt;
        </Link>
        <InfoPopover />
      </div>
      <div className="header-enter pointer-events-auto flex gap-2">
        <PreferencesMenu />
        <NavMenu />
      </div>
    </div>
  );
}
