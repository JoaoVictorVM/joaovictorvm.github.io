import { useEffect, useId, useState } from "react";
import { ChevronUp } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

/**
 * Rodapé recolhível para páginas que ocupam a tela toda: fechado, fica fora da
 * tela e só a alça aparece no fim dela; a alça abre e fecha (Esc também fecha).
 * Fechado, o conteúdo fica `inert` para não receber foco estando invisível.
 */
export function FooterDrawer() {
  const t = useI18n().footer.drawer;
  const contentId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 motion-reduce:transition-none",
        isOpen ? "translate-y-0" : "translate-y-full",
      )}
    >
      {/* A alça acompanha a borda de cima do rodapé: fechado, fica no fim da tela. */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={isOpen ? t.close : t.open}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
        className="text-detail hover:text-text absolute bottom-full left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 px-6 pt-2 pb-3 transition-colors"
      >
        <ChevronUp
          size={16}
          aria-hidden
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
        <span aria-hidden className="bg-line h-1 w-10 rounded-full" />
      </button>

      <div id={contentId} inert={!isOpen}>
        <Footer />
      </div>
    </div>
  );
}
