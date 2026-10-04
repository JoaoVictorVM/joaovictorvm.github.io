import "@tanstack/react-router";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    /** `drawer`: a rota ocupa a tela toda e o rodapé vira uma gaveta recolhível. */
    footer?: "drawer";
  }
}
