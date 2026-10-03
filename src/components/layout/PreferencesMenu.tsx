import { useCallback, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Settings2 } from "lucide-react";

import { LanguageOptions } from "@/components/layout/LanguageOptions";
import { ThemeOptions } from "@/components/layout/ThemeOptions";
import { useDraggable } from "@/shared/hooks/useDraggable";
import { useI18n } from "@/shared/hooks/useI18n";
import { cn } from "@/shared/lib/cn";

export function PreferencesMenu() {
  const t = useI18n();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    // Não modal: o modo modal trava o scroll e compensa a barra de rolagem no
    // body, o que desloca elementos fixos como este botão.
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenu.Trigger
        ref={ref}
        aria-label={t.preferences.label}
        {...handlers}
        onPointerDown={(event) => {
          // Impede o Radix de abrir no pointerdown: quem decide entre toque
          // (abre/fecha) e arrasto é o useDraggable, no pointerup.
          event.preventDefault();
          handlers.onPointerDown(event);
        }}
        style={{
          transform: `translate3d(${String(offset.x)}px, ${String(offset.y)}px, 0)`,
        }}
        className={cn(
          "preferences-trigger border-line bg-bg text-text hover:border-text pointer-events-auto flex size-9 touch-none items-center justify-center rounded-full border transition-colors select-none",
          isDragging
            ? "cursor-grabbing will-change-transform"
            : "cursor-pointer",
        )}
      >
        <Settings2 size={16} aria-hidden />
      </DropdownMenu.Trigger>

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
