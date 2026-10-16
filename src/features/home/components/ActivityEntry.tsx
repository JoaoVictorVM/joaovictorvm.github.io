import type { ReactNode } from "react";

interface ActivityEntryProps {
  label: string;
  /** Os `<dd>` com o valor e a linha de apoio. */
  children: ReactNode;
}

/** Par rótulo/valor da lista da seção de atividade (dentro de um `<dl>`). */
export function ActivityEntry({ label, children }: ActivityEntryProps) {
  return (
    <div className="space-y-1">
      <dt className="text-detail text-sm">{label}</dt>
      {children}
    </div>
  );
}
