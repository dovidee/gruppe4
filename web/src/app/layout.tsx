import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

import { Footer, Header } from "@/components";
import { htmlLang } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { inter } from "@/resources";
import { getSiteSettings } from "@/sanity/content";
import { isTheme, THEME_COOKIE } from "@/theme";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  const settings = await getSiteSettings(locale);
  return {
    title: { default: settings.groupName, template: `%s, ${settings.groupName}` },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, t } = await getDictionary();
  const settings = await getSiteSettings(locale);
  // The visitor's chosen theme is rendered straight into the HTML, so there is no
  // flash. Without a choice, data-theme is left off and the CSS follows the OS.
  const storedTheme = (await cookies()).get(THEME_COOKIE)?.value;
  const theme = isTheme(storedTheme) ? storedTheme : undefined;

  return (
    <html
      lang={htmlLang[locale]}
      className={inter.variable}
      data-theme={theme}
      suppressHydrationWarning
    >
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
