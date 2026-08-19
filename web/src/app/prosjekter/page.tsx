import type { Metadata } from "next";
import { SectionBlock } from "@/components";
import { paths } from "@/resources";
import { getProjects, getSiteSettings } from "@/sanity/content";
import { ProjectsBrowser } from "./ProjectsBrowser";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const label = settings.nav.find((item) => item.href === paths.prosjekter)?.label;
  return { title: label || undefined };
}

export default async function ProsjekterPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);
  const heading = settings.nav.find((item) => item.href === paths.prosjekter)?.label ?? "";

  return (
    <SectionBlock headingAs="h1" heading={heading}>
      <ProjectsBrowser projects={projects} />
    </SectionBlock>
  );
}
