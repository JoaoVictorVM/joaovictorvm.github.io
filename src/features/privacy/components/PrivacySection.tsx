import type { ReactNode } from "react";

interface PrivacySectionProps {
  title: string;
  children: ReactNode;
}

export function PrivacySection({ title, children }: PrivacySectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-detail text-sm font-normal">{title}</h2>
      {children}
    </section>
  );
}
