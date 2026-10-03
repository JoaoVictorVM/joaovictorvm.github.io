import { createContext } from "react";
import type { Language, ThemeMode } from "@/types/preferences";

export interface PreferenceContextValue {
  language: Language;
  theme: ThemeMode;
  setLanguage: (language: Language) => void;
  setTheme: (theme: ThemeMode) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

export const PreferenceContext = createContext<PreferenceContextValue | null>(
  null,
);
