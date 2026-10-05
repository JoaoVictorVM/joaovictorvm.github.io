import { CircleDot, MousePointer2, type LucideIcon } from "lucide-react";

import { PreferenceGroup } from "@/components/layout/PreferenceGroup";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import type { CursorMode } from "@/types/preferences";

const icons: Record<CursorMode, LucideIcon> = {
  system: MousePointer2,
  custom: CircleDot,
};

const modes: CursorMode[] = ["system", "custom"];

export function CursorOptions() {
  const { cursor, setCursor } = usePreference();
  const t = useI18n().preferences.cursor;

  return (
    <PreferenceGroup label={t.label} value={cursor} onValueChange={setCursor}>
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
