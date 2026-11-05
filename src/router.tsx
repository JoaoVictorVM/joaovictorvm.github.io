import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/** Caminho pré-renderizado como `404.html` (ver `vite.config.ts`). */
const NOT_FOUND_PATH = "/__not-found";

export function getRouter() {
  const router = createRouter({
    routeTree,
    basepath: import.meta.env.BASE_URL,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultViewTransition: true,
  });

  // O host entrega o mesmo `404.html` em qualquer URL inexistente, mas o id de
  // cada match do router inclui a URL. Sem igualar os ids, o cliente descarta o
  // estado pré-renderizado e a hidratação falha (React #418). Por isso, nessa
  // página, o router enxerga a URL atual como o caminho pré-renderizado; o
  // endereço na barra do navegador não muda.
  router.update({
    dehydrate: () => ({
      isNotFoundPage: router.latestLocation.pathname === NOT_FOUND_PATH,
    }),
    hydrate: ({ isNotFoundPage }) => {
      if (!isNotFoundPage) return;

      const publicPath = window.location.pathname;
      router.update({
        rewrite: {
          input: ({ url }) => {
            if (url.pathname === publicPath) url.pathname = NOT_FOUND_PATH;
            return url;
          },
          output: ({ url }) => {
            if (url.pathname === NOT_FOUND_PATH) url.pathname = publicPath;
            return url;
          },
        },
      });
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
