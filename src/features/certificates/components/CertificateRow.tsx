import { cn } from "@/shared/lib/cn";

interface CertificateRowProps {
  title: string;
  date: string;
  isDimmed: boolean;
  onHoverChange: (isHovered: boolean) => void;
}

/** Faixa do título até a data: só ela aciona o destaque do hover. */
export function CertificateRow({
  title,
  date,
  isDimmed,
  onHoverChange,
}: CertificateRowProps) {
  return (
    <div
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
