import { useEffect, useMemo, useState, type ReactNode } from "react";
import type {
  BackgroundMode,
  CursorMode,
  Language,
  ThemeMode,
} from "@/types/preferences";
import {
  PreferenceContext,
  type PreferenceContextValue,
} from "@/context/preferenceContext";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const THEME_STORAGE_KEY = "portfolio-theme";
const CURSOR_STORAGE_KEY = "portfolio-cursor";
const BACKGROUND_STORAGE_KEY = "portfolio-background";

export function PreferenceProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [language, setLanguage] = useState<Language>("pt");
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [cursor, setCursor] = useState<CursorMode>("custom");
  const [background, setBackground] = useState<BackgroundMode>("dots");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage === "pt" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }

    const storedCursor = window.localStorage.getItem(CURSOR_STORAGE_KEY);
    if (storedCursor === "system" || storedCursor === "custom") {
      setCursor(storedCursor);
    }

    const storedBackground = window.localStorage.getItem(
      BACKGROUND_STORAGE_KEY,
    );
    if (storedBackground === "plain" || storedBackground === "dots") {
      setBackground(storedBackground);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(CURSOR_STORAGE_KEY, cursor);
  }, [cursor]);

  useEffect(() => {
    window.localStorage.setItem(BACKGROUND_STORAGE_KEY, background);
  }, [background]);

  const value = useMemo<PreferenceContextValue>(
    () => ({
      language,
      theme,
      cursor,
      background,
      setLanguage,
      setTheme,
      setCursor,
      setBackground,
    }),
    [language, theme, cursor, background],
  );

  return (
    <PreferenceContext.Provider value={value}>
      {children}
    </PreferenceContext.Provider>
  );
}
