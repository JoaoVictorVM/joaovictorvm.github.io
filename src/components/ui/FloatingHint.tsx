import type { ReactNode, Ref } from "react";
import type { HintPlacement } from "@/shared/lib/hintPlacement";
import { cn } from "@/shared/lib/cn";

/** `hover`: aparece ao passar o mouse sobre o `group` pai; `visible`: forçada; `hidden`: nunca. */
export type FloatingHintState = "hidden" | "hover" | "visible";

interface FloatingHintProps {
  id: string;
  placement: HintPlacement;
  state: FloatingHintState;
  /** Ref do balão, para medir o tamanho ao calcular o posicionamento. */
  bubbleRef?: Ref<HTMLSpanElement>;
  children: ReactNode;
}

const bubbleSide = {
  top: "bottom-full mb-2",
  bottom: "top-full mt-2",
} as const;

const bubbleAlign = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
} as const;

// A seta é um quadrado girado 45° com borda só nos lados voltados para o
// elemento; fica sempre centralizada nele, independente do alinhamento do balão.
const arrowSide = {
  top: "bottom-full mb-1 border-r border-b",
  bottom: "top-full mt-1 border-t border-l",
} as const;

/**
 * Tooltip no visual do sistema, com seta apontando para o elemento pai (que
 * deve ter `relative` e `group`). Não recebe eventos de ponteiro, então só o
 * próprio elemento aciona o hover. Ligue-o ao elemento com `aria-describedby={id}`.
 */
export function FloatingHint({
  id,
  placement,
  state,
  bubbleRef,
  children,
}: FloatingHintProps) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
        state === "hover" && "group-hover:opacity-100 group-hover:delay-300",
        state === "visible" && "opacity-100",
      )}
    >
      <span
        ref={bubbleRef}
        id={id}
        role="tooltip"
        className={cn(
          "border-line bg-bg text-detail absolute rounded-lg border px-3 py-1.5 text-xs whitespace-nowrap",
          bubbleSide[placement.side],
          bubbleAlign[placement.align],
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "border-line bg-bg absolute left-1/2 size-2 -translate-x-1/2 rotate-45",
          arrowSide[placement.side],
        )}
      />
    </span>
  );
}
