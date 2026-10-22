import type { Metadata } from "next";
import "./globals.css";

import { Footer, Header } from "@/components";
import { htmlLang } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { inter } from "@/resources";
import { getSiteSettings } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  const settings = await getSiteSettings(locale);
  return {
    title: { default: settings.groupName, template: `%s, ${settings.groupName}` },
  };
}

// Runs before first paint so the stored (or system) theme never flashes.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, t } = await getDictionary();
  const settings = await getSiteSettings(locale);

  return (
    <html lang={htmlLang[locale]} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap, no user input */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Header nav={settings.nav} locale={locale} />
        <main id="innhold" tabIndex={-1}>
          {children}
        </main>
        <Footer
          groupName={settings.groupName}
          university={t.university}
          tagline={settings.responsePromise || t.footerTagline}
        />
      </body>
    </html>
  );
}
