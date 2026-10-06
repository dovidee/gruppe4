import type { SanityVideoData } from "@/sanity/content";
import styles from "./VideoPlayer.module.css";

type VideoPlayerProps = {
  video: NonNullable<SanityVideoData>;
};

export function VideoPlayer({ video }: VideoPlayerProps) {
  // Without a poster, iOS shows an empty frame; the media fragment makes it render the first frame.
  const src = video.poster ? video.src : `${video.src}#t=0.001`;

  return (
    <div className={styles.player}>
      {/* biome-ignore lint/a11y/useMediaCaption: the track renders when a .vtt is uploaded */}
      <video
        className={styles.video}
        controls
        playsInline
        preload="metadata"
        poster={video.poster}
        aria-label={video.title || undefined}
        crossOrigin={video.captions ? "anonymous" : undefined}
      >
        <source src={src} type={video.mimeType} />
        {video.captions && (
          <track kind="captions" src={video.captions} srcLang="no" label="Norsk" />
        )}
        <a href={video.src}>Last ned videoen</a>
      </video>
    </div>
  );
}
