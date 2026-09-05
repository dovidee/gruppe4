import styles from "./Footer.module.css";

type FooterProps = {
  groupName: string;
  responsePromise?: string;
};

export function Footer({ groupName, responsePromise }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>
        {groupName}, {year}
      </span>
      {responsePromise && <span className={styles.promise}>{responsePromise}</span>}
    </footer>
  );
}
