import type { Metadata } from "next";
import { EmptyState, SectionIntro } from "@/components";
import { getDictionary } from "@/i18n/server";
import { paths } from "@/resources";
import { getProjects, getSiteSettings } from "@/sanity/content";
import { ProjectsBrowser } from "./ProjectsBrowser";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  const settings = await getSiteSettings(locale);
  const label = settings.nav.find((item) => item.href === paths.prosjekter)?.label;
  return { title: label || undefined };
}

export default async function ProsjekterPage() {
  const { locale, t } = await getDictionary();
  const projects = await getProjects(locale);

  return (
    <>
      <SectionIntro as="h1" heading={t.projectsHeading} />
      {projects.length === 0 ? (
        <div className="container">
          <EmptyState title={t.noProjects} />
        </div>
      ) : (
        <ProjectsBrowser projects={projects} locale={locale} />
      )}
    </>
  );
}
