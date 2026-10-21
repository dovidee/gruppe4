import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { objectPosition, type Project } from "@/sanity/content";
import { Contributors } from "./Contributors";
import { SkillChips } from "./SkillChips";
import styles from "./ProjectPanel.module.css";

export function ProjectPanel({ project, locale }: { project: Project; locale: Locale }) {
  const t = dictionaries[locale];
  // Projects entered before "Laget av" existed only have a plain-text author
  // line and one repository link.
  const legacy = project.contributors.length === 0;

  return (
    <article className={styles.panel}>
      <div className={styles.cover}>
        {project.cover && (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 760px) 100vw, 680px"
            placeholder={project.cover.lqip ? "blur" : undefined}
            blurDataURL={project.cover.lqip}
            style={{ objectFit: "cover", objectPosition: objectPosition(project.cover) }}
          />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <h2 className={styles.title}>{project.title}</h2>
          {project.meta && <p className={styles.meta}>{project.meta}</p>}
        </div>
        {project.summary && <p className={styles.summary}>{project.summary}</p>}
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

        <Link className={styles.more} href={`/prosjekter/${project.slug}`}>
          {t.moreInfo}
          <LuArrowRight aria-hidden />
        </Link>
      </div>
    </article>
  );
}
