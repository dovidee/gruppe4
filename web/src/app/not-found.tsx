import Link from "next/link";
import { getDictionary } from "@/i18n/server";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const { t } = await getDictionary();

  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className="h1">{t.notFoundHeading}</h1>
      <p className="lede">{t.notFoundBody}</p>
      <Link className={styles.button} href="/">
        {t.notFoundBack}
      </Link>
    </div>
  );
}
