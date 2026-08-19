import type { Metadata } from "next";
import "./globals.css";

import { Footer, Header } from "@/components";
import { archivo, jetbrainsMono } from "@/resources";
import { getSiteSettings } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: { default: settings.groupName, template: `%s, ${settings.groupName}` },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="no" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Header groupName={settings.groupName} nav={settings.nav} />
        <main>{children}</main>
        <Footer
          groupName={settings.groupName}
          contactEmail={settings.contactEmail}
          responsePromise={settings.responsePromise}
        />
      </body>
    </html>
  );
}
