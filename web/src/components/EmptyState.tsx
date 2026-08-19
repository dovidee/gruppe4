import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title: string;
  body?: string;
};

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.title}>{title}</p>
      {body && <p className={styles.body}>{body}</p>}
    </div>
  );
}
