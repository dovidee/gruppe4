"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import styles from "./Stack.module.css";

type StackItemProps = {
  index: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const TOP_PX = 20;
const STEP_PX = 14;
const BOTTOM_GAP_PX = 20;

// A panel taller than the window would stick with its bottom off screen and
// then disappear under the next one. For those, the sticky offset goes
// negative by the overflow, so the panel sticks only once its bottom is in view.
export function StackItem({ index, children, className, style }: StackItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const step = Math.min(index, 6);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fit = () => {
      const overflow = TOP_PX + step * STEP_PX + node.offsetHeight + BOTTOM_GAP_PX - window.innerHeight;
      node.style.setProperty("--fit", `${Math.min(0, -overflow)}px`);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(node);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [step]);

  return (
    <li
      ref={ref}
      className={className ? `${styles.item} ${className}` : styles.item}
      style={{ ...style, "--i": step } as CSSProperties}
    >
      {children}
    </li>
  );
}
