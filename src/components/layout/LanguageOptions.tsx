import type { ComponentType, SVGProps } from "react";

import { PreferenceGroup } from "@/components/layout/PreferenceGroup";
import {
  BrazilFlagIcon,
  UnitedStatesFlagIcon,
} from "@/components/ui/FlagIcons";
import { usePreference } from "@/shared/hooks/usePreference";
import { useI18n } from "@/shared/hooks/useI18n";
import type { Language } from "@/types/preferences";

const flags: Record<Language, ComponentType<SVGProps<SVGSVGElement>>> = {
  pt: BrazilFlagIcon,
  en: UnitedStatesFlagIcon,
};

const languages: Language[] = ["pt", "en"];

export function LanguageOptions() {
  const { language, setLanguage } = usePreference();
  const t = useI18n().preferences.language;

  return (
    <PreferenceGroup
      label={t.label}
      value={language}
      onValueChange={setLanguage}
    >
      {languages.map((option) => {
        const Flag = flags[option];
        return (
          <PreferenceGroup.Option
            key={option}
            value={option}
            label={t.names[option]}
          >
            <Flag
              aria-hidden
              className="size-5 opacity-60 transition-opacity group-aria-checked:opacity-100 group-data-highlighted:opacity-100"
            />
          </PreferenceGroup.Option>
        );
      })}
    </PreferenceGroup>
  );
}
