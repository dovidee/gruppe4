import type { PortableTextBlock } from "next-sanity";
import { client } from "./client";
import { imageUrl } from "./image";
import {
  ABOUT_QUERY,
  HOME_QUERY,
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import type {
  ABOUT_QUERY_RESULT,
  HOME_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "../../sanity.types";

const HOME_TAGS = ["home", "member", "forCompanies", "siteSettings"];
const ABOUT_TAGS = ["about", "member"];
const PROJECT_TAGS = ["project"];
const POST_TAGS = ["post"];

function sanityFetch<T>(query: string, params: Record<string, unknown>, tags: string[]) {
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 },
  });
}

export type SanityImageData = {
  src: string;
  alt: string;
  hotspot?: { x: number; y: number };
  lqip?: string;
} | null;

type RawImage =
  | {
      asset?: unknown;
      hotspot?: { x?: number | null; y?: number | null } | null;
      alt?: string | null;
      lqip?: string | null;
    }
  | null
  | undefined;

function mapImage(image: RawImage, width: number): SanityImageData {
  if (!image?.asset) return null;
  const src = imageUrl(image as never, width);
  if (!src) return null;
  return {
    src,
    alt: image.alt ?? "",
    hotspot:
      typeof image.hotspot?.x === "number" && typeof image.hotspot?.y === "number"
        ? { x: image.hotspot.x, y: image.hotspot.y }
        : undefined,
    lqip: image.lqip ?? undefined,
  };
}

// Site settings (nav, contact)

export type SiteSettings = {
  groupName: string;
  contactEmail: string;
  responsePromise: string;
  nav: { label: string; href: string }[];
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = await client.fetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY, {}, {
    next: { tags: ["siteSettings"], revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 },
  });

  return {
    groupName: raw?.groupName ?? "Gruppe",
    contactEmail: raw?.contactEmail ?? "",
    responsePromise: raw?.responsePromise ?? "",
    nav: (raw?.nav ?? []).map((item) => ({ label: item.label ?? "", href: item.href ?? "" })),
  };
}

// Home (hero, intro, members, for bedrifter)

export type Member = {
  id: string;
  name: string;
  order: number;
  role: string;
  portrait: SanityImageData;
  bio: string;
  skills: string[];
  learning: string[];
  linkedin?: string;
  github?: string;
  email?: string;
};

type RawMember = NonNullable<HOME_QUERY_RESULT["members"]>[number];

function mapMember(m: RawMember): Member {
  return {
    id: m._id,
    name: m.name ?? "",
    order: m.order ?? 0,
    role: m.role ?? "",
    portrait: mapImage(m.portrait, 400),
    bio: m.bio ?? "",
    skills: (m.skills ?? []).filter((s): s is string => Boolean(s)),
    learning: (m.learning ?? []).filter((s): s is string => Boolean(s)),
    linkedin: m.linkedin ?? undefined,
    github: m.github ?? undefined,
    email: m.email ?? undefined,
  };
}

export type ForCompanies = {
  eyebrow: string;
  heading: string;
  lede: string;
  columns: { title: string; bullets: string[] }[];
  ctaLabel: string;
};

export type HomeData = {
  heroImage: SanityImageData;
  heroCaption: string;
  eyebrow: string;
  headline: string;
  subline: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  introEyebrow: string;
  introHeading: string;
  introBody: PortableTextBlock[];
  membersHeading: string;
  membersLede: string;
  members: Member[];
  forCompanies: ForCompanies | null;
};

export async function getHomeData(): Promise<HomeData> {
  const raw = await sanityFetch<HOME_QUERY_RESULT>(HOME_QUERY, {}, HOME_TAGS);

  return {
    heroImage: mapImage(raw.home?.heroImage, 1600),
    heroCaption: raw.home?.heroCaption ?? "",
    eyebrow: raw.home?.eyebrow ?? "",
    headline: raw.home?.headline ?? "",
    subline: raw.home?.subline ?? "",
    ctaPrimary:
      raw.home?.ctaPrimary?.label && raw.home?.ctaPrimary?.href
        ? { label: raw.home.ctaPrimary.label, href: raw.home.ctaPrimary.href }
        : undefined,
    ctaSecondary:
      raw.home?.ctaSecondary?.label && raw.home?.ctaSecondary?.href
        ? { label: raw.home.ctaSecondary.label, href: raw.home.ctaSecondary.href }
        : undefined,
    introEyebrow: raw.home?.introEyebrow ?? "",
    introHeading: raw.home?.introHeading ?? "",
    introBody: (raw.home?.introBody ?? []) as PortableTextBlock[],
    membersHeading: raw.home?.membersHeading ?? "",
    membersLede: raw.home?.membersLede ?? "",
    members: (raw.members ?? []).map(mapMember),
    forCompanies: raw.forCompanies
      ? {
          eyebrow: raw.forCompanies.eyebrow ?? "",
          heading: raw.forCompanies.heading ?? "",
          lede: raw.forCompanies.lede ?? "",
          columns: (raw.forCompanies.columns ?? []).map((c) => ({
            title: c.title ?? "",
            bullets: (c.bullets ?? []).filter((b): b is string => Boolean(b)),
          })),
          ctaLabel: raw.forCompanies.ctaLabel ?? "",
        }
      : null,
  };
}

// About (om oss)

export type AboutData = {
  eyebrow: string;
  heading: string;
  body: PortableTextBlock[];
  membersHeading: string;
  members: Member[];
};

export async function getAboutData(): Promise<AboutData> {
  const raw = await sanityFetch<ABOUT_QUERY_RESULT>(ABOUT_QUERY, {}, ABOUT_TAGS);

  return {
    eyebrow: raw.about?.eyebrow ?? "",
    heading: raw.about?.heading ?? "",
    body: (raw.about?.body ?? []) as PortableTextBlock[],
    membersHeading: raw.about?.membersHeading ?? "",
    members: (raw.members ?? []).map(mapMember),
  };
}

// Projects

export type Project = {
  id: string;
  title: string;
  slug: string;
  meta: string;
  categories: string[];
  cover: SanityImageData;
  summary: string;
  stack: string[];
  githubUrl?: string;
  authors?: string;
  roleNote?: string;
  sections: { heading: string; body: PortableTextBlock[] }[];
};

function mapProjectListItem(doc: NonNullable<PROJECTS_QUERY_RESULT[number]>): Project {
  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug?.current ?? "",
    meta: doc.meta ?? "",
    categories: (doc.categories ?? []).filter((c): c is string => Boolean(c)),
    cover: mapImage(doc.cover, 600),
    summary: doc.summary ?? "",
    stack: (doc.stack ?? []).filter((s): s is string => Boolean(s)),
    githubUrl: doc.githubUrl ?? undefined,
    authors: doc.authors ?? undefined,
    sections: [],
  };
}

export async function getProjects(): Promise<Project[]> {
  const docs = await sanityFetch<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY, {}, PROJECT_TAGS);
  return docs.map(mapProjectListItem);
}

export async function getProject(slug: string): Promise<Project | null> {
  const doc = await sanityFetch<PROJECT_QUERY_RESULT>(PROJECT_QUERY, { slug }, PROJECT_TAGS);
  if (!doc) return null;

  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug?.current ?? "",
    meta: doc.meta ?? "",
    categories: (doc.categories ?? []).filter((c): c is string => Boolean(c)),
    cover: mapImage(doc.cover, 1600),
    summary: doc.summary ?? "",
    stack: (doc.stack ?? []).filter((s): s is string => Boolean(s)),
    githubUrl: doc.githubUrl ?? undefined,
    authors: doc.authors ?? undefined,
    roleNote: doc.roleNote ?? undefined,
    sections: (doc.sections ?? []).map((s) => ({
      heading: s?.heading ?? "",
      body: (s?.body ?? []) as PortableTextBlock[],
    })),
  };
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(PROJECT_SLUGS_QUERY, {}, PROJECT_TAGS);
  return slugs.filter((slug): slug is string => Boolean(slug));
}

// Posts

export type Post = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  tag: string;
  excerpt: string;
  cover: SanityImageData;
  body: PortableTextBlock[];
};

function mapPostListItem(doc: NonNullable<POSTS_QUERY_RESULT[number]>): Post {
  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug?.current ?? "",
    publishedAt: doc.publishedAt ?? "",
    tag: doc.tag ?? "",
    excerpt: doc.excerpt ?? "",
    cover: null,
    body: [],
  };
}

export async function getPosts(): Promise<Post[]> {
  const docs = await sanityFetch<POSTS_QUERY_RESULT>(POSTS_QUERY, {}, POST_TAGS);
  return docs
    .map(mapPostListItem)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPost(slug: string): Promise<Post | null> {
  const doc = await sanityFetch<POST_QUERY_RESULT>(POST_QUERY, { slug }, POST_TAGS);
  if (!doc) return null;

  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug?.current ?? "",
    publishedAt: doc.publishedAt ?? "",
    tag: doc.tag ?? "",
    excerpt: doc.excerpt ?? "",
    cover: mapImage(doc.cover, 1600),
    body: (doc.body ?? []) as PortableTextBlock[],
  };
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(POST_SLUGS_QUERY, {}, POST_TAGS);
  return slugs.filter((slug): slug is string => Boolean(slug));
}
