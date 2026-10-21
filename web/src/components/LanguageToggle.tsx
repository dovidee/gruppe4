"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { htmlLang, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { FlagNorway, FlagUS } from "./Flags";
import styles from "./Toggle.module.css";

// Shows the flag of the language in use. Switching stores the choice in a
// cookie and re-renders the server components in place, without a reload.
export function LanguageToggle({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next: Locale = locale === "no" ? "en" : "no";

  const toggle = () => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = htmlLang[next];
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      disabled={pending}
      aria-label={t.switchLanguage}
      title={t.switchLanguage}
      lang={htmlLang[next]}
    >
      <span className={styles.flag}>{locale === "no" ? <FlagNorway /> : <FlagUS />}</span>
    </button>
  );
}
