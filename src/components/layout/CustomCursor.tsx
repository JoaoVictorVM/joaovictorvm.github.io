import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { usePreference } from "@/shared/hooks/usePreference";

/** Aparelho com mouse: o único em que o cursor personalizado faz sentido. */
export const MOUSE_QUERY = "(hover: hover) and (pointer: fine)";

/** Elementos que contam como clicáveis: o cursor vira o círculo invertido. */
const CLICKABLE_SELECTOR =
  'a[href], button, [role="button"], [role^="menuitem"], summary, label, select, .cursor-pointer';
/** Fração da distância que o círculo percorre por frame (o "atraso" suave). */
const RING_FOLLOW = 0.2;
/** Classe no <html> que esconde o cursor do sistema (só com o personalizado ativo). */
const ACTIVE_CLASS = "has-custom-cursor";

/**
 * Cursor personalizado: uma bolinha que segue o mouse e um círculo que a
 * acompanha com atraso; sobre algo clicável, viram um círculo maior com as
 * cores invertidas; ao clicar (em qualquer lugar), o círculo encolhe e a bolinha
 * cresce enquanto o botão está pressionado (estilos em globals.css). Só com mouse e com a preferência
 * ligada. O cursor do sistema só é escondido depois do primeiro movimento,
 * para nunca deixar a página sem cursor se algo falhar.
 */
export function CustomCursor() {
  const { cursor } = usePreference();
  const hasMouse = useMediaQuery(MOUSE_QUERY);
  const isEnabled = cursor === "custom" && hasMouse;
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!isEnabled || !root || !dot || !ring) {
      return;
    }

    const html = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;
    let isVisible = false;

    const render = () => {
      frame = 0;
      const follow = reducedMotion.matches ? 1 : RING_FOLLOW;
      ringX += (x - ringX) * follow;
      ringY += (y - ringY) * follow;
      dot.style.transform = `translate3d(${String(x)}px, ${String(y)}px, 0)`;
      ring.style.transform = `translate3d(${String(ringX)}px, ${String(ringY)}px, 0)`;
      // Continua animando até o círculo alcançar a bolinha.
      if (Math.abs(x - ringX) > 0.1 || Math.abs(y - ringY) > 0.1) {
        frame = window.requestAnimationFrame(render);
      }
    };
    const schedule = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }
      x = event.clientX;
      y = event.clientY;
      if (!isVisible) {
        // Primeiro movimento (ou volta à janela): o círculo nasce no lugar certo.
        isVisible = true;
        ringX = x;
        ringY = y;
        root.dataset.visible = "true";
        html.classList.add(ACTIVE_CLASS);
      }
      schedule();
    };
    const onPointerOver = (event: PointerEvent) => {
      const isClickable =
        event.target instanceof Element &&
        event.target.closest(CLICKABLE_SELECTOR) !== null;
      root.dataset.hover = String(isClickable);
    };
    const onMouseLeave = () => {
      isVisible = false;
      root.dataset.visible = "false";
    };
    // Clique (em qualquer lugar): enquanto pressionado, círculo encolhe e bolinha cresce.
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button === 0) {
        root.dataset.pressed = "true";
      }
    };
    const onPointerRelease = () => {
      root.dataset.pressed = "false";
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    // Captura: o clique é percebido mesmo que algum elemento pare a propagação.
    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    document.addEventListener("pointerup", onPointerRelease, { capture: true });
    document.addEventListener("pointercancel", onPointerRelease, {
      capture: true,
    });
    window.addEventListener("blur", onPointerRelease);
    html.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
      document.removeEventListener("pointerup", onPointerRelease, {
        capture: true,
      });
      document.removeEventListener("pointercancel", onPointerRelease, {
        capture: true,
      });
      window.removeEventListener("blur", onPointerRelease);
      html.removeEventListener("mouseleave", onMouseLeave);
      window.cancelAnimationFrame(frame);
      html.classList.remove(ACTIVE_CLASS);
      root.dataset.visible = "false";
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-visible="false"
      data-hover="false"
      data-pressed="false"
      className="custom-cursor"
    >
      <div ref={ringRef} className="custom-cursor-ring">
        <span />
      </div>
      <div ref={dotRef} className="custom-cursor-dot">
        <span />
      </div>
    </div>
  );
}
