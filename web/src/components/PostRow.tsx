import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { dateLocale, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { objectPosition, type Post } from "@/sanity/content";
import styles from "./PostRow.module.css";

export function PostRow({ post, locale }: { post: Post; locale: Locale }) {
  const t = dictionaries[locale];
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(dateLocale[locale], {
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
            alt=""
            fill
            sizes="(max-width: 700px) 100vw, 180px"
            placeholder={post.cover.lqip ? "blur" : undefined}
            blurDataURL={post.cover.lqip}
            style={{ objectFit: "cover", objectPosition: objectPosition(post.cover) }}
          />
        )}
      </div>
      <div className={styles.body}>
        <h3 className="h3">{post.title}</h3>
        <div className={styles.meta}>
          {date && <time dateTime={post.publishedAt}>{date}</time>}
          {post.tag && <span className={styles.tag}>{post.tag}</span>}
        </div>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
        <span className={styles.read}>
          {t.readPost}
          <LuArrowRight aria-hidden />
        </span>
      </div>
    </Link>
  );
}
