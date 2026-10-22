import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { contactFormPath, paths } from "@/resources";
import type { OfferColumn } from "@/sanity/content";
import { Stack, StackItem } from "./Stack";
import styles from "./OfferPanels.module.css";

// Panel order sets the button colour: green, magenta, gold.
const TONES = ["green", "magenta", "gold"] as const;
const DEFAULT_HREFS = [paths.prosjekter, paths.blogg, contactFormPath];

type OfferPanelsProps = {
  columns: OfferColumn[];
  locale: Locale;
};

export function OfferPanels({ columns, locale }: OfferPanelsProps) {
  const t = dictionaries[locale];
  if (columns.length === 0) return null;

  return (
    <Stack>
      {columns.map((column, i) => {
        const [subtitle, ...body] = column.bullets;
        const tone = TONES[i % TONES.length];
        const label = column.ctaLabel || t.offerCtas[i];
        const href = column.ctaHref || DEFAULT_HREFS[i];
        return (
          <StackItem key={i} index={i}>
            <section className={styles.panel} data-tone={tone}>
              <div className={styles.text}>
                <h3 className={styles.title}>{column.title}</h3>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                {body.map((paragraph, j) => (
                  <p key={j} className={styles.body}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {label && href && (
                <Link className={styles.cta} href={href}>
                  {label}
                </Link>
              )}
            </section>
          </StackItem>
        );
      })}
    </Stack>
  );
}
