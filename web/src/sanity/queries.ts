import { defineQuery } from "next-sanity";

const IMAGE = `{ asset, hotspot, alt, "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio }`;

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings" && _id == "siteSettings"][0]{ groupName, contactEmail, responsePromise, nav[]{label, href} }`,
);

export const HOME_QUERY = defineQuery(`{
  "home": *[_type == "home" && _id == "home"][0]{
    heroImage${IMAGE},
    heroCaption,
    eyebrow,
    headline,
    subline,
    ctaPrimary,
    ctaSecondary,
    introEyebrow,
    introHeading,
    introBody,
    membersHeading,
    membersLede
  },
  "members": *[_type == "member"] | order(order asc){
    _id,
    name,
    order,
    role,
    portrait${IMAGE},
    bio,
    skills,
    learning,
    linkedin,
    github,
    email
  },
  "forCompanies": *[_type == "forCompanies" && _id == "forCompanies"][0]{
    eyebrow, heading, lede, columns[]{title, bullets}, ctaLabel
  }
}`);

export const ABOUT_QUERY = defineQuery(`{
  "about": *[_type == "about" && _id == "about"][0]{
    eyebrow, heading, body, membersHeading
  },
  "members": *[_type == "member"] | order(order asc){
    _id,
    name,
    order,
    role,
    portrait${IMAGE},
    bio,
    skills,
    learning,
    linkedin,
    github,
    email
  }
}`);

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(order asc){
    _id, title, slug, order, meta, categories, stack, githubUrl, authors,
    cover${IMAGE},
    summary
  }`,
);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    _id, title, slug, meta, categories, stack, githubUrl, authors, roleNote,
    cover${IMAGE},
    summary,
    sections[]{heading, body}
  }`,
);

export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)].slug.current`,
);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id, title, slug, publishedAt, tag, excerpt
  }`,
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
    _id, title, slug, publishedAt, tag, excerpt, body,
    cover${IMAGE}
  }`,
);

export const POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)].slug.current`,
);
