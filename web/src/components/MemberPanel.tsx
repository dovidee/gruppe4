import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { objectPosition, type Member } from "@/sanity/content";
import { SkillChips } from "./SkillChips";
import { SocialLinks } from "./SocialLinks";
import styles from "./MemberPanel.module.css";

export function MemberPanel({ member, locale }: { member: Member; locale: Locale }) {
  return (
    <article className={styles.panel}>
      <div className={styles.portrait}>
        {member.portrait ? (
          <Image
            src={member.portrait.src}
            alt={member.portrait.alt}
            fill
            sizes="(max-width: 760px) 100vw, 560px"
            placeholder={member.portrait.lqip ? "blur" : undefined}
            blurDataURL={member.portrait.lqip}
            style={{ objectFit: "cover", objectPosition: objectPosition(member.portrait) }}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.who}>
          <h3 className={styles.name}>{member.name}</h3>
          {member.role && <p className={styles.role}>{member.role}</p>}
        </div>
        {member.bio && (
          <div className={styles.bio}>
            {member.bio.split(/\n\s*\n/).map((paragraph, i) => (
              // Paragraphs come from one text field and never reorder.
              // biome-ignore lint/suspicious/noArrayIndexKey: static split of one string
              <p key={i}>{paragraph.trim()}</p>
            ))}
          </div>
        )}
        <SkillChips skills={member.skills} learning={member.learning} locale={locale} />
        <SocialLinks
          name={member.name}
          linkedin={member.linkedin}
          github={member.github}
          email={member.email}
          locale={locale}
        />
      </div>
    </article>
  );
}
