"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LuPlay } from "react-icons/lu";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionary";
import { objectPosition, type SanityImageData, type SanityVideoData } from "@/sanity/content";
import styles from "./VideoStage.module.css";

type VideoStageProps = {
  video: SanityVideoData;
  fallbackImage: SanityImageData;
  locale: Locale;
};

// The first thing on the home page. The video waits behind a greyed overlay
// with a faint play button; hovering brings the overlay up in Sky and wakes
// the button, and clicking plays the video with the browser's own controls.
export function VideoStage({ video, fallbackImage, locale }: VideoStageProps) {
  const t = dictionaries[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!video) {
    if (!fallbackImage) return null;
    return (
      <div className={styles.stage}>
        <Image
          src={fallbackImage.src}
          alt={fallbackImage.alt}
          fill
          priority
          sizes="(max-width: 1240px) 100vw, 1240px"
          placeholder={fallbackImage.lqip ? "blur" : undefined}
          blurDataURL={fallbackImage.lqip}
          style={{ objectFit: "cover", objectPosition: objectPosition(fallbackImage) }}
        />
      </div>
    );
  }

  // Without a poster, iOS shows an empty frame; the media fragment makes it render the first frame.
  const src = video.poster ? video.src : `${video.src}#t=0.001`;

  const play = async () => {
    const element = videoRef.current;
    if (!element) return;
    setPlaying(true);
    element.controls = true;
    try {
      await element.play();
    } catch {
      // Playback refused (data saver, codec): the controls are there to retry.
    }
    element.focus();
  };

  return (
    <div className={styles.stage} data-playing={playing || undefined}>
      {/* biome-ignore lint/a11y/useMediaCaption: the track renders when a .vtt is uploaded */}
      <video
        ref={videoRef}
        className={styles.video}
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={video.title || undefined}
        crossOrigin={video.captions ? "anonymous" : undefined}
        tabIndex={playing ? 0 : -1}
      >
        <source src={src} type={video.mimeType} />
        {video.captions && (
          <track kind="captions" src={video.captions} srcLang="no" label={t.captionsLabel} />
        )}
        <a href={video.src}>{t.downloadVideo}</a>
      </video>

      {!playing && (
        <button type="button" className={styles.overlay} onClick={play} aria-label={t.playVideo}>
          <span className={styles.tint} aria-hidden="true" />
          <span className={styles.play} aria-hidden="true">
            <LuPlay />
          </span>
        </button>
      )}
    </div>
  );
}
