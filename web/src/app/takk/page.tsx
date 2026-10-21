import type { Metadata } from "next";
import Link from "next/link";
import { SectionBlock } from "@/components";
import { getDictionary } from "@/i18n/server";
import { contactFormPath, paths } from "@/resources";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: t.thanksTitle,
    robots: { index: false, follow: true },
  };
}

export default async function TakkPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const status = (await searchParams).status;
  const { t } = await getDictionary();

  if (status === "vent") {
    return (
      <SectionBlock heading={t.waitHeading} headingAs="h1" lede={t.waitLede}>
        <Link className={styles.button} href={contactFormPath}>
          {t.backToForm}
        </Link>
      </SectionBlock>
    );
  }

  if (status === "feil") {
    return (
      <SectionBlock heading={t.errorHeading} headingAs="h1" lede={t.errorLede}>
        <Link className={styles.button} href={contactFormPath}>
          {t.backToForm}
        </Link>
      </SectionBlock>
    );
  }

  return (
    <SectionBlock heading={t.thanksHeading} headingAs="h1" lede={t.thanksLede}>
      <Link className={styles.button} href={paths.home}>
        {t.thanksBack}
      </Link>
    </SectionBlock>
  );
}
