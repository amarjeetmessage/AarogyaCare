import type { ReactNode } from "react";

function inlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let plain = "";
  let index = 0;
  const pushPlain = () => {
    if (plain) {
      nodes.push(<span key={nodes.length}>{plain}</span>);
      plain = "";
    }
  };
  while (index < text.length) {
    const marker = text.slice(index, index + 2);
    const single = text[index];
    const isStrong = marker === "**" || marker === "__";
    const isCode = single === "`";
    const isEmphasis = single === "*" || single === "_";
    if (isStrong || isCode || isEmphasis) {
      const close = isStrong
        ? text.indexOf(marker, index + 2)
        : text.indexOf(single, index + 1);
      if (close > index + (isStrong ? 2 : 1)) {
        pushPlain();
        const value = text.slice(index + (isStrong ? 2 : 1), close);
        if (isStrong) nodes.push(<strong key={nodes.length}>{value}</strong>);
        else if (isCode)
          nodes.push(
            <code
              key={nodes.length}
              className="rounded bg-slate-200 px-1.5 py-0.5 text-xs"
            >
              {value}
            </code>,
          );
        else nodes.push(<em key={nodes.length}>{value}</em>);
        index = close + (isStrong ? 2 : 1);
        continue;
      }
      if (isStrong) {
        index += 2;
        continue;
      }
    }
    plain += text[index];
    index += 1;
  }
  pushPlain();
  return nodes;
}

function tableCells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}
function isTableSeparator(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

export default function MessageContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let code: string[] | null = null;
  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={`paragraph-${blocks.length}`}>{paragraph.join(" ").trim()}</p>,
      );
      paragraph = [];
    }
  };
  const flushList = () => {
    if (!list) return;
    const List = list.type;
    blocks.push(
      <List
        key={`list-${blocks.length}`}
        className="my-2 list-outside space-y-1.5 pl-5"
      >
        {list.items.map((item, index) => (
          <li key={index}>{inlineMarkdown(item)}</li>
        ))}
      </List>,
    );
    list = null;
  };
  const flushCode = () => {
    if (code) {
      blocks.push(
        <pre
          key={`code-${blocks.length}`}
          className="my-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100"
        >
          <code>{code.join("\n")}</code>
        </pre>,
      );
      code = null;
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushCode();
  };

  for (let index = 0; index < lines.length; index += 1) {
    const original = lines[index];
    const trimmed = original.trim();
    if (trimmed.startsWith("```")) {
      flushParagraph();
      flushList();
      if (code) flushCode();
      else code = [];
      continue;
    }
    if (code) {
      code.push(original);
      continue;
    }
    if (!trimmed) {
      flushAll();
      continue;
    }
    if (/^([-*_])\s*\1\s*\1(?:\s*\1)*$/.test(trimmed)) {
      flushAll();
      blocks.push(
        <hr key={`hr-${blocks.length}`} className="my-4 border-slate-300" />,
      );
      continue;
    }
    if (
      trimmed.includes("|") &&
      index + 1 < lines.length &&
      isTableSeparator(lines[index + 1])
    ) {
      flushAll();
      const headers = tableCells(trimmed);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().includes("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      index -= 1;
      blocks.push(
        <div key={`table-${blocks.length}`} className="my-3 overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-left text-xs">
            <thead>
              <tr>
                {headers.map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    className="border-b border-slate-300 px-2 py-2 font-bold text-slate-900"
                  >
                    {inlineMarkdown(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((_, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border-b border-slate-200 px-2 py-2 align-top"
                    >
                      {inlineMarkdown(row[cellIndex] || "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    const bullet = trimmed.match(/^[-*•+]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    const quote = trimmed.match(/^>\s?(.*)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const className =
        level === 1
          ? "mt-4 text-lg font-bold text-slate-900"
          : level === 2
            ? "mt-3 text-base font-bold text-slate-900"
            : "mt-3 font-bold text-slate-900";
      blocks.push(
        <h3 key={`heading-${blocks.length}`} className={className}>
          {inlineMarkdown(heading[2])}
        </h3>,
      );
      continue;
    }
    if (quote) {
      flushAll();
      blocks.push(
        <blockquote
          key={`quote-${blocks.length}`}
          className="my-2 border-l-4 border-teal-300 pl-3 italic text-slate-600"
        >
          {inlineMarkdown(quote[1])}
        </blockquote>,
      );
      continue;
    }
    if (bullet || numbered) {
      flushParagraph();
      const type = bullet ? "ul" : "ol";
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((bullet || numbered)?.[1] || "");
      continue;
    }
    if (list && /^\s{2,}\S/.test(original)) {
      list.items[list.items.length - 1] += ` ${trimmed}`;
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushAll();
  return <div className="space-y-2">{blocks}</div>;
}
