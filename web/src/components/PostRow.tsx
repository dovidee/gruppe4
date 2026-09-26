import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/sanity/content";
import styles from "./PostRow.module.css";

export function PostRow({ post }: { post: Post }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Link href={`/blogg/${post.slug}`} className={styles.row}>
      <div className={styles.cover}>
        {post.cover && (
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(max-width: 700px) 100vw, 200px"
            placeholder={post.cover.lqip ? "blur" : undefined}
            blurDataURL={post.cover.lqip}
            style={{
              objectFit: "cover",
              objectPosition: post.cover.hotspot
                ? `${post.cover.hotspot.x * 100}% ${post.cover.hotspot.y * 100}%`
                : "50% 50%",
            }}
          />
        )}
      </div>
      <div className={styles.body}>
        {date && (
          <time className={styles.date} dateTime={post.publishedAt}>
            {date}
          </time>
        )}
        <h3 className="h3">{post.title}</h3>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        {post.tag && <span className={`eyebrow ${styles.tag}`}>{post.tag}</span>}
      </div>
    </Link>
  );
}
