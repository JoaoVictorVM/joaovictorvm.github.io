import { useConsent } from "@/shared/hooks/useConsent";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

interface ConsentActionsProps {
  /** Chamado depois de qualquer escolha (ex.: exibir uma confirmação). */
  onChoice?: () => void;
  className?: string;
}

// Mesmo peso visual para as duas opções: recusar tem que ser tão fácil quanto aceitar.
const buttonClassName =
  "border-line text-text hover:border-text cursor-pointer rounded-full border px-4 py-1.5 text-xs transition-colors";

/** Botões Recusar/Aceitar, usados no banner e na página de privacidade. */
export function ConsentActions({ onChoice, className }: ConsentActionsProps) {
  const { grant, deny } = useConsent();
  const t = useI18n().consent;

  return (
    <div className={cn("flex gap-2", className)}>
      <button
        type="button"
        onClick={() => {
          deny();
          onChoice?.();
        }}
        className={buttonClassName}
      >
        {t.decline}
      </button>
      <button
        type="button"
        onClick={() => {
          grant();
          onChoice?.();
        }}
        className={buttonClassName}
      >
        {t.accept}
      </button>
    </div>
  );
}
