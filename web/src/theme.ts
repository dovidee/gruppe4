// Shared by the root layout (reads it on the server) and ThemeToggle (writes it).
// With no cookie, <html> gets no data-theme and globals.css follows the OS.
export const THEME_COOKIE = "theme";

export type Theme = "light" | "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}
