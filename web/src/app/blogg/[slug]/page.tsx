import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableTextBody } from "@/components";
import { dateLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { getPost, getPostSlugs, objectPosition } from "@/sanity/content";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getDictionary();
  const post = await getPost(slug, locale);
  if (!post) return {};

  return {
    title: post.title || undefined,
    description: post.excerpt || undefined,
    openGraph: post.cover ? { images: [{ url: post.cover.src }] } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { locale } = await getDictionary();
  const post = await getPost(slug, locale);

  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(dateLocale[locale], {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <article className={`container ${styles.article}`}>
      <header className={styles.header}>
        <div className={styles.meta}>
          {date && <time dateTime={post.publishedAt}>{date}</time>}
          {post.tag && <span className={styles.tag}>{post.tag}</span>}
        </div>
        <h1 className="h1">{post.title}</h1>
      </header>

      {post.cover && (
        <div className={styles.cover}>
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(max-width: 1240px) 100vw, 1144px"
            placeholder={post.cover.lqip ? "blur" : undefined}
            blurDataURL={post.cover.lqip}
            style={{ objectFit: "cover", objectPosition: objectPosition(post.cover) }}
            priority
          />
        </div>
      )}

      <div className={styles.body}>
        <PortableTextBody value={post.body} />
      </div>
    </article>
  );
}
