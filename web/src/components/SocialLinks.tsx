import { FaLinkedinIn } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import styles from "./SocialLinks.module.css";

type SocialLinksProps = {
  name: string;
  linkedin?: string;
  github?: string;
  email?: string;
  locale: Locale;
};

// The only things on a member card that are buttons, so they look like it:
// they lift, light up in the service's colour and catch a sheen.
export function SocialLinks({ name, linkedin, github, email, locale }: SocialLinksProps) {
  const t = dictionaries[locale];
  if (!linkedin && !github && !email) return null;

  return (
    <ul className={styles.links}>
      {email && (
        <li>
          <a
            className={styles.link}
            data-service="email"
            href={`mailto:${email}`}
            aria-label={t.emailTo(name)}
            title={email}
          >
            <LuMail aria-hidden />
          </a>
        </li>
      )}
      {linkedin && (
        <li>
          <a
            className={styles.link}
            data-service="linkedin"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.onLinkedIn(name)}
            title="LinkedIn"
          >
            <FaLinkedinIn aria-hidden />
          </a>
        </li>
      )}
      {github && (
        <li>
          <a
            className={styles.link}
            data-service="github"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.onGitHub(name)}
            title="GitHub"
          >
            <SiGithub aria-hidden />
          </a>
        </li>
      )}
    </ul>
  );
}
