"use client";

import { useLayoutEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { THEME_COOKIE, type Theme } from "@/theme";
import styles from "./Toggle.module.css";

// The layout renders data-theme from the cookie. Without it the page follows the
// OS through CSS, so the effective theme is whatever the media query says.
function currentTheme(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "dark" || set === "light") {
    return set;
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const [theme, setTheme] = useState<Theme | null>(null);

  useLayoutEffect(() => {
    setTheme(currentTheme());

    // Two toggles exist (desktop and mobile panel); keep them in step.
    const observer = new MutationObserver(() => setTheme(currentTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.setAttribute("data-theme-switching", "");
    root.setAttribute("data-theme", next);
    // Read by the layout on the next request, so the page renders in this theme.
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
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
