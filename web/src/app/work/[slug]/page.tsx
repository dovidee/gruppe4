import { notFound } from "next/navigation";
import { getProject, getProjectSlugs, getSiteSettings } from "@/sanity/content";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL, paths } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash } from "@/components";
import { PortableTextBody } from "@/components/PortableTextBody";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getProject(slug);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.images[0] || `/api/og/generate?title=${post.metadata.title}`,
    path: `${paths.work}/${post.slug}`,
  });
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, { person }] = await Promise.all([getProject(slug), getSiteSettings()]);

  if (!post) {
    notFound();
  }

  const avatars = post.metadata.team?.map((member) => ({ src: member.avatar })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${paths.work}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.images[0] ||
          `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${paths.about}`,
          image: person.avatar,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Prosjekter</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team.length > 0 && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team.map((member, idx) => (
              <span key={member.name}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <PortableTextBody value={post.body} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Relaterte prosjekter
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
