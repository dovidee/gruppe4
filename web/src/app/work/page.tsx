import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, paths } from "@/resources";
import { getSiteSettings } from "@/sanity/content";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  const { work } = await getSiteSettings();

  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: paths.work,
  });
}

export default async function Work() {
  const { work, person } = await getSiteSettings();

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={paths.work}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${paths.about}`,
          image: person.avatar,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
    </Column>
  );
}
