import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/sanity/content";
import { Chip } from "./Chip";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.cover}>
        {project.cover && (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: project.cover.hotspot
                ? `${project.cover.hotspot.x * 100}% ${project.cover.hotspot.y * 100}%`
                : "50% 50%",
            }}
          />
        )}
      </div>

      <div className={styles.body}>
        {project.meta && <p className={`mono ${styles.meta}`}>{project.meta}</p>}
        <h3 className="h3">{project.title}</h3>
        {project.summary && <p className={styles.summary}>{project.summary}</p>}
        {project.authors && <p className={styles.authors}>Laget av {project.authors}</p>}

        {project.stack.length > 0 && (
          <div className={styles.chips}>
            {project.stack.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </div>
        )}

        <div className={styles.actions}>
          {project.githubUrl ? (
            <a
              className={styles.ghostButton}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Se på GitHub
            </a>
          ) : (
            <button type="button" className={styles.ghostButton} disabled>
              Se på GitHub
            </button>
          )}
          <Link className={styles.solidButton} href={`/prosjekter/${project.slug}`}>
            Mer info
          </Link>
        </div>
      </div>
    </article>
  );
}
