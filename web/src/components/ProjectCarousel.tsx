"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { objectPosition, type MemberProject, type SanityImageData } from "@/sanity/content";
import styles from "./ProjectCarousel.module.css";

const AUTO_ADVANCE_MS = 5000;
// A press that moves less than this is a click, not a drag.
const DRAG_SLOP_PX = 6;

type ProjectCarouselProps = {
  projects: MemberProject[];
  memberName: string;
  memberPortrait: SanityImageData;
  locale: Locale;
};

// Signed distance from card i to the (fractional) position, wrapped so every
// card sits within half a turn of the centre.
function offset(i: number, position: number, count: number) {
  const raw = (((i - position) % count) + count) % count;
  return raw > count / 2 ? raw - count : raw;
}

// A member's own projects as a row of cards: one in focus, its neighbours
// glimpsed left and right. It turns every five seconds; a side card can be
// clicked into focus, and holding and dragging turns it at the speed of the
// pointer, no flick needed.
export function ProjectCarousel({
  projects,
  memberName,
  memberPortrait,
  locale,
}: ProjectCarouselProps) {
  const t = dictionaries[locale];
  const count = projects.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; start: number; moved: boolean; id: number } | null>(null);
  const justDragged = useRef(false);
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const active = ((Math.round(position) % count) + count) % count;

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
      threshold: 0.5,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const autoplay = count > 1 && visible && !held && !dragging && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => setPosition((p) => Math.round(p) + 1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [autoplay]);

  const cardWidth = () => {
    const card = trackRef.current?.querySelector<HTMLElement>("[data-card]");
    return card?.offsetWidth || 280;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (count < 2 || event.button !== 0) return;
    drag.current = { x: event.clientX, start: position, moved: false, id: event.pointerId };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.x;
    if (!state.moved && Math.abs(dx) < DRAG_SLOP_PX) return;
    if (!state.moved) {
      state.moved = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    // One card width of pointer travel turns the row by one card.
    setPosition(state.start - dx / cardWidth());
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;
    if (state.moved) {
      justDragged.current = true;
      window.setTimeout(() => {
        justDragged.current = false;
      }, 0);
      setDragging(false);
      setPosition((p) => Math.round(p));
    }
  };

  // A drag that ends over a card must not also count as a click on it. The
  // click fires after pointerup has already re-rendered, hence a ref.
  const onClickCapture = (event: React.MouseEvent) => {
    if (justDragged.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const focusCard = (i: number) => setPosition((p) => Math.round(p) + offset(i, Math.round(p), count));

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setHeld(false);
      }}
    >
      <div className={styles.owner}>
        <span className={styles.avatar}>
          {memberPortrait && (
            <Image
              src={memberPortrait.src}
              alt=""
              fill
              sizes="56px"
              style={{ objectFit: "cover", objectPosition: objectPosition(memberPortrait) }}
            />
          )}
        </span>
        <h3 className={styles.ownerHeading}>{t.projectsBy(memberName)}</h3>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        data-dragging={dragging || undefined}
        data-draggable={count > 1 || undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.projectsBy(memberName)}
      >
        {projects.map((project, i) => {
          const d = count > 1 ? offset(i, position, count) : 0;
          const isActive = i === active;
          return (
            <article
              key={project.id}
              data-card
              className={styles.card}
              data-active={isActive || undefined}
              data-far={Math.abs(d) > 1.5 || undefined}
              style={
                {
                  "--d": d,
                  "--ad": Math.abs(d),
                  zIndex: 10 - Math.round(Math.abs(d) * 3),
                } as CSSProperties
              }
              aria-hidden={!isActive || undefined}
              inert={!isActive}
            >
              <div className={styles.cover}>
                {project.cover && (
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="320px"
                    draggable={false}
                    style={{ objectFit: "cover", objectPosition: objectPosition(project.cover) }}
                  />
                )}
              </div>
              <div className={styles.cardBody}>
                <h4 className={styles.title}>{project.title}</h4>
                {project.summary && <p className={styles.summary}>{project.summary}</p>}
                <div className={styles.actions}>
                  {project.githubUrl && (
                    <a
                      className={styles.github}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title}: ${t.viewOnGitHub}`}
                    >
                      <SiGithub aria-hidden />
                    </a>
                  )}
                  {project.slug && (
                    <Link className={styles.more} href={`/prosjekter/${project.slug}`}>
                      {t.moreInfo}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        {/* Side cards are inert while out of focus; these invisible buttons on
            top of them are what a click (or the keyboard) actually hits. */}
        {count > 1 &&
          projects.map((project, i) => {
            const d = offset(i, position, count);
            if (i === active || Math.abs(d) > 1.5) return null;
            return (
              <button
                key={project.id}
                type="button"
                className={styles.sideHit}
                data-side={d < 0 ? "left" : "right"}
                onClick={() => focusCard(i)}
                aria-label={t.showProject(project.title)}
              />
            );
          })}
      </div>

      {count > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => setPosition((p) => Math.round(p) - 1)}
            aria-label={t.previousProject}
          >
            <LuChevronLeft aria-hidden />
          </button>
          <p className={styles.hint} aria-live={autoplay ? "off" : "polite"}>
            <span className="visually-hidden">{projects[active]?.title}, </span>
            {active + 1} / {count}
          </p>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => setPosition((p) => Math.round(p) + 1)}
            aria-label={t.nextProject}
          >
            <LuChevronRight aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
