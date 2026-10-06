import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { ConsentActions } from "@/components/layout/ConsentActions";
import { useConsent } from "@/shared/hooks/useConsent";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

/**
 * Card de consentimento de cookies. Aparece enquanto a escolha está pendente
 * (depois de ler o navegador, para quem já escolheu nunca ver o card piscar) ou
 * quando reaberto pelo botão "Cookies". Não é modal: o site segue navegável, e
 * sem escolha nada é carregado. Reaberto, ganha foco e pode ser fechado (× ou
 * Esc) sem mudar a escolha.
 */
export function ConsentBanner() {
  const { choice, isPromptOpen, closePrompt } = useConsent();
  const t = useI18n().consent;
  const sectionRef = useRef<HTMLElement>(null);
  const isReopened = isPromptOpen && choice !== "pending";

  useEffect(() => {
    if (!isReopened) {
      return;
    }
    sectionRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePrompt();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isReopened, closePrompt]);

  if (!isPromptOpen) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-label={t.label}
      tabIndex={-1}
      className={cn(
        "fast-fade-up border-line bg-bg visible fixed inset-x-4 bottom-4 z-40 rounded-lg border p-4 text-sm sm:right-auto sm:max-w-xs xl:bottom-16 xl:left-8",
        // Na primeira visita entra depois da página; reaberto, na hora.
        !isReopened && "delay-350",
      )}
    >
      {isReopened && (
        <button
          type="button"
          aria-label={t.close}
          onClick={closePrompt}
          className="text-detail hover:text-text absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors"
        >
          <X size={14} aria-hidden />
        </button>
      )}
      <p className={cn("text-detail", isReopened && "pr-6")}>
        {t.message}{" "}
        <Link
          to="/privacy"
          className="text-text decoration-text/30 hover:decoration-text underline underline-offset-4 transition-colors"
        >
          {t.learnMore}
        </Link>
      </p>
      <ConsentActions className="mt-4" />
    </section>
  );
}
