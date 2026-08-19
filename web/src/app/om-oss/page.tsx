import type { Metadata } from "next";
import { MemberRow, PortableTextBody, SectionBlock } from "@/components";
import { getAboutData } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutData();
  return { title: about.heading || undefined };
}

export default async function OmOssPage() {
  const about = await getAboutData();

  return (
    <>
      <SectionBlock eyebrow={about.eyebrow} heading={about.heading} headingAs="h1">
        <PortableTextBody value={about.body} />
      </SectionBlock>

      <SectionBlock heading={about.membersHeading}>
        <div>
          {about.members.map((member) => (
            <MemberRow key={member.id} member={member} initiallyExpanded />
          ))}
        </div>
      </SectionBlock>
    </>
  );
}
