import { Grip, Square, type LucideIcon } from "lucide-react";

import { PreferenceGroup } from "@/components/layout/PreferenceGroup";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import type { BackgroundMode } from "@/types/preferences";

const icons: Record<BackgroundMode, LucideIcon> = {
  plain: Square,
  dots: Grip,
};

const modes: BackgroundMode[] = ["plain", "dots"];

export function BackgroundOptions() {
  const { background, setBackground } = usePreference();
  const t = useI18n().preferences.background;

  return (
    <PreferenceGroup
      label={t.label}
      value={background}
      onValueChange={setBackground}
    >
      {modes.map((option) => {
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
