"use client";

import { useLayoutEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import styles from "./Toggle.module.css";

type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const [theme, setTheme] = useState<Theme | null>(null);

  // The inline script in the layout set data-theme before paint. Read it back,
  // and restore it if React's development remount cleared it.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-theme")) {
      const fallback =
        storedTheme() ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      root.setAttribute("data-theme", fallback);
    }
    setTheme(currentTheme());

    // Two toggles exist (desktop and mobile panel); keep them in step.
    const observer = new MutationObserver(() => setTheme(currentTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme-switching", "");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still applies to this visit.
    }
    window.setTimeout(() => root.removeAttribute("data-theme-switching"), 500);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? t.themeToLight : t.themeToDark}
      title={isDark ? t.themeToLight : t.themeToDark}
    >
      <span className={styles.icon} data-shown={theme === null || !isDark ? "" : undefined}>
        <LuSun aria-hidden />
      </span>
      <span className={styles.icon} data-shown={isDark ? "" : undefined}>
        <LuMoon aria-hidden />
      </span>
    </button>
  );
}
