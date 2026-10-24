import type { PortableTextBlock } from "next-sanity";
import { PortableTextBody } from "./PortableTextBody";
import styles from "./AboutStory.module.css";

type Block = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: string;
  children?: { text?: string }[];
};

const SENTENCE_END = /[.!?]+\s+(?=[A-ZÆØÅ0-9])/g;

function sentences(text: string) {
  const out: string[] = [];
  let start = 0;
  for (const match of text.matchAll(SENTENCE_END)) {
    const end = (match.index ?? 0) + match[0].length;
    out.push(text.slice(start, end).trim());
    start = end;
  }
  out.push(text.slice(start).trim());
  return out.filter(Boolean);
}

function pairs(items: string[]) {
  const out: string[] = [];
  for (let i = 0; i < items.length; i += 2) out.push(items.slice(i, i + 2).join(" "));
  return out;
}

// Breaks a wall of text into something you can scan without changing a word:
// a short opening line stands alone, each paragraph opens with its first
// sentence set large, and the rest follows two sentences at a time. Text with
// lists, headings or links keeps the regular rendering.
export function AboutStory({ body }: { body: PortableTextBlock[] }) {
  const blocks = body as Block[];
  const plain = blocks.every(
    (b) => b._type === "block" && (!b.style || b.style === "normal") && !b.listItem,
  );
  if (!plain) return <PortableTextBody value={body} />;

  const paragraphs = blocks
    .map((b) => ({ key: b._key ?? "", text: (b.children ?? []).map((c) => c.text ?? "").join("").trim() }))
    .filter((p) => p.text);

  return (
    <div className={styles.story}>
      {paragraphs.map(({ key, text }) => {
        const [first, ...rest] = sentences(text);
        if (rest.length === 0 && text.length <= 80) {
          return (
            <p key={key} className={`${styles.opening} reveal`}>
              {text}
            </p>
          );
        }
        return (
          <div key={key} className={`${styles.chunk} reveal`}>
            <p className={styles.statement}>{first}</p>
            {pairs(rest).map((part) => (
              <p key={part} className={styles.detail}>
                {part}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
