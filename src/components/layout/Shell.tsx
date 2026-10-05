import type { ReactNode } from "react";
import { SiteNav } from "@/components/layout/SiteNav";
import { SkipLink } from "@/components/layout/SkipLink";
import { useLanguageTransition } from "@/shared/hooks/useLanguageTransition";

export function Shell({ children }: Readonly<{ children: ReactNode }>) {
  const mainRef = useLanguageTransition<HTMLElement>();

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <SiteNav />
      <main ref={mainRef} id="conteudo" className="flex-1">
        {children}
      </main>
    </div>
  );
}
