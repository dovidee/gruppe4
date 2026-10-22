import { defineQuery } from "next-sanity";

const IMAGE = `{ asset, hotspot, alt, "lqip": asset->metadata.lqip, "aspectRatio": asset->metadata.dimensions.aspectRatio }`;

// Every query takes $lang ("no" or "en"). English fields are optional in the
// studio, so each one falls back to its Norwegian counterpart until filled in.

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings" && _id == "siteSettings"][0]{
    groupName,
    "responsePromise": select($lang == "en" => coalesce(responsePromiseEn, responsePromise), responsePromise),
    nav[]{ "label": select($lang == "en" => coalesce(labelEn, label), label), href }
  }`,
);

const CONTRIBUTORS = `contributors[]{
    githubUrl,
    member->{ _id, name, portrait${IMAGE} }
  }`;

export const HOME_QUERY = defineQuery(`{
  "home": *[_type == "home" && _id == "home"][0]{
    heroImage${IMAGE},
    "headline": select($lang == "en" => coalesce(headlineEn, headline), headline),
    "subline": select($lang == "en" => coalesce(sublineEn, subline), subline),
    introVideo{
      "title": select($lang == "en" => coalesce(titleEn, title), title),
      "url": asset->url,
      "mimeType": asset->mimeType,
      "captionsUrl": captions.asset->url,
      poster{ asset }
    },
    "partnersLead": select($lang == "en" => coalesce(partnersLeadEn, partnersLead), partnersLead),
    partners[]{ "name": select($lang == "en" => coalesce(nameEn, name), name) },
    "membersLede": select($lang == "en" => coalesce(membersLedeEn, membersLede), membersLede)
  },
  "members": *[_type == "member"] | order(order asc){
    _id,
    name,
    order,
    "role": select($lang == "en" => coalesce(roleEn, role), role),
    portrait${IMAGE},
    "bio": select($lang == "en" => coalesce(bioEn, bio), bio),
    skills,
    learning,
    linkedin,
    github,
    email,
    "projects": *[_type == "project" && personal == true && defined(slug.current) && references(^._id)] | order(order asc){
      _id,
      title,
      slug,
      "summary": select($lang == "en" => coalesce(summaryEn, summary), summary),
      stack,
      cover${IMAGE},
      "githubUrl": contributors[member._ref == ^.^._id][0].githubUrl
    }
  },
  "forCompanies": *[_type == "forCompanies" && _id == "forCompanies"][0]{
    "heading": select($lang == "en" => coalesce(headingEn, heading), heading),
    columns[]{
      "title": select($lang == "en" => coalesce(titleEn, title), title),
      "bullets": select($lang == "en" => coalesce(bulletsEn, bullets), bullets),
      "ctaLabel": select($lang == "en" => coalesce(ctaLabelEn, ctaLabel), ctaLabel),
      ctaHref
    }
  }
}`);

export const ABOUT_QUERY = defineQuery(
  `*[_type == "about" && _id == "about"][0]{
    "heading": select($lang == "en" => coalesce(headingEn, heading), heading),
    "body": select($lang == "en" => coalesce(bodyEn, body), body)
  }`,
);

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)] | order(order asc){
    _id, title, slug, order, personal, meta, categories, stack, githubUrl, authors,
    cover${IMAGE},
    "summary": select($lang == "en" => coalesce(summaryEn, summary), summary),
    ${CONTRIBUTORS}
  }`,
);

export const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0]{
    _id, title, slug, personal, meta, categories, stack, githubUrl, authors,
    "roleNote": select($lang == "en" => coalesce(roleNoteEn, roleNote), roleNote),
    cover${IMAGE},
    "summary": select($lang == "en" => coalesce(summaryEn, summary), summary),
    ${CONTRIBUTORS},
    sections[]{
      "heading": select($lang == "en" => coalesce(headingEn, heading), heading),
      "body": select($lang == "en" => coalesce(bodyEn, body), body)
    }
  }`,
);

export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)].slug.current`,
);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id, slug, publishedAt, tag,
    "title": select($lang == "en" => coalesce(titleEn, title), title),
    "excerpt": select($lang == "en" => coalesce(excerptEn, excerpt), excerpt),
    cover${IMAGE}
  }`,
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
    _id, slug, publishedAt, tag,
    "title": select($lang == "en" => coalesce(titleEn, title), title),
    "excerpt": select($lang == "en" => coalesce(excerptEn, excerpt), excerpt),
    "body": select($lang == "en" => coalesce(bodyEn, body), body),
    cover${IMAGE}
  }`,
);

export const POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)].slug.current`,
);
