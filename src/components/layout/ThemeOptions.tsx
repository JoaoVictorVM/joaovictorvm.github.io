import { Moon, Sun, type LucideIcon } from "lucide-react";

import { PreferenceGroup } from "@/components/layout/PreferenceGroup";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import type { ThemeMode } from "@/types/preferences";

const icons: Record<ThemeMode, LucideIcon> = {
  light: Sun,
  dark: Moon,
};

const themes: ThemeMode[] = ["light", "dark"];

export function ThemeOptions() {
  const { theme, setTheme } = usePreference();
  const t = useI18n().header.preferences.theme;

  return (
    <PreferenceGroup label={t.label} value={theme} onValueChange={setTheme}>
      {themes.map((option) => {
        const Icon = icons[option];
        return (
          <PreferenceGroup.Option
            key={option}
            value={option}
            label={t.names[option]}
          >
            <Icon size={16} aria-hidden />
          </PreferenceGroup.Option>
        );
      })}
    </PreferenceGroup>
  );
}
