/** Aparelho com mouse: o único em que os efeitos de cursor fazem sentido. */
export const MOUSE_QUERY = "(hover: hover) and (pointer: fine)";

/** Elementos que contam como clicáveis (cursor invertido, sem onda no fundo). */
export const CLICKABLE_SELECTOR =
  'a[href], button, [role="button"], [role^="menuitem"], summary, label, select, .cursor-pointer';

/** Se o alvo de um evento está dentro de algo clicável. */
export function isClickableTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element && target.closest(CLICKABLE_SELECTOR) !== null
  );
}
