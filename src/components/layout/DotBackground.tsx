import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { usePreference } from "@/shared/hooks/usePreference";
import { createDotField } from "@/shared/lib/dotField";
import { isClickableTarget, MOUSE_QUERY } from "@/shared/lib/pointer";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Largura da coluna de conteúdo (px), lida do token `--container-column`. */
function readColumnWidth(html: HTMLElement): number {
  const styles = getComputedStyle(html);
  const rem = Number.parseFloat(styles.fontSize);
  return Number.parseFloat(styles.getPropertyValue("--container-column")) * rem;
}

function readDotColor(html: HTMLElement): string {
  return getComputedStyle(html).getPropertyValue("--detail-color").trim();
}

/**
 * Fundo pontilhado das laterais (motor em `dotField.ts`). Fica atrás de todo o
 * conteúdo e nunca recebe clique: os eventos são ouvidos no documento. Só com
 * mouse e com a preferência ligada; com movimento reduzido, a grade fica parada.
 */
export function DotBackground() {
  const { background } = usePreference();
  const hasMouse = useMediaQuery(MOUSE_QUERY);
  const isStatic = useMediaQuery(REDUCED_MOTION_QUERY);
  const isEnabled = background === "dots" && hasMouse;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isEnabled || !canvas) {
      return;
    }

    const html = document.documentElement;
    const columnWidth = readColumnWidth(html);
    const field = createDotField(canvas, {
      columnWidth,
      color: readDotColor(html),
      isStatic,
    });

    // O tema muda pelo atributo no <html>; observar o atributo evita depender
    // da ordem dos efeitos do PreferenceProvider.
    const themeObserver = new MutationObserver(() => {
      field.setColor(readDotColor(html));
    });
    themeObserver.observe(html, { attributeFilter: ["data-theme"] });

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        field.setPointer(event.clientX, event.clientY);
      }
    };
    // Onda só ao clicar nas laterais, fora de links e botões.
    const onPointerDown = (event: PointerEvent) => {
      const isOutsideColumn =
        Math.abs(event.clientX - html.clientWidth / 2) > columnWidth / 2;
      if (
        event.pointerType === "mouse" &&
        event.button === 0 &&
        isOutsideColumn &&
        !isClickableTarget(event.target)
      ) {
        field.ripple(event.clientX, event.clientY);
      }
    };
    const onMouseLeave = () => {
      field.clearPointer();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    // Captura: percebe o clique mesmo que algum elemento pare a propagação.
    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    html.addEventListener("mouseleave", onMouseLeave);

    return () => {
      themeObserver.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
      html.removeEventListener("mouseleave", onMouseLeave);
      field.destroy();
    };
  }, [isEnabled, isStatic]);

  if (!isEnabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 size-full"
    />
  );
}
