import { createContext } from "react";
import type {
  BackgroundMode,
  CursorMode,
  Language,
  ThemeMode,
} from "@/types/preferences";

export interface PreferenceContextValue {
  language: Language;
  theme: ThemeMode;
  cursor: CursorMode;
  background: BackgroundMode;
  setLanguage: (language: Language) => void;
  setTheme: (theme: ThemeMode) => void;
  setCursor: (cursor: CursorMode) => void;
  setBackground: (background: BackgroundMode) => void;
}

export const PreferenceContext = createContext<PreferenceContextValue | null>(
  null,
);
