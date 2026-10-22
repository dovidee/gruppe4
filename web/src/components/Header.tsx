"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";
import { NavPill } from "./NavPill";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  nav: NavItem[];
  locale: Locale;
};

// Scrolled distance before the header may hide, and the per-frame movement
// that counts as a direction change rather than jitter.
const HIDE_AFTER = 160;
const DIRECTION_THRESHOLD = 6;
// Keep in sync with the breakpoint in Header.module.css.
const MOBILE_QUERY = "(max-width: 900px)";

export function Header({ nav, locale }: HeaderProps) {
  const t = dictionaries[locale];
  const pathname = usePathname() ?? "/";
  const panelId = useId();
  const [hidden, setHidden] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const lastY = useRef(0);

  // Hide on the way down, return on the way up (and at the very top).
  useEffect(() => {
    let frame = 0;
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (y < HIDE_AFTER) {
          setHidden(false);
        } else if (delta > DIRECTION_THRESHOLD) {
          setHidden(true);
          setPanelOpen(false);
        } else if (delta < -DIRECTION_THRESHOLD) {
          setHidden(false);
        }
        if (Math.abs(delta) > DIRECTION_THRESHOLD) lastY.current = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // A route change closes the mobile panel.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on navigation
  useEffect(() => {
    setPanelOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a className="skip-link" href="#innhold">
        {t.skipToContent}
      </a>

      <header className={styles.header} data-hidden={hidden || undefined}>
        <div className={styles.bar}>
          <Link href="/" className={styles.logoLink} aria-label={t.homeLink}>
            <Logo className={styles.logo} />
          </Link>

          <div className={styles.desktop}>
            <NavPill items={nav} isActive={isActive} label={t.mainNav} />
            <div className={styles.toggles}>
              <LanguageToggle locale={locale} />
              <ThemeToggle locale={locale} />
            </div>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={panelOpen}
            aria-controls={panelId}
            aria-label={panelOpen ? t.menuClose : t.menuOpen}
            onClick={() => setPanelOpen((open) => !open)}
          >
            {panelOpen ? <LuX aria-hidden /> : <LuMenu aria-hidden />}
          </button>
        </div>

        <div id={panelId} className={styles.panel} data-open={panelOpen || undefined}>
          <nav aria-label={t.mainNav}>
            <ul className={styles.panelList}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.panelLink}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.panelToggles}>
            <LanguageToggle locale={locale} />
            <ThemeToggle locale={locale} />
          </div>
        </div>
      </header>

      {/* While the header is tucked away, one small button brings it back
          without covering the page. */}
      <button
        type="button"
        className={styles.recall}
        data-visible={hidden || undefined}
        tabIndex={hidden ? 0 : -1}
        aria-hidden={!hidden}
        aria-label={t.menuOpen}
        onClick={() => {
          setHidden(false);
          // On small screens the bar holds only a menu button, so open the
          // panel straight away instead of asking for a second tap.
          if (window.matchMedia(MOBILE_QUERY).matches) setPanelOpen(true);
        }}
      >
        <LuMenu aria-hidden />
      </button>
    </>
  );
}
