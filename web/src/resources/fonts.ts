import { Inter } from "next/font/google";

/**
 * Inter, the site typeface. next/font downloads it at build time and serves it
 * from our own domain, so no request goes to Google at runtime. Variable font:
 * headings use 800, body text 400.
 */
export const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin", "latin-ext"],
});
