import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, paths } from "@/resources";
import { getSiteSettings } from "@/sanity/content";

export async function generateMetadata() {
  const { gallery } = await getSiteSettings();

  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: paths.gallery,
  });
}

export default async function Gallery() {
  const { gallery, person } = await getSiteSettings();

  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={paths.gallery}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${paths.gallery}`,
          image: person.avatar,
        }}
      />
      <GalleryView images={gallery.images} />
    </Flex>
  );
}
