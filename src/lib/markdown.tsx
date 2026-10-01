import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small Markdown renderer, sized for exactly the constructs the real posts use.
 *
 * The posts (see src/data/posts.ts, generated from the live Supabase `posts`
 * table) use: `##`/`###` headings, `-` bullets, `1.` ordered lists, `**bold**`,
 * `*italic*`, `` `inline code` ``, ``` fenced code blocks ```, one `>` quote and
 * a small `|` table. No links or images.
 *
 * A full CommonMark implementation (react-markdown + remark-gfm) would add
 * ~50 kB gzipped for a set of features the content does not use. This is ~120
 * lines, has no dependencies, and its output is verified against all four real
 * posts by the route test.
 *
 * Fenced code is extracted before any inline pass runs, so markdown characters
 * inside a code block are never interpreted.
 */

type Block =
  | { kind: "heading"; level: number; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "code"; lang: string; code: string }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "p"; text: string };

const splitRow = (line: string): string[] =>
  line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const isSeparatorRow = (cells: string[]): boolean =>
  cells.length > 0 && cells.every((cell) => /^:?-{2,}:?$/.test(cell));

const startsBlock = (line: string): boolean =>
  !line ||
  line.startsWith("|") ||
  line.startsWith("> ") ||
  line.startsWith("```") ||
  /^#{2,6}\s/.test(line) ||
  /^[-*]\s+/.test(line) ||
  /^\d+\.\s+/.test(line);

function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Fenced code
    const fence = trimmed.match(/^```(\w*)/);
    if (fence) {
      const lang = fence[1] ?? "";
      const body: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1; // consume the closing fence
      blocks.push({ kind: "code", lang, code: body.join("\n") });
      continue;
    }

    // Heading (## and deeper)
    const heading = trimmed.match(/^(#{2,6})\s+(.*)$/);
    if (heading) {
      blocks.push({ kind: "heading", level: heading[1].length, text: heading[2] });
      i += 1;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        body.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push({ kind: "quote", text: body.join(" ") });
      continue;
    }

    // Table
    if (trimmed.startsWith("|")) {
      const raw: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        raw.push(splitRow(lines[i].trim()));
        i += 1;
      }
      const [head = [], ...rest] = raw;
      blocks.push({
        kind: "table",
        head,
        rows: rest.filter((cells) => !isSeparatorRow(cells)),
      });
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    // Paragraph: consecutive non-blank lines that don't start another block
    const para: string[] = [trimmed];
    i += 1;
    while (i < lines.length && !startsBlock(lines[i].trim())) {
      para.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ kind: "p", text: para.join(" ") });
  }

  return blocks;
}

/** Bold, inline code and italic, in that precedence order. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  const out: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) out.push(text.slice(cursor, match.index));

    const token = match[0];
    const key = `${keyPrefix}-${index++}`;

    if (token.startsWith("**")) {
      out.push(
        <strong key={key} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`")) {
      out.push(
        <code
          key={key}
          className="rounded border border-line bg-panel px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      out.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

const HEADING_CLASS: Record<number, string> = {
  2: "mt-12 mb-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl",
  3: "mt-9 mb-3 font-display text-xl font-semibold tracking-tight",
  4: "mt-7 mb-2 font-display text-lg font-semibold",
};

export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks = parseMarkdown(content);

  return (
    <div className={cn("text-muted-foreground", className)}>
      {blocks.map((block, index) => {
        const key = `b${index}`;

        switch (block.kind) {
          case "heading": {
            const Tag = `h${Math.min(block.level, 4)}` as "h2" | "h3" | "h4";
            return (
              <Tag key={key} className={HEADING_CLASS[block.level] ?? HEADING_CLASS[3]}>
                {renderInline(block.text, key)}
              </Tag>
            );
          }

          case "ul":
            return (
              <ul key={key} className="my-5 space-y-2.5 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{renderInline(item, `${key}-${itemIndex}`)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key} className="my-5 space-y-2.5 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={`${key}-${itemIndex}`} className="flex gap-3 leading-relaxed">
                    <span className="font-mono text-xs text-primary tnum">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span>{renderInline(item, `${key}-${itemIndex}`)}</span>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={key}
                className="my-6 border-l-2 border-primary pl-5 font-display text-lg italic leading-relaxed text-foreground"
              >
                {renderInline(block.text, key)}
              </blockquote>
            );

          case "code":
            return (
              <div key={key} className="my-6 overflow-hidden rounded-lg border border-line">
                {block.lang && (
                  <p className="label-mono border-b border-line bg-panel px-4 py-2">
                    {block.lang}
                  </p>
                )}
                <pre className="overflow-x-auto bg-panel p-4">
                  <code className="font-mono text-[0.82rem] leading-relaxed text-foreground">
                    {block.code}
                  </code>
                </pre>
              </div>
            );

          case "table":
            return (
              <div key={key} className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {block.head.map((cell, cellIndex) => (
                        <th
                          key={`${key}-h${cellIndex}`}
                          scope="col"
                          className="label-mono border-b border-line px-3 py-2 text-left"
                        >
                          {renderInline(cell, `${key}-h${cellIndex}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-r${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${key}-r${rowIndex}-${cellIndex}`}
                            className="border-b border-line px-3 py-2 align-top"
                          >
                            {renderInline(cell, `${key}-r${rowIndex}-${cellIndex}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "p":
          default:
            return (
              <p key={key} className="my-5 leading-relaxed">
                {renderInline((block as { text: string }).text, key)}
              </p>
            );
        }
      })}
    </div>
  );
}

export default Markdown;
