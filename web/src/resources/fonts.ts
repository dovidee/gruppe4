import localFont from "next/font/local";

/**
 * TeX Gyre Heros — the solveIT brand typeface. Self-hosted; see fonts/README.md
 * for provenance and licence. The family only ships Regular and Bold, so CSS
 * weights 500/600 fall back to 400/700.
 */
export const texGyreHeros = localFont({
  variable: "--font-display",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "system-ui", "sans-serif"],
  src: [
    { path: "./fonts/texgyreheros-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/texgyreheros-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/texgyreheros-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/texgyreheros-bolditalic.woff2", weight: "700", style: "italic" },
  ],
});
