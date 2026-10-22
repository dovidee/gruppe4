export const locales = ["no", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "no";

// Read on the server for rendering and written by the language toggle. Not
// httpOnly on purpose: the toggle sets it from the browser.
export const LOCALE_COOKIE = "lang";

export function isLocale(value: string | undefined): value is Locale {
  return value === "no" || value === "en";
}

// BCP 47 tags for <html lang> and Intl formatting.
export const htmlLang: Record<Locale, string> = { no: "nb", en: "en" };
export const dateLocale: Record<Locale, string> = { no: "nb-NO", en: "en-GB" };
