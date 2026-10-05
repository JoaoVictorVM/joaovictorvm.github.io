import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Settings2 } from "lucide-react";

import { LanguageOptions } from "@/components/layout/LanguageOptions";
import { ThemeOptions } from "@/components/layout/ThemeOptions";
import { iconButtonClassName } from "@/components/ui/iconButton";
import { useI18n } from "@/shared/hooks/useI18n";

/** Menu de preferências (idioma e tema) da navegação. */
export function PreferencesMenu() {
  const t = useI18n();

  return (
    // Não modal: o modo modal trava o scroll e compensa a barra de rolagem no
    // body, o que desloca a navegação fixa.
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={t.preferences.label}
        className={iconButtonClassName}
      >
        <Settings2 size={16} aria-hidden />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          collisionPadding={8}
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
