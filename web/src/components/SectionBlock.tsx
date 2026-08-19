import type { ReactNode } from "react";
import styles from "./SectionBlock.module.css";

type SectionBlockProps = {
  eyebrow?: string;
  heading?: string;
  lede?: string;
  children?: ReactNode;
  headingAs?: "h1" | "h2";
};

export function SectionBlock({
  eyebrow,
  heading,
  lede,
  children,
  headingAs = "h2",
}: SectionBlockProps) {
  const Heading = headingAs;

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        {(eyebrow || heading || lede) && (
          <div className={styles.head}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <Heading className={headingAs === "h1" ? "h1" : "h2"}>{heading}</Heading>
            )}
            {lede && <p className={`lede ${styles.lede}`}>{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
