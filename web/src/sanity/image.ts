import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source);

export function imageUrl(source: SanityImageSource | null | undefined, width: number): string | undefined {
  if (!source) return undefined;
  return urlFor(source).auto("format").width(width).fit("crop").url();
}
