import type { PortableTextBlock } from "next-sanity";

import { client } from "./client";
import { urlFor } from "./image";
import {
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import type {
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  PROJECT_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "../../sanity.types";

const options = { next: { revalidate: 60 } };

type SanityImage = { asset?: unknown } | null | undefined;

function urlWidth(image: SanityImage, width: number): string | undefined {
  if (!image || !("asset" in image) || !image.asset) return undefined;
  // biome-ignore lint: image is a valid Sanity image source at this point
  return urlFor(image as never).width(width).url();
}

type TeamInput =
  | Array<{
      name?: string | null;
      role?: string | null;
      avatar?: SanityImage;
      linkedIn?: string | null;
    }>
  | null
  | undefined;

function mapTeam(team: TeamInput) {
  return (team ?? []).map((member) => ({
    name: member.name ?? "",
    role: member.role ?? "",
    avatar: urlWidth(member.avatar, 128) ?? "",
    linkedIn: member.linkedIn ?? "",
  }));
}

function mapRatioImages(
  images:
    | Array<{ image?: SanityImage; alt?: string | null; width?: number | null; height?: number | null }>
    | null
    | undefined,
) {
  return (images ?? []).map((img) => ({
    src: urlWidth(img.image, 800) ?? "",
    alt: img.alt ?? "",
    width: img.width ?? 16,
    height: img.height ?? 9,
  }));
}

export async function getSiteSettings() {
  const raw = await client.fetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY, {}, options);
  if (!raw || !raw.person) {
    throw new Error(
      'Missing "siteSettings" document — create and publish it in Sanity Studio.',
    );
  }

  return {
    person: {
      firstName: raw.person.firstName ?? "",
      lastName: raw.person.lastName ?? "",
      name: raw.person.name ?? "",
      role: raw.person.role ?? "",
      avatar: urlWidth(raw.person.avatar, 512) ?? "",
      email: raw.person.email ?? "",
      location: raw.person.location ?? "Europe/Oslo",
      languages: raw.person.languages ?? [],
      locale: raw.person.locale ?? "en",
    },
    social: (raw.social ?? []).map((item) => ({
      name: item.name ?? "",
      icon: item.icon ?? "",
      link: item.link ?? "",
      essential: item.essential ?? false,
    })),
    newsletter: {
      display: raw.newsletter?.display ?? false,
      title: raw.newsletter?.title ?? "",
      description: raw.newsletter?.description ?? "",
    },
    home: {
      headline: raw.home?.headline ?? "",
      subline: raw.home?.subline ?? "",
      featuredDisplay: raw.home?.featuredDisplay ?? false,
      featuredTitle: raw.home?.featuredTitle ?? "",
      featuredHref: raw.home?.featuredHref ?? "",
      title: raw.home?.title ?? "",
      description: raw.home?.description ?? "",
      image: urlWidth(raw.home?.image, 1600),
    },
    about: {
      title: raw.about?.title ?? "",
      description: raw.about?.description ?? "",
      tocDisplay: raw.about?.tocDisplay ?? true,
      tocSubItems: raw.about?.tocSubItems ?? false,
      avatarDisplay: raw.about?.avatarDisplay ?? true,
      calendarDisplay: raw.about?.calendarDisplay ?? false,
      calendarLink: raw.about?.calendarLink ?? "",
      intro: {
        display: raw.about?.intro?.display ?? true,
        title: raw.about?.intro?.title ?? "Introduction",
        description: (raw.about?.intro?.description ?? []) as PortableTextBlock[],
      },
      work: {
        display: raw.about?.work?.display ?? true,
        title: raw.about?.work?.title ?? "Work Experience",
        experiences: (raw.about?.work?.experiences ?? []).map((experience) => ({
          company: experience.company ?? "",
          timeframe: experience.timeframe ?? "",
          role: experience.role ?? "",
          achievements: experience.achievements ?? [],
          images: mapRatioImages(experience.images),
        })),
      },
      studies: {
        display: raw.about?.studies?.display ?? true,
        title: raw.about?.studies?.title ?? "Studies",
        institutions: (raw.about?.studies?.institutions ?? []).map((institution) => ({
          name: institution.name ?? "",
          description: institution.description ?? "",
        })),
      },
      technical: {
        display: raw.about?.technical?.display ?? true,
        title: raw.about?.technical?.title ?? "Technical skills",
        skills: (raw.about?.technical?.skills ?? []).map((skill) => ({
          title: skill.title ?? "",
          description: skill.description ?? "",
          tags: (skill.tags ?? []).map((tag) => ({ name: tag.name ?? "", icon: tag.icon ?? undefined })),
          images: mapRatioImages(skill.images),
        })),
      },
    },
    blog: {
      title: raw.blog?.title ?? "",
      description: raw.blog?.description ?? "",
    },
    work: {
      title: raw.work?.title ?? "",
      description: raw.work?.description ?? "",
    },
    gallery: {
      title: raw.gallery?.title ?? "",
      description: raw.gallery?.description ?? "",
      images: (raw.gallery?.images ?? []).map((img) => ({
        src: urlWidth(img.image, 1200) ?? "",
        alt: img.alt ?? "",
        orientation: img.orientation ?? "horizontal",
      })),
    },
  };
}

export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;

function mapPost(doc: NonNullable<POSTS_QUERY_RESULT[number] | POST_QUERY_RESULT>) {
  return {
    slug: doc.slug?.current ?? "",
    metadata: {
      title: doc.title ?? "",
      subtitle: doc.subtitle ?? "",
      publishedAt: doc.publishedAt ?? "",
      summary: doc.summary ?? "",
      image: urlWidth(doc.image, 1600),
      tag: doc.tag ?? "",
      team: mapTeam(doc.team),
      link: doc.link ?? "",
    },
    body: (doc.body ?? []) as PortableTextBlock[],
  };
}

export type Post = ReturnType<typeof mapPost>;

export async function getPosts(): Promise<Post[]> {
  const docs = await client.fetch<POSTS_QUERY_RESULT>(POSTS_QUERY, {}, options);
  return docs.map(mapPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  const doc = await client.fetch<POST_QUERY_RESULT>(POST_QUERY, { slug }, options);
  return doc ? mapPost(doc) : null;
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await client.fetch(POST_SLUGS_QUERY, {}, options);
  return slugs.filter((slug): slug is string => Boolean(slug));
}

function mapProject(doc: NonNullable<PROJECTS_QUERY_RESULT[number] | PROJECT_QUERY_RESULT>) {
  return {
    slug: doc.slug?.current ?? "",
    metadata: {
      title: doc.title ?? "",
      publishedAt: doc.publishedAt ?? "",
      summary: doc.summary ?? "",
      images: (doc.images ?? [])
        .map((img) => urlWidth(img, 1600))
        .filter((src): src is string => Boolean(src)),
      tag: doc.tag ?? "",
      team: mapTeam(doc.team),
      link: doc.link ?? "",
    },
    body: (doc.body ?? []) as PortableTextBlock[],
  };
}

export type Project = ReturnType<typeof mapProject>;

export async function getProjects(): Promise<Project[]> {
  const docs = await client.fetch<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY, {}, options);
  return docs.map(mapProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  const doc = await client.fetch<PROJECT_QUERY_RESULT>(PROJECT_QUERY, { slug }, options);
  return doc ? mapProject(doc) : null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await client.fetch(PROJECT_SLUGS_QUERY, {}, options);
  return slugs.filter((slug): slug is string => Boolean(slug));
}
