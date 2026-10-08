import { useEffect, useState } from "react";

/** Variação mínima (px) de scroll para mudar de estado, ignorando tremidas. */
const SCROLL_TOLERANCE = 4;

interface HideOnScrollState {
  /** Deve se esconder (rolando para baixo, fora do topo). */
  isHidden: boolean;
  /** Já rolou além do topo (`revealZone`): há conteúdo passando por baixo. */
  isPastRevealZone: boolean;
}

/**
 * Indica se um elemento fixo no topo deve se esconder: some ao rolar para baixo
 * e volta ao rolar para cima. Perto do topo (`revealZone`) fica sempre visível.
 */
export function useHideOnScroll(revealZone: number): HideOnScrollState {
  const [isHidden, setIsHidden] = useState(false);
  const [isPastRevealZone, setIsPastRevealZone] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      setIsPastRevealZone(y > revealZone);
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

    // Carregar a página já rolada (voltar no histórico, âncora) também conta.
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [revealZone]);

  return { isHidden, isPastRevealZone };
}
