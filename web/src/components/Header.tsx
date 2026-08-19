"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  groupName: string;
  nav: NavItem[];
};

function Wordmark({ groupName }: { groupName: string }) {
  const parts = groupName.split(/(\d+)/);
  return (
    <span className={styles.wordmark}>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <span key={i} className={styles.numeral}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

export function Header({ groupName, nav }: HeaderProps) {
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmarkLink} aria-label="Til forsiden">
        <Wordmark groupName={groupName} />
      </Link>
      <nav className={styles.nav} aria-label="Hovedmeny">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item.href) ? styles.navItemActive : styles.navItem}
            aria-current={isActive(item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
