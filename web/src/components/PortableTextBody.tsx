import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { imageUrl } from "@/sanity/image";
import styles from "./PortableTextBody.module.css";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value?.href as string) ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    },
    code: ({ children }) => <code className={styles.code}>{children}</code>,
  },
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, 1200);
      if (!src) return null;
      return (
        <span className={styles.image}>
          <Image src={src} alt={value?.alt ?? ""} width={1200} height={800} sizes="(max-width: 960px) 100vw, 960px" />
        </span>
      );
    },
    codeBlock: ({ value }) => (
      <pre className={styles.codeBlock}>
        <code>{value?.code ?? ""}</code>
      </pre>
    ),
  },
};

export function PortableTextBody({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <div className={`prose ${styles.prose}`}>
      <PortableText value={value as never} components={components} />
    </div>
  );
}

export function hasBody(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0;
}
