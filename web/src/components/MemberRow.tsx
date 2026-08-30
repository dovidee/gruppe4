"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { Member } from "@/sanity/content";
import { Chip } from "./Chip";
import styles from "./MemberRow.module.css";

const TINTS = [
  "var(--tint-1)",
  "var(--tint-2)",
  "var(--tint-3)",
  "var(--tint-4)",
  "var(--tint-5)",
  "var(--tint-6)",
];

export function MemberRow({
  member,
  initiallyExpanded = false,
}: {
  member: Member;
  initiallyExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const bioId = useId();
  const tint = TINTS[(member.order - 1) % TINTS.length];

  return (
    <div className={styles.row}>
      <div className={styles.portraitWrap}>
        {member.portrait ? (
          <Image
            src={member.portrait.src}
            alt={member.portrait.alt}
            fill
            sizes="(max-width: 700px) 180px, 190px"
            style={{
              objectFit: "cover",
              objectPosition: member.portrait.hotspot
                ? `${member.portrait.hotspot.x * 100}% ${member.portrait.hotspot.y * 100}%`
                : "50% 50%",
            }}
          />
        ) : (
          <div className={styles.placeholder} style={{ background: tint }}>
            <span>{member.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <h3 className="h3">{member.name}</h3>
        <p className={`role ${styles.role}`}>{member.role}</p>

        <p id={bioId} className={expanded ? styles.bioExpanded : styles.bio}>
          {member.bio}
        </p>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          aria-controls={bioId}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Vis mindre −" : "Les mer +"}
        </button>

        {member.skills.length > 0 && (
          <div className={styles.skillGroup}>
            <span className={styles.groupLabel}>Har lært</span>
            <div className={styles.chips}>
              {member.skills.map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </div>
          </div>
        )}

        {member.learning.length > 0 && (
          <div className={styles.skillGroup}>
            <span className={styles.groupLabel}>Vil lære</span>
            <div className={styles.chips}>
              {member.learning.map((skill) => (
                <Chip key={skill} label={skill} variant="want" />
              ))}
            </div>
          </div>
        )}

        {(member.linkedin || member.github || member.email) && (
          <div className={styles.contact}>
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {member.email && <a href={`mailto:${member.email}`}>E-post</a>}
          </div>
        )}
      </div>
    </div>
  );
}
