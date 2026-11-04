import type { ReactNode } from "react";

interface AboutBlockProps {
  title: string;
  children: ReactNode;
}

export function AboutBlock({ title, children }: AboutBlockProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-detail type-decoration">{title}</h2>
      {children}
    </section>
  );
}
