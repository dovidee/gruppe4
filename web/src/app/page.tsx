import type { Metadata } from "next";
import Link from "next/link";
import { Hero, MemberRow, PortableTextBody, SectionBlock } from "@/components";
import { contactFormPath } from "@/resources";
import { getHomeData } from "@/sanity/content";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeData();

  return {
    title: home.headline || undefined,
    description: home.subline || undefined,
    openGraph: home.heroImage ? { images: [{ url: home.heroImage.src }] } : undefined,
  };
}

export default async function Home() {
  const home = await getHomeData();

  return (
    <>
      <Hero
        image={home.heroImage}
        caption={home.heroCaption}
        eyebrow={home.eyebrow}
        headline={home.headline}
        subline={home.subline}
        ctaPrimary={home.ctaPrimary}
        ctaSecondary={home.ctaSecondary}
      />

      <SectionBlock eyebrow={home.introEyebrow} heading={home.introHeading}>
        <PortableTextBody value={home.introBody} />
      </SectionBlock>

      <SectionBlock heading={home.membersHeading} lede={home.membersLede}>
        <div>
          {home.members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </div>
      </SectionBlock>

      {home.forCompanies && (
        <SectionBlock
          eyebrow={home.forCompanies.eyebrow}
          heading={home.forCompanies.heading}
          lede={home.forCompanies.lede}
        >
          <div className={styles.columns}>
            {home.forCompanies.columns.map((column, i) => (
              <div key={i} className={styles.column}>
                <h3 className="h3">{column.title}</h3>
                <ul className={styles.bullets}>
                  {column.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {home.forCompanies.ctaLabel && (
            <Link className={styles.contactButton} href={contactFormPath}>
              {home.forCompanies.ctaLabel}
            </Link>
          )}
        </SectionBlock>
      )}
    </>
  );
}
