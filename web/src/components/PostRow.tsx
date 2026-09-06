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
      <time className={styles.date} dateTime={post.publishedAt}>
        {date}
      </time>
      <div className={styles.body}>
        <h3 className="h3">{post.title}</h3>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        {post.tag && <span className={`eyebrow ${styles.tag}`}>{post.tag}</span>}
      </div>
    </Link>
  );
}
