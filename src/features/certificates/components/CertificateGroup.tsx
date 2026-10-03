import type { CSSProperties, ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface CertificateGroupProps {
  value: string;
  institution: string;
  /** Texto exibido no lugar dos certificados quando o grupo está recolhido. */
  summary: string;
  isOpen: boolean;
  /** Atraso (ms) da animação de entrada da instituição e da linha do grupo. */
  revealDelay: number;
  onExpand: () => void;
  children: ReactNode;
}

export function CertificateGroup({
  value,
  institution,
  summary,
  isOpen,
  revealDelay,
  onExpand,
  children,
}: CertificateGroupProps) {
  return (
    <Accordion.Item
      value={value}
      className="mt-4 md:mt-0"
      style={
        {
          "--seq-delay": `${String(revealDelay)}ms`,
          "--inst-chars": institution.length,
        } as CSSProperties
      }
    >
      <div className="group-line" />
      <div className="md:grid-certificate md:grid">
        <Accordion.Header asChild>
          <h2 className="md:self-start">
            <Accordion.Trigger className="text-detail hover:text-text flex cursor-pointer items-center px-2 pb-3 text-sm transition-colors md:px-0 md:py-4">
              <span className="project-institution inline-flex items-center gap-1">
                {institution}
                <ChevronDown
                  size={14}
                  aria-hidden
                  className={cn(
                    "shrink-0 transition-transform duration-200",
                    !isOpen && "-rotate-90",
                  )}
                />
              </span>
            </Accordion.Trigger>
          </h2>
        </Accordion.Header>

        <div className="min-w-0">
          {!isOpen && (
            // Atalho só para o mouse: o controle acessível é o botão da instituição.
            <div
              onClick={onExpand}
              className="fast-fade-up text-detail hover:text-text/80 visible cursor-pointer px-2 py-4 text-sm transition-colors md:pr-0 md:pl-3"
            >
              {summary}
            </div>
          )}
          <Accordion.Content className="accordion-content">
            {children}
          </Accordion.Content>
        </div>
      </div>
    </Accordion.Item>
  );
}
