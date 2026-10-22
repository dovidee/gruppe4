import type { ReactNode } from "react";
import styles from "./SectionBlock.module.css";

type SectionBlockProps = {
  id?: string;
  heading?: string;
  lede?: string;
  children?: ReactNode;
  headingAs?: "h1" | "h2";
};

export function SectionBlock({ id, heading, lede, children, headingAs = "h2" }: SectionBlockProps) {
  const Heading = headingAs;
  // A page's <h1> must exist in the DOM even before Sanity content is filled
  // in.
  const isH1 = headingAs === "h1";

  return (
    <section id={id} className="section">
      <div className="container">
        {(heading || lede || isH1) && (
          <div className={styles.head}>
            {(heading || isH1) && <Heading className={isH1 ? "h1" : "h2"}>{heading}</Heading>}
            {lede && <p className="lede">{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
