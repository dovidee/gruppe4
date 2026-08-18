import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings" && _id == "siteSettings"][0]`,
);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`,
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`,
);

export const POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)].slug.current`,
);

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(publishedAt desc)`,
);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]`,
);

export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)].slug.current`,
);
