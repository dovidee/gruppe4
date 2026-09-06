import type { Metadata } from "next";
import { ContactForm, PortableTextBody, SectionBlock } from "@/components";
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

      <SectionBlock
        id="kontakt"
        heading="Ta kontakt"
        lede="Send oss en melding, så hører du fra oss."
      >
        <ContactForm />
      </SectionBlock>
    </>
  );
}
