"use client";

import { useEffect, useRef, useState } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import styles from "./Partners.module.css";

const INTERVAL_MS = 4000;

type PartnersProps = {
  lead: string;
  names: string[];
  locale: Locale;
};

// Partner names, as text only (the logos are trademarks). They take turns
// every four seconds with a zoom: the outgoing name grows away, the next one
// settles in. Rotation runs only while the section is on screen, stops for
// reduced motion, and can be paused.
export function Partners({ lead, names, locale }: PartnersProps) {
  const t = dictionaries[locale];
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
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

  const rotating = names.length > 1 && visible && !paused && !hovered && !reducedMotion;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % names.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [rotating, names.length]);

  if (names.length === 0) return null;

  return (
    <section
      ref={rootRef}
      className={styles.partners}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <h2 className="visually-hidden">
        {lead}
        <span className="visually-hidden">: {names.join(", ")}</span>
      </h2>

      <div className={styles.stage} aria-hidden="true" data-static={reducedMotion || undefined}>
        {names.map((name, i) => (
          <p
            key={name}
            className={styles.name}
            data-state={i === index ? "in" : i === (index - 1 + names.length) % names.length ? "out" : "idle"}
          >
            {name}
          </p>
        ))}
      </div>

      {names.length > 1 && !reducedMotion && (
        <button
          type="button"
          className={styles.pause}
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? t.playPartners : t.pausePartners}
          title={paused ? t.playPartners : t.pausePartners}
        >
          {paused ? <LuPlay aria-hidden /> : <LuPause aria-hidden />}
        </button>
      )}
    </section>
  );
}
