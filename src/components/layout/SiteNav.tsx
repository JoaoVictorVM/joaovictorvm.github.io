import { Link } from "@tanstack/react-router";

import { InfoDialog } from "@/components/layout/InfoDialog";
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
  const isHidden = useHideOnScroll(REVEAL_ZONE);

  return (
    <div
      className={cn(
        "site-nav pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-between px-4 transition-transform duration-300 motion-reduce:transition-none xl:top-16 xl:px-8",
        isHidden && "max-xl:-translate-y-24",
      )}
    >
      <div className="header-enter pointer-events-auto flex gap-2">
        <Link
          to="/"
          aria-label={nav.logoLabel}
          className={cn(iconButtonClassName, "text-2xs")}
        >
          &lt;J/&gt;
        </Link>
        <InfoDialog />
      </div>
      <div className="header-enter pointer-events-auto flex gap-2">
        <PreferencesMenu />
        <NavMenu />
      </div>
    </div>
  );
}
