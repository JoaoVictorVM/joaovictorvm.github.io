import { useEffect, type RefObject } from "react";

/** Fração da distância percorrida por quadro (o atraso suave). */
const FOLLOW = 0.25;
/** Distância (px) entre o cursor e o canto do elemento. */
const OFFSET = 20;

/**
 * Faz um elemento `fixed` (no canto 0,0) acompanhar o mouse com um leve atraso,
 * abaixo e à direita do cursor; perto da borda da tela ele vira para o outro
 * lado. Só `transform` a cada quadro, sem re-render. Ao ficar ativo, nasce já
 * na posição do cursor. Com movimento reduzido, acompanha sem atraso.
 */
export function useFollowPointer(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
) {
  useEffect(() => {
    const element = ref.current;
    if (!isActive || !element) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let hasPosition = false;
    let frame = 0;

    const render = () => {
      frame = 0;
      const follow = reducedMotion.matches ? 1 : FOLLOW;
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      element.style.transform = `translate3d(${String(x)}px, ${String(y)}px, 0)`;
      if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const fitsRight =
        event.clientX + OFFSET + width <= document.documentElement.clientWidth;
      const fitsBelow = event.clientY + OFFSET + height <= window.innerHeight;
      targetX = fitsRight
        ? event.clientX + OFFSET
        : event.clientX - OFFSET - width;
      targetY = fitsBelow
        ? event.clientY + OFFSET
        : event.clientY - OFFSET - height;
      if (!hasPosition) {
        // Primeiro movimento desde que ficou ativo: sem deslizar do canto.
        hasPosition = true;
        x = targetX;
        y = targetY;
      }
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, [ref, isActive]);
}
