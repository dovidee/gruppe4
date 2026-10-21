import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiGithub } from "react-icons/si";
import { Contributors, PortableTextBody, SkillChips } from "@/components";
import { getDictionary } from "@/i18n/server";
import { getProject, getProjectSlugs, objectPosition } from "@/sanity/content";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getDictionary();
  const project = await getProject(slug, locale);
  if (!project) return {};

  return {
    title: project.title || undefined,
    description: project.summary || undefined,
    openGraph: project.cover ? { images: [{ url: project.cover.src }] } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { locale, t } = await getDictionary();
  const project = await getProject(slug, locale);

  if (!project) notFound();

  const legacy = project.contributors.length === 0;

  return (
    <article className={`container ${styles.article}`}>
      <header className={styles.header}>
        {project.meta && <p className={styles.meta}>{project.meta}</p>}
        <h1 className="h1">{project.title}</h1>
        {project.summary && <p className="lede">{project.summary}</p>}
      </header>

      {project.cover && (
        <div className={styles.cover}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 1240px) 100vw, 1144px"
            placeholder={project.cover.lqip ? "blur" : undefined}
            blurDataURL={project.cover.lqip}
            style={{ objectFit: "cover", objectPosition: objectPosition(project.cover) }}
            priority
          />
        </div>
      )}

      <div className={styles.facts}>
        <SkillChips skills={project.stack} locale={locale} variant="stack" />
        {legacy ? (
          <div className={styles.legacy}>
            {project.authors && (
              <p className={styles.authors}>
                {t.madeBy} {project.authors}
              </p>
            )}
            {project.githubUrl && (
              <a
                className={styles.githubButton}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub aria-hidden />
                {t.viewOnGitHub}
              </a>
            )}
          </div>
        ) : (
          <Contributors contributors={project.contributors} locale={locale} />
        )}
      </div>

      {project.roleNote && <p className={styles.note}>{project.roleNote}</p>}

      {project.sections.map((section, i) => (
        <section key={i} className={styles.section}>
          {section.heading && <h2 className={`h2 ${styles.sectionHeading}`}>{section.heading}</h2>}
          <PortableTextBody value={section.body} />
        </section>
      ))}
    </article>
  );
}
