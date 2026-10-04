import type { ReactNode } from "react";
import { useMatches } from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { FooterDrawer } from "@/components/layout/FooterDrawer";
import { PreferencesDock } from "@/components/layout/PreferencesDock";
import { SkipLink } from "@/components/layout/SkipLink";
import { useLanguageTransition } from "@/shared/hooks/useLanguageTransition";

export function Shell({ children }: Readonly<{ children: ReactNode }>) {
  const mainRef = useLanguageTransition<HTMLElement>();
  // Rotas que ocupam a tela toda pedem o rodapé como gaveta (staticData.footer).
  const hasFooterDrawer = useMatches({
    select: (matches) =>
      matches.some((match) => match.staticData.footer === "drawer"),
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <PreferencesDock />
      <main ref={mainRef} id="conteudo" className="flex-1">
        {children}
      </main>
      {hasFooterDrawer ? <FooterDrawer /> : <Footer />}
    </div>
  );
}
