import type { SanityImageData } from "@/sanity/content";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./Hero.module.css";

type CTA = {
  label: string;
  href: string;
};

type HeroProps = {
  image: SanityImageData;
  caption?: string;
  eyebrow?: string;
  headline: string;
  subline?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
};

export function Hero({
  image,
  caption,
  eyebrow,
  headline,
  subline,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  // On mobile the hero stacks and the media box takes the photo's own ratio, so
  // the full group stays visible instead of being cropped to the centre.
  const heroStyle = image?.aspectRatio
    ? ({ "--hero-ratio": String(image.aspectRatio) } as CSSProperties)
    : undefined;

  return (
    <div className={styles.hero} style={heroStyle}>
      {image && (
        <div className={styles.media}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            placeholder={image.lqip ? "blur" : undefined}
            blurDataURL={image.lqip}
            style={{
              objectFit: "cover",
              objectPosition: image.hotspot
                ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                : "50% 50%",
            }}
          />
          <div className={styles.scrim} />
        </div>
      )}
      <div className={styles.content}>
        {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
        <h1 className={`h1 ${styles.headline}`}>{headline}</h1>
        {subline && <p className={styles.subline}>{subline}</p>}
        {(ctaPrimary || ctaSecondary) && (
          <div className={styles.ctas}>
            {ctaPrimary && (
              <Link href={ctaPrimary.href} className={styles.primary}>
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className={styles.secondary}>
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
