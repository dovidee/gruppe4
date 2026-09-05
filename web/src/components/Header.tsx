"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  nav: NavItem[];
};

export function Header({ nav }: HeaderProps) {
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink} aria-label="solveIT, til forsiden">
        <Image
          src="/solveit-logo.svg"
          alt=""
          width={85}
          height={30}
          className={styles.logo}
          priority
        />
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
