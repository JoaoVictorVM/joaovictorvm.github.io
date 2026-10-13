import { useEffect, useState } from "react";

export interface CertificateRowHighlight {
  isDimmed: boolean;
  onHoverChange: (isHovered: boolean) => void;
  onTap: () => void;
}

export interface CertificateHighlight {
  /** Certificado em destaque (hover com mouse ou toque no celular). */
  highlightedId: string | null;
  /** Estado e eventos de destaque de uma linha. */
  rowHighlight: (id: string) => CertificateRowHighlight;
}

/**
 * Destaque de um certificado da lista: o hover no mouse, o toque no celular.
 * Destaque vindo de um toque fecha ao tocar fora de uma linha ou rolar a página.
 */
export function useCertificateHighlight(): CertificateHighlight {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [isTapSelection, setIsTapSelection] = useState(false);

  useEffect(() => {
    if (!isTapSelection) {
      return;
    }
    const clear = () => {
      setHighlightedId(null);
      setIsTapSelection(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      const isOnRow =
        event.target instanceof Element &&
        event.target.closest("[data-certificate-row]") !== null;
      if (!isOnRow) {
        clear();
      }
    };
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", clear, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", clear);
    };
  }, [isTapSelection]);

  return {
    highlightedId,
    rowHighlight: (id) => ({
      isDimmed: highlightedId !== null && highlightedId !== id,
      onHoverChange: (isHovered) => {
        // No celular o navegador também simula mouseenter/leave no toque; quem
        // manda ali é o onTap.
        if (!isTapSelection) {
          setHighlightedId(isHovered ? id : null);
        }
      },
      onTap: () => {
        // Tocar de novo no certificado em destaque fecha o preview.
        const isSameSelection = isTapSelection && highlightedId === id;
        setHighlightedId(isSameSelection ? null : id);
        setIsTapSelection(!isSameSelection);
      },
    }),
  };
}
