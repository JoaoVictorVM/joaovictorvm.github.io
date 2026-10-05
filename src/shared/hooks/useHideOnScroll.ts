import { useEffect, useState } from "react";

/** Variação mínima (px) de scroll para mudar de estado, ignorando tremidas. */
const SCROLL_TOLERANCE = 4;

/**
 * Indica se um elemento fixo no topo deve se esconder: some ao rolar para baixo
 * e volta ao rolar para cima. Perto do topo (`revealZone`) fica sempre visível.
 */
export function useHideOnScroll(revealZone: number) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y <= revealZone) {
        setIsHidden(false);
      } else if (delta > SCROLL_TOLERANCE) {
        setIsHidden(true);
      } else if (delta < -SCROLL_TOLERANCE) {
        setIsHidden(false);
      }
      if (Math.abs(delta) > SCROLL_TOLERANCE || y <= revealZone) {
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [revealZone]);

  return isHidden;
}
