import Image from "next/image";
import { SiGithub } from "react-icons/si";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { type Contributor, objectPosition } from "@/sanity/content";
import styles from "./Contributors.module.css";

type ContributorsProps = {
  contributors: Contributor[];
  locale: Locale;
};

// Who made it, each with a link to their own repository: face, name, GitHub.
export function Contributors({ contributors, locale }: ContributorsProps) {
  const t = dictionaries[locale];
  if (contributors.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>{t.madeBy}</p>
      <ul className={styles.list}>
        {contributors.map((person) => {
          const face = (
            <span className={styles.face}>
              {person.portrait ? (
                <Image
                  src={person.portrait.src}
                  alt=""
                  fill
                  sizes="44px"
                  style={{ objectFit: "cover", objectPosition: objectPosition(person.portrait) }}
                />
              ) : (
                <span aria-hidden="true">{person.name.charAt(0)}</span>
              )}
            </span>
          );
          return (
            <li key={person.id}>
              {person.githubUrl ? (
                <a
                  className={styles.person}
                  href={person.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.codeBy(person.name)}
                >
                  {face}
                  <span className={styles.name}>{person.name}</span>
                  <SiGithub className={styles.github} aria-hidden />
                </a>
              ) : (
                <span className={styles.person} data-static="">
                  {face}
                  <span className={styles.name}>{person.name}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
