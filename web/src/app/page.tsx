import type { Metadata } from "next";
import {
  MemberPanel,
  OfferPanels,
  Partners,
  ProjectCarousel,
  SectionIntro,
  Stack,
  StackItem,
  VideoStage,
} from "@/components";
import { getDictionary } from "@/i18n/server";
import { getHomeData } from "@/sanity/content";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  const home = await getHomeData(locale);

  return {
    title: home.headline || undefined,
    description: home.subline || undefined,
    openGraph: home.heroImage ? { images: [{ url: home.heroImage.src }] } : undefined,
  };
}

export default async function Home() {
  const { locale, t } = await getDictionary();
  const home = await getHomeData(locale);

  // Each member gets a panel; a member with their own projects gets a second
  // panel right after, so their work follows their face.
  const panels = home.members.flatMap((member) => [
    { key: member.id, kind: "member" as const, member },
    ...(member.projects.length > 0
      ? [{ key: `${member.id}-projects`, kind: "projects" as const, member }]
      : []),
  ]);

  return (
    <>
      <h1 className="visually-hidden">{home.headline || "resonansIT"}</h1>

      <div className={styles.videoWrap}>
        <VideoStage video={home.video} fallbackImage={home.heroImage} locale={locale} />
      </div>

      <Partners
        lead={home.partnersLead || t.partnersLead}
        names={home.partners.length > 0 ? home.partners : t.partnersFallback}
      />

      {panels.length > 0 && (
        <section aria-labelledby="medlemmer">
          <SectionIntro
            id="medlemmer"
            heading={home.membersLede || t.membersLede}
            accent
          />
          <Stack>
            {panels.map((panel, i) => (
              <StackItem key={panel.key} index={i}>
                {panel.kind === "member" ? (
                  <MemberPanel member={panel.member} locale={locale} />
                ) : (
                  <ProjectCarousel
                    projects={panel.member.projects}
                    memberName={panel.member.name}
                    memberPortrait={panel.member.portrait}
                    locale={locale}
                  />
                )}
              </StackItem>
            ))}
          </Stack>
        </section>
      )}

      {home.forCompanies && home.forCompanies.columns.length > 0 && (
        <section aria-labelledby="samarbeid" className={styles.offers}>
          <SectionIntro
            id="samarbeid"
            heading={home.forCompanies.heading || t.offerHeading}
            accent
          />
          <OfferPanels columns={home.forCompanies.columns} locale={locale} />
        </section>
      )}
    </>
  );
}
