import { createContext } from "react";
import type { CursorMode, Language, ThemeMode } from "@/types/preferences";

export interface PreferenceContextValue {
  language: Language;
  theme: ThemeMode;
  cursor: CursorMode;
  setLanguage: (language: Language) => void;
  setTheme: (theme: ThemeMode) => void;
  setCursor: (cursor: CursorMode) => void;
}

export const PreferenceContext = createContext<PreferenceContextValue | null>(
  null,
);
