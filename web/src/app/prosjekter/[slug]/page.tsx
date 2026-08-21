import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Chip, PortableTextBody } from "@/components";
import { getProject, getProjectSlugs } from "@/sanity/content";
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
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.title || undefined,
    description: project.summary || undefined,
    openGraph: project.cover ? { images: [{ url: project.cover.src }] } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <article className="section container">
      {project.cover && (
        <div className={styles.cover}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 960px) 100vw, 960px"
            placeholder={project.cover.lqip ? "blur" : undefined}
            blurDataURL={project.cover.lqip}
            style={{
              objectFit: "cover",
              objectPosition: project.cover.hotspot
                ? `${project.cover.hotspot.x * 100}% ${project.cover.hotspot.y * 100}%`
                : "50% 50%",
            }}
            priority
          />
        </div>
      )}

      {project.meta && <p className={`mono ${styles.meta}`}>{project.meta}</p>}
      <h1 className={`h1 ${styles.title}`}>{project.title}</h1>
      {project.summary && <p className={`lede ${styles.summary}`}>{project.summary}</p>}
      {project.authors && <p className={styles.authors}>Laget av {project.authors}</p>}

      {project.roleNote && <p className={styles.callout}>{project.roleNote}</p>}

      {project.stack.length > 0 && (
        <div className={styles.chips}>
          {project.stack.map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
        </div>
      )}

      {project.sections.map((section, i) => (
        <section key={i} className={styles.section}>
          {section.heading && <h2 className={`h2 ${styles.sectionHeading}`}>{section.heading}</h2>}
          <PortableTextBody value={section.body} />
        </section>
      ))}

      {project.githubUrl && (
        <a
          className={styles.githubLink}
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Se på GitHub
        </a>
      )}
    </article>
  );
}
