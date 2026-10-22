import type { Metadata } from "next";
import { ContactForm, PortableTextBody, SectionBlock } from "@/components";
import { getDictionary } from "@/i18n/server";
import { getAboutData } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  const about = await getAboutData(locale);
  return { title: about.heading || undefined };
}

export default async function OmOssPage() {
  const { locale, t } = await getDictionary();
  const about = await getAboutData(locale);

  return (
    <>
      <SectionBlock heading={about.heading} headingAs="h1">
        <PortableTextBody value={about.body} />
      </SectionBlock>

      <SectionBlock id="kontakt" heading={t.contactHeading} lede={t.contactLede}>
        <ContactForm locale={locale} />
      </SectionBlock>
    </>
  );
}
