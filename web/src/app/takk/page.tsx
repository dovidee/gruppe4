import type { Metadata } from "next";
import Link from "next/link";
import { SectionBlock } from "@/components";
import { contactFormPath, paths } from "@/resources";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Takk for meldingen",
  robots: { index: false, follow: true },
};

export default async function TakkPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const status = (await searchParams).status;

  if (status === "vent") {
    return (
      <SectionBlock
        heading="Vent litt før du sender igjen"
        headingAs="h1"
        lede="Du har sendt flere meldinger på kort tid. Prøv igjen om ti minutter."
      >
        <Link className={styles.button} href={contactFormPath}>
          Tilbake til skjemaet
        </Link>
      </SectionBlock>
    );
  }

  if (status === "feil") {
    return (
      <SectionBlock
        heading="Meldingen kom ikke fram"
        headingAs="h1"
        lede="Noe gikk galt da vi skulle sende meldingen din. Prøv gjerne igjen."
      >
        <Link className={styles.button} href={contactFormPath}>
          Tilbake til skjemaet
        </Link>
      </SectionBlock>
    );
  }

  return (
    <SectionBlock
      heading="Takk for meldingen!"
      headingAs="h1"
      lede="Vi har mottatt meldingen din, og svarer så snart vi kan."
    >
      <Link className={styles.button} href={paths.home}>
        Tilbake til forsiden
      </Link>
    </SectionBlock>
  );
}
