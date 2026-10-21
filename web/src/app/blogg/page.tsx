import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmptyState, PortableTextBody, PostRow } from "@/components";
import { dateLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";
import { paths } from "@/resources";
import { getPost, getPosts, getSiteSettings, objectPosition } from "@/sanity/content";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  const settings = await getSiteSettings(locale);
  const label = settings.nav.find((item) => item.href === paths.blogg)?.label;
  return { title: label || undefined };
}

// The newest post is printed in full at the top, so the blog opens on reading
// rather than on a list; older posts follow underneath. Categories come from
// the posts' own "Kategori" field in Sanity and filter through the URL.
export default async function BloggPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, t } = await getDictionary();
  const posts = await getPosts(locale);
  const requested = (await searchParams).kategori;
  const categories = Array.from(new Set(posts.map((p) => p.tag).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, dateLocale[locale]),
  );
  const category =
    typeof requested === "string" && categories.includes(requested) ? requested : null;
  const shown = category ? posts.filter((p) => p.tag === category) : posts;
  const [first, ...rest] = shown;
  const featured = first ? await getPost(first.slug, locale) : null;

  const formatDate = (value: string) =>
    value
      ? new Date(value).toLocaleDateString(dateLocale[locale], {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  return (
    <>
      <h1 className="visually-hidden">{t.blogHeading}</h1>

      <div className={`container ${styles.layout}`}>
        <div className={styles.main}>
          {!featured ? (
            <EmptyState title={category ? t.noPostsInCategory : t.noPosts} />
          ) : (
            <article className={styles.featured}>
              <h2 className={`h1 ${styles.featuredTitle}`}>
                <Link href={`/blogg/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <div className={styles.meta}>
                {featured.publishedAt && (
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                )}
                {featured.tag && <span className={styles.tag}>{featured.tag}</span>}
              </div>
              {featured.cover && (
                <div className={styles.cover}>
                  <Image
                    src={featured.cover.src}
                    alt={featured.cover.alt}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 800px"
                    placeholder={featured.cover.lqip ? "blur" : undefined}
                    blurDataURL={featured.cover.lqip}
                    style={{ objectFit: "cover", objectPosition: objectPosition(featured.cover) }}
                  />
                </div>
              )}
              <PortableTextBody value={featured.body} />
            </article>
          )}

          {rest.length > 0 && (
            <section className={styles.more} aria-labelledby="flere-innlegg">
              <h2 id="flere-innlegg" className="h2">
                {t.morePosts}
              </h2>
              <div className={styles.list}>
                {rest.map((post) => (
                  <PostRow key={post.id} post={post} locale={locale} />
                ))}
              </div>
            </section>
          )}
        </div>

        {categories.length > 0 && (
          <aside className={styles.aside}>
            <nav aria-label={t.blogCategories} className={styles.categories}>
              <p className={styles.asideHeading}>{t.blogCategories}</p>
              <ul className={styles.chips}>
                <li>
                  <Link
                    href={paths.blogg}
                    className={styles.chip}
                    aria-current={category === null ? "page" : undefined}
                  >
                    {t.allCategories}
                  </Link>
                </li>
                {categories.map((value) => (
                  <li key={value}>
                    <Link
                      href={`${paths.blogg}?kategori=${encodeURIComponent(value)}`}
                      className={styles.chip}
                      aria-current={category === value ? "page" : undefined}
                    >
                      {value}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </>
  );
}
