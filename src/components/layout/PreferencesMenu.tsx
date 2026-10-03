import { useCallback, useEffect, useId, useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Settings2 } from "lucide-react";

import { LanguageOptions } from "@/components/layout/LanguageOptions";
import { ThemeOptions } from "@/components/layout/ThemeOptions";
import {
  FloatingHint,
  type FloatingHintState,
} from "@/components/ui/FloatingHint";
import { useDraggable } from "@/shared/hooks/useDraggable";
import { useFirstVisitHint } from "@/shared/hooks/useFirstVisitHint";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";
import {
  computeHintPlacement,
  type HintPlacement,
} from "@/shared/lib/hintPlacement";

const DRAG_HINT_STORAGE_KEY = "portfolio-drag-hint";
/** Espera a animação de entrada do botão (header-enter) antes da dica. */
const DRAG_HINT_DELAY_MS = 800;
const DRAG_HINT_DURATION_MS = 3000;

export function PreferencesMenu() {
  const t = useI18n();
  const hintId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const hintBubbleRef = useRef<HTMLSpanElement>(null);
  const [hintPlacement, setHintPlacement] = useState<HintPlacement>({
    side: "top",
    align: "end",
  });
  const isFirstVisitHintVisible = useFirstVisitHint({
    storageKey: DRAG_HINT_STORAGE_KEY,
    delayMs: DRAG_HINT_DELAY_MS,
    durationMs: DRAG_HINT_DURATION_MS,
  });

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const toggleMenu = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const { ref, offset, isDragging, handlers } = useDraggable<HTMLButtonElement>(
    {
      onDragStart: closeMenu,
      onTap: toggleMenu,
    },
  );

  // Recalcula onde a dica abre a partir da posição atual do botão: ao montar,
  // quando a dica de primeira visita aparece e a cada hover, já que o botão pode
  // ter sido arrastado.
  const updateHintPlacement = useCallback(() => {
    const anchor = ref.current?.getBoundingClientRect();
    const bubble = hintBubbleRef.current;
    if (!anchor || !bubble) {
      return;
    }
    setHintPlacement(
      computeHintPlacement(
        anchor,
        { width: bubble.offsetWidth, height: bubble.offsetHeight },
        document.documentElement.clientWidth,
      ),
    );
  }, [ref]);

  useEffect(() => {
    updateHintPlacement();
  }, [updateHintPlacement, isFirstVisitHintVisible]);

  let hintState: FloatingHintState = "hover";
  if (isOpen || isDragging) {
    hintState = "hidden";
  } else if (isFirstVisitHintVisible) {
    hintState = "visible";
  }

  return (
    // Não modal: o modo modal trava o scroll e compensa a barra de rolagem no
    // body, o que desloca elementos fixos como este botão.
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      {/* O deslocamento do arrasto fica no wrapper para a dica acompanhar o botão. */}
      <span
        onPointerEnter={updateHintPlacement}
        style={{
          transform: `translate3d(${String(offset.x)}px, ${String(offset.y)}px, 0)`,
        }}
        className={cn(
          "preferences-trigger group pointer-events-auto relative inline-flex",
          isDragging && "will-change-transform",
        )}
      >
        <DropdownMenu.Trigger
          ref={ref}
          aria-label={t.preferences.label}
          aria-describedby={hintId}
          {...handlers}
          onPointerDown={(event) => {
            // Impede o Radix de abrir no pointerdown: quem decide entre toque
            // (abre/fecha) e arrasto é o useDraggable, no pointerup.
            event.preventDefault();
            handlers.onPointerDown(event);
          }}
          className={cn(
            "border-line bg-bg text-text hover:border-text flex size-9 touch-none items-center justify-center rounded-full border transition-colors select-none",
            isDragging ? "cursor-grabbing" : "cursor-pointer",
          )}
        >
          <Settings2 size={16} aria-hidden />
        </DropdownMenu.Trigger>
        <FloatingHint
          id={hintId}
          placement={hintPlacement}
          state={hintState}
          bubbleRef={hintBubbleRef}
        >
          {t.preferences.dragHint}
        </FloatingHint>
      </span>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          collisionPadding={8}
          onPointerDownOutside={(event) => {
            // O toque no próprio botão é tratado pelo onTap (que fecha o menu);
            // sem isso o menu fecharia aqui e reabriria no pointerup.
            if (
              event.target instanceof Node &&
              ref.current?.contains(event.target)
            ) {
              event.preventDefault();
            }
          }}
          className="border-line bg-bg text-text z-50 rounded-lg border p-1 text-xs"
        >
          <LanguageOptions />
          <DropdownMenu.Separator className="bg-line mx-2 my-1 h-px" />
          <ThemeOptions />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
