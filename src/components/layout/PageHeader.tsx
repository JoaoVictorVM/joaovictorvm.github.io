import type { ReactNode } from "react";
import { useReveal } from "@/shared/hooks/useReveal";
import { cn } from "@/shared/lib/cn";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  /** Controle alinhado à direita do título (ex.: filtro da lista). */
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  const { ref, isVisible } = useReveal();

  return (
    <div ref={ref} className="mb-10 flex items-start justify-between gap-4">
      <div>
        <h1
          className={cn(
            "fast-fade-up text-text text-lg delay-200",
            isVisible && "visible",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "fast-fade-up text-detail text-sm delay-250",
            isVisible && "visible",
          )}
        >
          {subtitle}
        </p>
      </div>
      {action && (
        <div
          className={cn(
            "fast-fade-up shrink-0 delay-250",
            isVisible && "visible",
          )}
        >
          {action}
        </div>
      )}
    </div>
  );
}
