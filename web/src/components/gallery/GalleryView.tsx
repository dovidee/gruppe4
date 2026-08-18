"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import type { SiteSettings } from "@/sanity/content";

interface GalleryViewProps {
  images: SiteSettings["gallery"]["images"];
}

export default function GalleryView({ images }: GalleryViewProps) {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {images.map((image, index) => (
        <Media
          enlarge
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={index}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </MasonryGrid>
  );
}
