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
  // A page's <h1> must exist in the DOM even before Sanity content is filled
  // in, the same way Hero always emits its <h1> tag regardless of content.
  const isH1 = headingAs === "h1";

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        {(eyebrow || heading || lede || isH1) && (
          <div className={styles.head}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {(heading || isH1) && (
              <Heading className={isH1 ? "h1" : "h2"}>{heading}</Heading>
            )}
            {lede && <p className={`lede ${styles.lede}`}>{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
