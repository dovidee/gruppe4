export const baseURL = "https://gruppe4.vercel.app";

export const paths = {
  home: "/",
  om_oss: "/om-oss",
  prosjekter: "/prosjekter",
  blogg: "/blogg",
} as const;

// Deliberately outside `paths`: that object drives the sitemap, and neither the
// post-submit landing page nor the form anchor belongs in it.
export const contactFormPath = `${paths.om_oss}#kontakt`;
export const contactSuccessPath = "/takk";
