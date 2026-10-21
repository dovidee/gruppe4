import styles from "./Footer.module.css";

type FooterProps = {
  groupName: string;
  university: string;
  tagline: string;
};

export function Footer({ groupName, university, tagline }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.group}>
          {groupName}, {year}
        </span>
        <span className={styles.university}>{university}</span>
        <span className={styles.tagline}>{tagline}</span>
      </div>
    </footer>
  );
}
