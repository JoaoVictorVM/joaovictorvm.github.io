import { siteConfig } from "@/shared/config/site";

const MEASUREMENT_ID = siteConfig.analyticsId;
const DISABLE_FLAG = `ga-disable-${MEASUREMENT_ID}` as const;
const ANALYTICS_COOKIE_PATTERN = /^_ga(_|$)/;

let isScriptInjected = false;

/** Só o site publicado envia dados: nem `pnpm dev` nem `pnpm preview` local. */
function isPublishedSite(): boolean {
  return (
    import.meta.env.PROD &&
    window.location.hostname === new URL(siteConfig.url).hostname
  );
}

/**
 * Liga o Google Analytics. Idempotente: o gtag.js é injetado uma única vez;
 * chamadas seguintes só retiram o desligamento (ex.: recusou e depois aceitou).
 * Páginas da SPA, cliques externos e downloads ficam com a medição otimizada
 * configurada no painel do GA, por isso não há `page_view` manual aqui.
 */
export function enableAnalytics() {
  if (!isPublishedSite()) {
    console.info(
      "[analytics] consentido, mas o GA só carrega no site publicado.",
    );
    return;
  }

  window[DISABLE_FLAG] = false;
  if (isScriptInjected) {
    return;
  }
  isScriptInjected = true;

  const dataLayer = (window.dataLayer ??= []);
  window.gtag = function gtag() {
    // O gtag.js só reconhece o objeto `arguments` na fila; com um array de rest
    // params os comandos são ignorados.
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Interrompe os envios na hora e apaga os cookies do GA (`_ga`, `_ga_*`). */
export function disableAnalytics() {
  window[DISABLE_FLAG] = true;

  const { hostname } = window.location;
  const domains = ["", `; domain=${hostname}`, `; domain=.${hostname}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim() ?? "";
    if (!ANALYTICS_COOKIE_PATTERN.test(name)) {
      continue;
    }
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}
