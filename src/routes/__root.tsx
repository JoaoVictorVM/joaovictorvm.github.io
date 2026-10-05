/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PreferenceProvider } from "@/context/PreferenceProvider";
import { ConsentProvider } from "@/context/ConsentProvider";
import { ConsentAnalytics } from "@/components/layout/ConsentAnalytics";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { DotBackground } from "@/components/layout/DotBackground";
import { NotFound } from "@/components/layout/NotFound";
import { ErrorFallback } from "@/components/layout/ErrorFallback";
import { siteConfig } from "@/shared/config/site";
import { asset } from "@/shared/lib/asset";
import { baseMeta, personJsonLd } from "@/shared/lib/seo";
import appCss from "@/shared/styles/globals.css?url";
import "@fontsource-variable/inter";

const preferenceScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('portfolio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}d.dataset.theme=t;var l=localStorage.getItem('portfolio-language');if(l==='pt'||l==='en'){d.dataset.language=l;d.lang=l==='pt'?'pt-BR':'en';}}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: siteConfig.themeColor },
      ...baseMeta(),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: asset("logo/logo.svg") },
      { rel: "manifest", href: asset("site.webmanifest") },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personJsonLd),
      },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  errorComponent: (props) => (
    <RootDocument>
      <ErrorFallback {...props} />
    </RootDocument>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
        <HeadContent />
      </head>
      <body>
        <PreferenceProvider>
          <ConsentProvider>
            {/* No começo do DOM para teclado e leitor de tela o encontrarem logo. */}
            <ConsentBanner />
            <ConsentAnalytics />
            {children}
          </ConsentProvider>
          <DotBackground />
          <CustomCursor />
        </PreferenceProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
