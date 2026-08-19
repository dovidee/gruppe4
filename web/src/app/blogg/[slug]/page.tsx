import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableTextBody } from "@/components";
import { getPost, getPostSlugs } from "@/sanity/content";
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
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title || undefined,
    description: post.excerpt || undefined,
    openGraph: post.cover ? { images: [{ url: post.cover.src }] } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <article className="section container">
      {post.cover && (
        <div className={styles.cover}>
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(max-width: 960px) 100vw, 960px"
            placeholder={post.cover.lqip ? "blur" : undefined}
            blurDataURL={post.cover.lqip}
            style={{
              objectFit: "cover",
              objectPosition: post.cover.hotspot
                ? `${post.cover.hotspot.x * 100}% ${post.cover.hotspot.y * 100}%`
                : "50% 50%",
            }}
            priority
          />
        </div>
      )}

      <div className={`mono ${styles.meta}`}>
        {date && <time dateTime={post.publishedAt}>{date}</time>}
        {post.tag && <span className={`eyebrow ${styles.tag}`}>{post.tag}</span>}
      </div>

      <h1 className={`h1 ${styles.title}`}>{post.title}</h1>

      <PortableTextBody value={post.body} />
    </article>
  );
}
