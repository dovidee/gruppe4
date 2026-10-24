import type { Metadata } from "next";
import { AboutStory, ContactForm } from "@/components";
import { getDictionary } from "@/i18n/server";
import { getAboutData } from "@/sanity/content";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  const about = await getAboutData(locale);
  return { title: about.heading || undefined };
}

// The story and the contact form sit side by side, so the form is visible from
// the start instead of waiting at the bottom of a long text.
export default async function OmOssPage() {
  const { locale, t } = await getDictionary();
  const about = await getAboutData(locale);

  return (
    <div className={`container ${styles.layout}`}>
      <article className={styles.story}>
        <h1 className="visually-hidden">{about.heading}</h1>
        <a className={styles.jump} href="#kontakt">
          {t.contactJump}
        </a>
        <AboutStory body={about.body} />
      </article>

      <aside id="kontakt" className={styles.contact} aria-labelledby="kontakt-tittel">
        <h2 id="kontakt-tittel" className="h3">
          {t.contactHeading}
        </h2>
        {t.contactLede && <p className={styles.lede}>{t.contactLede}</p>}
        <ContactForm locale={locale} />
      </aside>
    </div>
  );
}
