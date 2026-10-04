import { Link } from "@tanstack/react-router";
import { cn } from "@/shared/lib/cn";

interface BackLinkProps {
  label: string;
  to?: "/" | "/blog" | "/projects";
  className?: string;
}

/**
 * Link de volta exibido na margem esquerda da coluna de leitura. A partir de
 * `md` ele ocupa uma faixa da altura toda da página e acompanha a rolagem;
 * abaixo disso volta ao fluxo, acima do título.
 */
export function BackLink({ label, to = "/", className }: BackLinkProps) {
  return (
    <div className="md:absolute md:inset-y-0 md:left-0 md:-translate-x-38">
      <Link
        to={to}
        className={cn(
          "text-detail hover:text-text mb-4 block text-sm font-normal italic transition-colors md:sticky md:top-16 md:mb-0",
          className,
        )}
      >
        {label}
      </Link>
    </div>
  );
}
