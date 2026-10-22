import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { skillIcon } from "./skillIcons";
import styles from "./SkillChips.module.css";

type SkillChipsProps = {
  skills: string[];
  learning?: string[];
  locale: Locale;
  // "stack" lists a project's technologies: no known/learning distinction.
  variant?: "member" | "stack";
};

// Skills as icons instead of words. Solid chips are things the member knows,
// dashed chips things they want to learn. The name appears on hover and is
// always available to screen readers. Not interactive, so no lift and no
// pointer cursor; only the colour wakes up.
export function SkillChips({ skills, learning = [], locale, variant = "member" }: SkillChipsProps) {
  const t = dictionaries[locale];
  const known = new Set(skills.map((s) => s.trim().toLowerCase()));
  const items = [
    ...skills.map((name) => ({ name, learning: false })),
    ...learning
      .filter((name) => !known.has(name.trim().toLowerCase()))
      .map((name) => ({ name, learning: true })),
  ];

  if (items.length === 0) return null;

  return (
    <div className={styles.wrap}>
      <ul className={styles.list}>
        {items.map(({ name, learning: isLearning }) => {
          const { Icon, color, label } = skillIcon(name);
          const text = label[locale];
          return (
            <li
              key={`${isLearning ? "l" : "k"}-${name}`}
              className={styles.chip}
              data-learning={isLearning || undefined}
              data-label={text}
              style={{ "--c": color } as CSSProperties}
            >
              <Icon aria-hidden />
              <span className="visually-hidden">
                {variant === "stack" ? text : `${isLearning ? t.skillLearning : t.skillCan}: ${text}`}
              </span>
            </li>
          );
        })}
      </ul>
      {items.some((item) => item.learning) && (
        <p className={styles.legend} aria-hidden="true">
          <span className={styles.legendSwatch} />
          {t.learningLegend}
        </p>
      )}
    </div>
  );
}
