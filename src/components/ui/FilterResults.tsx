import { useI18n } from "@/shared/hooks/useI18n";

interface FilterResultsProps {
  shown: number;
  total: number;
  /** Nome dos itens no singular e no plural (ex.: certificado/certificados). */
  noun: { one: string; other: string };
  /** Há filtro ou ordem fora do padrão: mostra a contagem e o "Limpar". */
  isActive: boolean;
  onClear: () => void;
}

/**
 * Retorno de um filtro acima da lista ("9 de 13 certificados · Limpar"). A
 * região existe sempre, para leitores de tela anunciarem a mudança.
 */
export function FilterResults({
  shown,
  total,
  noun,
  isActive,
  onClear,
}: FilterResultsProps) {
  const t = useI18n().common.filterResults;

  return (
    <div aria-live="polite" className="text-detail text-xs">
      {isActive && (
        <p className="mb-6 flex items-center gap-2">
          <span>
            {shown} {t.of} {total} {total === 1 ? noun.one : noun.other}
          </span>
          <span aria-hidden>·</span>
          <button
            type="button"
            onClick={onClear}
            className="text-text decoration-text/30 hover:decoration-text cursor-pointer underline underline-offset-4 transition-colors"
          >
            {t.clear}
          </button>
        </p>
      )}
    </div>
  );
}
