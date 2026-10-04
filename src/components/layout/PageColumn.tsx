import type { ReactNode } from "react";
import { BackLink } from "@/components/layout/BackLink";

interface PageColumnProps {
  backLabel: string;
  backTo?: "/" | "/blog" | "/projects";
  children: ReactNode;
}

/**
 * Coluna de leitura de uma página interna. Estabelece o contexto de
 * posicionamento das faixas laterais — o link de volta e, no post, o convite
 * para contato — que acompanham a rolagem ao longo de todo o conteúdo.
 */
export function PageColumn({ backLabel, backTo, children }: PageColumnProps) {
  return (
    <div className="relative">
      <BackLink label={backLabel} to={backTo} />
      {children}
    </div>
  );
}
