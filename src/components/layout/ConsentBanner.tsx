import { Link } from "@tanstack/react-router";
import { ConsentActions } from "@/components/layout/ConsentActions";
import { useConsent } from "@/shared/hooks/useConsent";
import { useI18n } from "@/shared/hooks/useI18n";

/**
 * Card de consentimento de cookies. Aparece só enquanto a escolha está
 * pendente e depois de ler o navegador, para quem já escolheu nunca ver o card
 * piscar. Não é modal: o site segue navegável, e sem escolha nada é carregado.
 */
export function ConsentBanner() {
  const { choice, isResolved } = useConsent();
  const t = useI18n().consent;

  if (!isResolved || choice !== "pending") {
    return null;
  }

  return (
    <section
      aria-label={t.label}
      className="fast-fade-up border-line bg-bg visible fixed inset-x-4 bottom-4 z-40 rounded-lg border p-4 text-sm delay-350 sm:right-auto sm:max-w-xs"
    >
      <p className="text-detail">
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
