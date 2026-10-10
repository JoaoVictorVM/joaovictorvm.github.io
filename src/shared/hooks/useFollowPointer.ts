import { useEffect, type RefObject } from "react";

/** Fração da distância percorrida por quadro (o atraso suave). */
const FOLLOW = 0.25;
/** Distância (px) entre o ponteiro e o canto do elemento. */
const OFFSET = 20;
/** Respiro mínimo (px) entre o elemento e a borda da tela. */
const MARGIN = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/**
 * Faz um elemento `fixed` (no canto 0,0) acompanhar o ponteiro: com mouse,
 * segue o cursor com um leve atraso; com toque, vai para o ponto tocado. Fica
 * abaixo e à direita do ponteiro, vira para o outro lado perto da borda e é
 * sempre encaixado dentro da tela. Recalcula quando o tamanho do elemento
 * muda (ex.: troca de imagem). Só `transform`, sem re-render. Com movimento
 * reduzido, acompanha sem atraso.
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
    let pointerX = 0;
    let pointerY = 0;
    let x = 0;
    let y = 0;
    let hasPosition = false;
    let frame = 0;

    /** Posição do elemento para o ponteiro atual e o tamanho atual. */
    const target = () => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;
      const right = pointerX + OFFSET;
      const below = pointerY + OFFSET;
      const left =
        right + width <= viewportWidth ? right : pointerX - OFFSET - width;
      const top =
        below + height <= viewportHeight ? below : pointerY - OFFSET - height;
      return {
        x: clamp(left, MARGIN, viewportWidth - width - MARGIN),
        y: clamp(top, MARGIN, viewportHeight - height - MARGIN),
      };
    };

    const render = () => {
      frame = 0;
      const next = target();
      const follow = reducedMotion.matches ? 1 : FOLLOW;
      x += (next.x - x) * follow;
      y += (next.y - y) * follow;
      element.style.transform = `translate3d(${String(x)}px, ${String(y)}px, 0)`;
      if (Math.abs(next.x - x) > 0.1 || Math.abs(next.y - y) > 0.1) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    /** Vai direto para a posição, sem deslizar (primeiro movimento ou toque). */
    const snap = () => {
      const next = target();
      x = next.x;
      y = next.y;
      element.style.transform = `translate3d(${String(x)}px, ${String(y)}px, 0)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!hasPosition) {
        hasPosition = true;
        snap();
      }
      schedule();
    };
    // Toque (ou caneta): não há cursor a seguir, o ponto tocado vira a posição.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      hasPosition = true;
      snap();
    };
    // O tamanho muda quando a imagem troca ou carrega: reencaixa na tela.
    const resizeObserver = new ResizeObserver(() => {
      if (hasPosition) {
        snap();
      }
    });

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    resizeObserver.observe(element);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [ref, isActive]);
}
