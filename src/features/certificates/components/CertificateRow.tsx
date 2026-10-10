import { cn } from "@/shared/lib/cn";

interface CertificateRowProps {
  title: string;
  date: string;
  isDimmed: boolean;
  onHoverChange: (isHovered: boolean) => void;
  /** Toque (sem mouse): seleciona o certificado, como o hover faz com mouse. */
  onTap: () => void;
}

/**
 * Faixa do título até a data: só ela aciona o destaque (hover com mouse, toque
 * no celular). O atributo marca a faixa para "tocar fora" fechar o destaque.
 */
export function CertificateRow({
  title,
  date,
  isDimmed,
  onHoverChange,
  onTap,
}: CertificateRowProps) {
  return (
    <div
      data-certificate-row
      // Só no fim do toque: arrastar para rolar vira pointercancel, não abre.
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") {
          onTap();
        }
      }}
      onMouseEnter={() => {
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        onHoverChange(false);
      }}
      className="text-detail hover:text-text/80 flex items-center justify-between gap-3 px-2 py-4 transition-colors md:pr-0 md:pl-3"
    >
      <span
        className={cn(
          "project-title text-sm font-normal transition-colors duration-150",
          isDimmed ? "text-detail" : "text-text",
        )}
      >
        {title}
      </span>
      <span className="project-date text-detail hidden text-right text-sm sm:block">
        {date}
      </span>
    </div>
  );
}
