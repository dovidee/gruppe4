import type { Metadata } from "next";
import { EmptyState, PostRow, SectionBlock } from "@/components";
import { paths } from "@/resources";
import { getPosts, getSiteSettings } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const label = settings.nav.find((item) => item.href === paths.blogg)?.label;
  return { title: label || undefined };
}

export default async function BloggPage() {
  const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()]);
  const heading = settings.nav.find((item) => item.href === paths.blogg)?.label ?? "";

  return (
    <SectionBlock headingAs="h1" heading={heading}>
      {posts.length === 0 ? (
        <EmptyState title="Ingen innlegg ennå" />
      ) : (
        <div>
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </div>
      )}
    </SectionBlock>
  );
}
