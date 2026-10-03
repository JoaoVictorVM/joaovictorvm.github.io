export {};

declare global {
  interface Window {
    /** Fila de comandos lida pelo gtag.js. */
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /** Desligamento oficial do GA por ID (`ga-disable-G-XXXX`): `true` interrompe os envios. */
    [disableFlag: `ga-disable-${string}`]: boolean | undefined;
  }
}
