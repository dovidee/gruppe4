import type { ReactNode } from "react";
import styles from "./Stack.module.css";

// Scroll-stacked panels: each one sticks near the top and the next slides up
// over it, leaving a sliver of the previous panel showing. Sticky CSS does the
// work; StackItem only adjusts the offset for panels taller than the window.
export function Stack({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <ol className={styles.stack} aria-label={label}>
      {children}
    </ol>
  );
}

export { StackItem } from "./StackItem";
