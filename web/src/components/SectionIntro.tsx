import styles from "./SectionIntro.module.css";

type SectionIntroProps = {
  heading: string;
  lede?: string;
  as?: "h1" | "h2";
  id?: string;
  accent?: boolean;
};

// A section's title gets the screen to itself, centred, before the content it
// introduces scrolls in underneath.
export function SectionIntro({ heading, lede, as = "h2", id, accent }: SectionIntroProps) {
  const Heading = as;
  return (
    <header className={styles.intro}>
      <Heading id={id} className={`display reveal ${styles.heading}${accent ? ` ${styles.accent}` : ""}`}>
        {heading}
      </Heading>
      {lede && <p className={`lede reveal ${styles.lede}`}>{lede}</p>}
    </header>
  );
}
