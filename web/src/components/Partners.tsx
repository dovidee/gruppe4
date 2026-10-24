"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./Partners.module.css";

const INTERVAL_MS = 4000;
const SWAP_MS = 450;

// Brand colours, matched on the partner's name. Anything else uses the ink colour.
const BRAND_COLOURS: Record<string, string> = {
  "universitetet i agder": "oklch(53% 0.207 22.3)", // #C8102E
  "university of agder": "oklch(53% 0.207 22.3)",
  "sør-tre": "oklch(62.1% 0.22 25.5)", // #EE3539
};

type PartnersProps = {
  lead: string;
  names: string[];
};

// Partner names as text set like logos (the real logos are trademarks), side by
// side under a thin rule. Every four seconds they shrink away, trade places and
// grow back. Motion runs only while the row is on screen and never under
// reduced motion.
export function Partners({ lead, names }: PartnersProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const animating = names.length > 1 && visible && !reducedMotion;

  useEffect(() => {
    if (!animating) {
      setPhase("in");
      return;
    }
    let swap: number | undefined;
    const timer = window.setInterval(() => {
      setPhase("out");
      swap = window.setTimeout(() => {
        setOffset((o) => (o + 1) % names.length);
        setPhase("in");
      }, SWAP_MS);
    }, INTERVAL_MS);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swap);
    };
  }, [animating, names.length]);

  if (names.length === 0) return null;

  return (
    <section ref={rootRef} className={styles.partners} aria-labelledby="partnere">
      <h2 id="partnere" className={styles.lead}>
        {lead}
      </h2>
      <ul className={styles.row} data-phase={phase}>
        {names.map((name, i) => (
          <li
            key={name}
            className={styles.name}
            style={
              {
                order: (i - offset + names.length) % names.length,
                "--brand": BRAND_COLOURS[name.trim().toLowerCase()] ?? "var(--ink)",
              } as CSSProperties
            }
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
