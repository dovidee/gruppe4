import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { type Contributor, objectPosition } from "@/sanity/content";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import styles from "./Contributors.module.css";

type ContributorsProps = {
  contributors: Contributor[];
  locale: Locale;
};

function joinNames(names: string[], and: string) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} ${and} ${names[names.length - 1]}`;
}

// One button per repository. People who worked on the same repository share a
// button: their faces overlap inside it, followed by their first names.
export function Contributors({ contributors, locale }: ContributorsProps) {
  const t = dictionaries[locale];
  if (contributors.length === 0) return null;

  const groups = new Map<string, Contributor[]>();
  for (const person of contributors) {
    const key = person.githubUrl ?? "";
    groups.set(key, [...(groups.get(key) ?? []), person]);
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>{t.madeBy}</p>
      <ul className={styles.list}>
        {[...groups].map(([url, people]) => {
          const firstNames = joinNames(
            people.map((p) => p.name.split(" ")[0]),
            t.and,
          );
          const content = (
            <>
              <span className={styles.faces}>
                {people.map((person) => (
                  <span key={person.id} className={styles.face}>
                    {person.portrait ? (
                      <Image
                        src={person.portrait.src}
                        alt=""
                        fill
                        sizes="36px"
                        style={{
                          objectFit: "cover",
                          objectPosition: objectPosition(person.portrait),
                        }}
                      />
                    ) : (
                      <span aria-hidden="true">{person.name.charAt(0)}</span>
                    )}
                  </span>
                ))}
              </span>
              <span className={styles.name}>{firstNames}</span>
            </>
          );
          return (
            <li key={url || "no-link"}>
              {url ? (
                <a
                  className={styles.person}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.codeBy(
                    joinNames(
                      people.map((p) => p.name),
                      t.and,
                    ),
                  )}
                >
                  {content}
                  <SiGithub className={styles.github} aria-hidden />
                </a>
              ) : (
                <span className={styles.person} data-static="">
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
