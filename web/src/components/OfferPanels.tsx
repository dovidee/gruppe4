import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { contactFormPath, paths } from "@/resources";
import type { OfferColumn } from "@/sanity/content";
import styles from "./OfferPanels.module.css";

// Box order sets the button colour: green, magenta, gold.
const TONES = ["green", "magenta", "gold"] as const;
const DEFAULT_HREFS = [paths.prosjekter, paths.blogg, contactFormPath];

type OfferPanelsProps = {
  columns: OfferColumn[];
  locale: Locale;
};

// Three static boxes: the first spans the full width, the rest share the row
// below. Each box has one heading, its text and a big button.
export function OfferPanels({ columns, locale }: OfferPanelsProps) {
  const t = dictionaries[locale];
  if (columns.length === 0) return null;

  return (
    <ul className={styles.grid}>
      {columns.map((column, i) => {
        const tone = TONES[i % TONES.length];
        const label = column.ctaLabel || t.offerCtas[i];
        const href = column.ctaHref || DEFAULT_HREFS[i];
        return (
          <li key={column.title || i} className={styles.box} data-tone={tone}>
            <h3 className={styles.title}>{column.title}</h3>
            {column.bullets.map((paragraph) => (
              <p key={paragraph} className={styles.body}>
                {paragraph}
              </p>
            ))}
            {label && href && (
              <Link className={styles.cta} href={href}>
                {label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
