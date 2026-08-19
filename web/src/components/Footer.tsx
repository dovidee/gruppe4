import styles from "./Footer.module.css";

type FooterProps = {
  groupName: string;
  contactEmail?: string;
  responsePromise?: string;
};

export function Footer({ groupName, contactEmail, responsePromise }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className="mono">
        {groupName}, {year}
      </span>
      {contactEmail && (
        <a className={styles.email} href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      )}
      {responsePromise && <span className={styles.promise}>{responsePromise}</span>}
    </footer>
  );
}
