"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./NavPill.module.css";

type NavPillProps = {
  items: { label: string; href: string }[];
  isActive: (href: string) => boolean;
  label: string;
};

// One highlight slides between the links: it rests on the current page,
// follows the pointer or keyboard focus to another link (dimming the current
// one), and slides back when the pointer leaves.
export function NavPill({ items, isActive, label }: NavPillProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [box, setBox] = useState<{ x: number; w: number } | null>(null);

  const activeIndex = items.findIndex((item) => isActive(item.href));
  const target = hovered ?? (activeIndex >= 0 ? activeIndex : null);

  useLayoutEffect(() => {
    const measure = () => {
      const link = target === null ? null : linkRefs.current[target];
      setBox(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
    };
    measure();
    const list = listRef.current;
    if (!list) return;
    // Label widths change when the font loads or the language switches.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [target]);

  return (
    <nav aria-label={label}>
      <ul
        ref={listRef}
        className={styles.pill}
        data-hovering={hovered !== null && hovered !== activeIndex ? "" : undefined}
        onPointerLeave={() => setHovered(null)}
      >
        <li
          aria-hidden="true"
          className={styles.indicator}
          data-visible={box ? "" : undefined}
          style={box ? { transform: `translateX(${box.x}px)`, width: box.w } : undefined}
        />
        {items.map((item, i) => {
          const active = i === activeIndex;
          return (
            <li key={item.href}>
              <Link
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={item.href}
                className={styles.link}
                data-active={active ? "" : undefined}
                data-target={i === target ? "" : undefined}
                aria-current={active ? "page" : undefined}
                onPointerEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
