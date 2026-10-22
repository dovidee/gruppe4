import type { CSSProperties, ReactNode } from "react";
import styles from "./Stack.module.css";

// Scroll-stacked panels: each one sticks near the top and the next slides up
// over it, leaving a sliver of the previous panel showing. Pure CSS (sticky),
// so it costs nothing at runtime and degrades to a normal list.
export function Stack({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <ol className={styles.stack} aria-label={label}>
      {children}
    </ol>
  );
}

type StackItemProps = {
  index: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function StackItem({ index, children, className, style }: StackItemProps) {
  return (
    <li
      className={className ? `${styles.item} ${className}` : styles.item}
      style={{ ...style, "--i": Math.min(index, 6) } as CSSProperties}
    >
      {children}
    </li>
  );
}
