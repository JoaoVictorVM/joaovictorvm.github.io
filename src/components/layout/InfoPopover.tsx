import { useEffect, useId, useRef, useState } from "react";

import { iconButtonClassName } from "@/components/ui/iconButton";
import { useI18n } from "@/shared/hooks/useI18n";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

/** A partir de `xl` a navegação fica fixa nos cantos; abaixo, some ao rolar. */
const FIXED_NAV_QUERY = "(min-width: 80rem)";

/**
 * Botão "!" que abre um card de informações logo abaixo dele, no visual do
 * menu de preferências. Não é modal (padrão disclosure): fecha pelo próprio
 * botão, clicando fora ou com Esc. Abaixo de `xl`, fecha ao rolar, já que a
 * barra se esconde. Conteúdo provisório por ora.
 */
export function InfoPopover() {
  const t = useI18n().nav.info;
  const [isOpen, setIsOpen] = useState(false);
  const isFixedNav = useMediaQuery(FIXED_NAV_QUERY);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const close = () => {
      setIsOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        close();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    if (!isFixedNav) {
      window.addEventListener("scroll", close, { passive: true });
    }
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", close);
    };
  }, [isOpen, isFixedNav]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={t.label}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          setIsOpen((open) => !open);
        }}
        className={iconButtonClassName}
      >
        <span aria-hidden className="text-sm">
          !
        </span>
      </button>

      <section
        id={panelId}
        aria-labelledby={titleId}
        hidden={!isOpen}
        className="border-line bg-bg text-text absolute top-full left-0 z-50 mt-1.5 w-64 rounded-lg border p-4 text-xs"
      >
        <h2 id={titleId} className="text-sm font-normal">
          {t.title}
        </h2>
        <p className="text-detail mt-2">{t.body}</p>
      </section>
    </div>
  );
}
