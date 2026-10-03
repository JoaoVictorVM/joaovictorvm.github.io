export type HintSide = "top" | "bottom";
export type HintAlign = "start" | "center" | "end";

export interface HintPlacement {
  side: HintSide;
  align: HintAlign;
}

/** Distância entre o balão e o elemento (equivale ao `mb-2`/`mt-2` do FloatingHint). */
const HINT_GAP = 8;
/** Folga mínima entre o balão e as bordas da viewport. */
const VIEWPORT_GUTTER = 8;

/**
 * Escolhe onde abrir uma dica em relação ao elemento âncora: em cima, salvo
 * quando não há espaço até o topo da tela; centralizada, salvo quando passaria
 * de uma das laterais — aí se alinha à borda do elemento daquele lado.
 */
export function computeHintPlacement(
  anchor: DOMRect,
  hint: { width: number; height: number },
  viewportWidth: number,
): HintPlacement {
  const side: HintSide =
    anchor.top - HINT_GAP - hint.height < VIEWPORT_GUTTER ? "bottom" : "top";

  const center = anchor.left + anchor.width / 2;
  const halfWidth = hint.width / 2;
  let align: HintAlign = "center";
  if (center + halfWidth > viewportWidth - VIEWPORT_GUTTER) {
    align = "end";
  } else if (center - halfWidth < VIEWPORT_GUTTER) {
    align = "start";
  }

  return { side, align };
}
