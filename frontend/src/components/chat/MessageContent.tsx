import type { ReactNode } from "react";

function inlineMarkdown(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*]+\*|_[^_]+_)/g).filter(Boolean);
  return tokens.map((token, index) => {
    if ((token.startsWith("**") && token.endsWith("**")) || (token.startsWith("__") && token.endsWith("__"))) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if ((token.startsWith("*") && token.endsWith("*")) || (token.startsWith("_") && token.endsWith("_"))) return <em key={index}>{token.slice(1, -1)}</em>;
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index} className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">{token.slice(1, -1)}</code>;
    return <span key={index}>{token}</span>;
  });
}

export default function MessageContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  const flushParagraph = () => { if (paragraph.length) { blocks.push(<p key={`paragraph-${blocks.length}`}>{paragraph.join(" ").trim()}</p>); paragraph = []; } };
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  const flushList = () => { if (!list) return; const List = list.type; blocks.push(<List key={`list-${blocks.length}`} className="my-2 space-y-1.5 pl-5">{list.items.map((item, index) => <li key={index}>{inlineMarkdown(item)}</li>)}</List>); list = null; };
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); flushList(); return; }
    const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
    const bullet = trimmed.match(/^[-*•]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (heading) { flushParagraph(); flushList(); blocks.push(<h3 key={`heading-${blocks.length}`} className="mt-3 font-bold text-slate-900 first:mt-0">{inlineMarkdown(heading[1])}</h3>); return; }
    if (bullet || numbered) { flushParagraph(); const type = bullet ? "ul" : "ol"; if (!list || list.type !== type) { flushList(); list = { type, items: [] }; } list.items.push((bullet || numbered)?.[1] || ""); return; }
    flushList(); paragraph.push(trimmed);
  });
  flushParagraph(); flushList();
  return <div className="space-y-2">{blocks}</div>;
}
