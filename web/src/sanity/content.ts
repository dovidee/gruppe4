import type { PortableTextBlock } from "next-sanity";
import type { Locale } from "@/i18n/config";
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

// "project" is here because members list their personal projects.
const HOME_TAGS = ["home", "member", "project", "forCompanies", "siteSettings"];
const ABOUT_TAGS = ["about"];
const PROJECT_TAGS = ["project", "member"];
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
  aspectRatio?: number;
} | null;

type RawImage =
  | {
      asset?: unknown;
      hotspot?: { x?: number | null; y?: number | null } | null;
      alt?: string | null;
      lqip?: string | null;
      aspectRatio?: number | null;
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
    aspectRatio: typeof image.aspectRatio === "number" ? image.aspectRatio : undefined,
  };
}

export function objectPosition(image: SanityImageData) {
  return image?.hotspot ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` : "50% 50%";
}

function strings(values: (string | null)[] | null | undefined): string[] {
  return (values ?? []).filter((s): s is string => Boolean(s));
}

// Site settings (nav, footer)

export type SiteSettings = {
  groupName: string;
  responsePromise: string;
  nav: { label: string; href: string }[];
};

export async function getSiteSettings(lang: Locale): Promise<SiteSettings> {
  const raw = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY, { lang }, [
    "siteSettings",
  ]);

  return {
    groupName: raw?.groupName ?? "Gruppe",
    responsePromise: raw?.responsePromise ?? "",
    nav: (raw?.nav ?? []).map((item) => ({ label: item.label ?? "", href: item.href ?? "" })),
  };
}

// Home (video, partners, members, for bedrifter)

export type MemberProject = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  stack: string[];
  cover: SanityImageData;
  githubUrl?: string;
};

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
  projects: MemberProject[];
};

type RawMember = NonNullable<HOME_QUERY_RESULT["members"]>[number];

function mapMember(m: RawMember): Member {
  return {
    id: m._id,
    name: m.name ?? "",
    order: m.order ?? 0,
    role: m.role ?? "",
    portrait: mapImage(m.portrait, 1200),
    bio: m.bio?.trim() ?? "",
    skills: strings(m.skills),
    learning: strings(m.learning),
    linkedin: m.linkedin ?? undefined,
    github: m.github ?? undefined,
    email: m.email ?? undefined,
    projects: (m.projects ?? []).map((p) => ({
      id: p._id,
      title: p.title ?? "",
      slug: p.slug?.current ?? "",
      summary: p.summary ?? "",
      stack: strings(p.stack),
      cover: mapImage(p.cover, 900),
      githubUrl: p.githubUrl ?? undefined,
    })),
  };
}

export type OfferColumn = {
  title: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type ForCompanies = {
  heading: string;
  columns: OfferColumn[];
};

export type SanityVideoData = {
  src: string;
  mimeType?: string;
  title: string;
  poster?: string;
  captions?: string;
} | null;

export type HomeData = {
  headline: string;
  subline: string;
  heroImage: SanityImageData;
  video: SanityVideoData;
  partnersLead: string;
  partners: string[];
  membersLede: string;
  members: Member[];
  forCompanies: ForCompanies | null;
};

export async function getHomeData(lang: Locale): Promise<HomeData> {
  const raw = await sanityFetch<HOME_QUERY_RESULT>(HOME_QUERY, { lang }, HOME_TAGS);
  const heroImage = mapImage(raw.home?.heroImage, 1920);
  const video = raw.home?.introVideo;

  return {
    headline: raw.home?.headline ?? "",
    subline: raw.home?.subline ?? "",
    heroImage,
    video: video?.url
      ? {
          src: video.url,
          mimeType: video.mimeType ?? undefined,
          title: video.title ?? "",
          // Without its own poster the video opens on the group photo.
          poster: mapImage(video.poster, 1920)?.src ?? heroImage?.src,
          captions: video.captionsUrl ?? undefined,
        }
      : null,
    partnersLead: raw.home?.partnersLead ?? "",
    partners: (raw.home?.partners ?? []).map((p) => p.name ?? "").filter(Boolean),
    membersLede: raw.home?.membersLede ?? "",
    members: (raw.members ?? []).map(mapMember),
    forCompanies: raw.forCompanies
      ? {
          heading: raw.forCompanies.heading ?? "",
          columns: (raw.forCompanies.columns ?? []).map((c) => ({
            title: c.title ?? "",
            bullets: strings(c.bullets),
            ctaLabel: c.ctaLabel ?? "",
            ctaHref: c.ctaHref ?? "",
          })),
        }
      : null,
  };
}

// About (om oss)

export type AboutData = {
  heading: string;
  body: PortableTextBlock[];
};

export async function getAboutData(lang: Locale): Promise<AboutData> {
  const raw = await sanityFetch<ABOUT_QUERY_RESULT>(ABOUT_QUERY, { lang }, ABOUT_TAGS);

  return {
    heading: raw?.heading ?? "",
    body: (raw?.body ?? []) as PortableTextBlock[],
  };
}

// Projects

export type Contributor = {
  id: string;
  name: string;
  portrait: SanityImageData;
  githubUrl?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  personal: boolean;
  meta: string;
  categories: string[];
  cover: SanityImageData;
  summary: string;
  stack: string[];
  contributors: Contributor[];
  githubUrl?: string;
  authors?: string;
  roleNote?: string;
  sections: { heading: string; body: PortableTextBlock[] }[];
};

type RawContributors = NonNullable<PROJECTS_QUERY_RESULT[number]>["contributors"];

function mapContributors(raw: RawContributors): Contributor[] {
  return (raw ?? []).flatMap((c) =>
    c.member
      ? [
          {
            id: c.member._id,
            name: c.member.name ?? "",
            portrait: mapImage(c.member.portrait, 160),
            githubUrl: c.githubUrl ?? undefined,
          },
        ]
      : [],
  );
}

function mapProjectListItem(doc: NonNullable<PROJECTS_QUERY_RESULT[number]>): Project {
  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug?.current ?? "",
    personal: doc.personal ?? false,
    meta: doc.meta ?? "",
    categories: strings(doc.categories),
    cover: mapImage(doc.cover, 1400),
    summary: doc.summary ?? "",
    stack: strings(doc.stack),
    contributors: mapContributors(doc.contributors),
    githubUrl: doc.githubUrl ?? undefined,
    authors: doc.authors ?? undefined,
    sections: [],
  };
}

export async function getProjects(lang: Locale): Promise<Project[]> {
  const docs = await sanityFetch<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY, { lang }, PROJECT_TAGS);
  return docs.map(mapProjectListItem);
}

export async function getProject(slug: string, lang: Locale): Promise<Project | null> {
  const doc = await sanityFetch<PROJECT_QUERY_RESULT>(
    PROJECT_QUERY,
    { slug, lang },
    PROJECT_TAGS,
  );
  if (!doc) return null;

  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug?.current ?? "",
    personal: doc.personal ?? false,
    meta: doc.meta ?? "",
    categories: strings(doc.categories),
    cover: mapImage(doc.cover, 1600),
    summary: doc.summary ?? "",
    stack: strings(doc.stack),
    contributors: mapContributors(doc.contributors),
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
    tag: doc.tag?.trim() ?? "",
    excerpt: doc.excerpt ?? "",
    cover: mapImage(doc.cover, 1400),
    body: [],
  };
}

export async function getPosts(lang: Locale): Promise<Post[]> {
  const docs = await sanityFetch<POSTS_QUERY_RESULT>(POSTS_QUERY, { lang }, POST_TAGS);
  return docs
    .map(mapPostListItem)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPost(slug: string, lang: Locale): Promise<Post | null> {
  const doc = await sanityFetch<POST_QUERY_RESULT>(POST_QUERY, { slug, lang }, POST_TAGS);
  if (!doc) return null;

  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug?.current ?? "",
    publishedAt: doc.publishedAt ?? "",
    tag: doc.tag?.trim() ?? "",
    excerpt: doc.excerpt ?? "",
    cover: mapImage(doc.cover, 1600),
    body: (doc.body ?? []) as PortableTextBlock[],
  };
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(POST_SLUGS_QUERY, {}, POST_TAGS);
  return slugs.filter((slug): slug is string => Boolean(slug));
}
