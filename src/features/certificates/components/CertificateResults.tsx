import { useI18n } from "@/shared/hooks/useI18n";

interface CertificateResultsProps {
  shown: number;
  total: number;
  /** Filtro e ordem no padrão: nada a mostrar. */
  isDefault: boolean;
  onClear: () => void;
}

/**
 * Retorno do filtro acima da lista ("9 de 13 certificados · Limpar"). A região
 * existe sempre, para leitores de tela anunciarem a mudança.
 */
export function CertificateResults({
  shown,
  total,
  isDefault,
  onClear,
}: CertificateResultsProps) {
  const { count, controls } = useI18n().certificates;
  const noun = total === 1 ? count.one : count.other;

  return (
    <div aria-live="polite" className="text-detail text-xs">
      {!isDefault && (
        <p className="mb-6 flex items-center gap-2">
          <span>
            {shown} {controls.of} {total} {noun}
          </span>
          <span aria-hidden>·</span>
          <button
            type="button"
            onClick={onClear}
            className="text-text decoration-text/30 hover:decoration-text cursor-pointer underline underline-offset-4 transition-colors"
          >
            {controls.clear}
          </button>
        </p>
      )}
    </div>
  );
}
