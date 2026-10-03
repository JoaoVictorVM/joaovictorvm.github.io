import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Language, ThemeMode } from "@/types/preferences";
import {
  PreferenceContext,
  type PreferenceContextValue,
} from "@/context/preferenceContext";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const THEME_STORAGE_KEY = "portfolio-theme";

export function PreferenceProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [language, setLanguage] = useState<Language>("pt");
  const [theme, setTheme] = useState<ThemeMode>("dark");

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

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "pt" ? "en" : "pt"));
  }, []);

  const value = useMemo<PreferenceContextValue>(
    () => ({
      language,
      theme,
      setLanguage,
      setTheme,
      toggleLanguage,
      toggleTheme,
    }),
    [language, theme, toggleLanguage, toggleTheme],
  );

  return (
    <PreferenceContext.Provider value={value}>
      {children}
    </PreferenceContext.Provider>
  );
}
