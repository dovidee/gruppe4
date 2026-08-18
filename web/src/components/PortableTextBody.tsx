import {
  CodeBlock,
  HeadingLink,
  InlineCode,
  List,
  ListItem,
  Media,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { slugify as transliterate } from "transliteration";

function slugify(text: string): string {
  const withAnd = text.replace(/&/g, " and ");
  return transliterate(withAnd, { lowercase: true, separator: "-" }).replace(/-{2,}/g, "-");
}

function plainText(children: unknown): string {
  if (Array.isArray(children)) {
    return children.map(plainText).join("");
  }
  if (
    children &&
    typeof children === "object" &&
    "props" in (children as { props?: { children?: unknown } })
  ) {
    return plainText((children as { props?: { children?: unknown } }).props?.children);
  }
  return typeof children === "string" ? children : "";
}

function createHeading(as: "h2" | "h3" | "h4") {
  const CustomHeading = ({ children }: { children?: React.ReactNode }) => (
    <HeadingLink marginTop="24" marginBottom="12" as={as} id={slugify(plainText(children))}>
      {children}
    </HeadingLink>
  );
  CustomHeading.displayName = as;
  return CustomHeading;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text
        style={{ lineHeight: "175%" }}
        variant="body-default-m"
        onBackground="neutral-medium"
        marginTop="8"
        marginBottom="12"
      >
        {children}
      </Text>
    ),
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
    blockquote: ({ children }) => (
      <Text
        as="blockquote"
        style={{ lineHeight: "175%" }}
        variant="body-default-m"
        onBackground="neutral-weak"
        marginTop="8"
        marginBottom="12"
      >
        {children}
      </Text>
    ),
  },
  list: {
    bullet: ({ children }) => <List as="ul">{children}</List>,
    number: ({ children }) => <List as="ol">{children}</List>,
  },
  listItem: {
    bullet: ({ children }) => (
      <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
        {children}
      </ListItem>
    ),
    number: ({ children }) => (
      <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
        {children}
      </ListItem>
    ),
  },
  marks: {
    code: ({ children }) => <InlineCode>{children}</InlineCode>,
    link: ({ children, value }) => {
      const href = (value?.href as string) ?? "#";
      if (href.startsWith("/")) {
        return <SmartLink href={href}>{children}</SmartLink>;
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => (
      <Media
        marginTop="8"
        marginBottom="16"
        enlarge
        radius="m"
        border="neutral-alpha-medium"
        sizes="(max-width: 960px) 100vw, 960px"
        alt={value?.alt ?? ""}
        src={value}
      />
    ),
    codeBlock: ({ value }) => (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: value?.code ?? "",
            language: value?.language ?? "text",
            label: value?.language
              ? value.language.charAt(0).toUpperCase() + value.language.slice(1)
              : "Text",
          },
        ]}
        copyButton
      />
    ),
  },
  hardBreak: () => <br />,
};

export function PortableTextBody({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value as never} components={components} />;
}

export function hasBody(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0;
}
