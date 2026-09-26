import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { AudioNote } from "@/components/media/AudioNote";
import { Disclaimer, Figure, PullQuote, SimpleTable, TechNote } from "@/components/field-notes/Prose";
import * as diagrams from "@/components/field-notes/diagrams";

/** Editorial styles for Field Notes. Body copy sits on a ~38rem measure. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (p) => <h2 className="mt-16 text-[1.75rem] font-medium leading-tight tracking-[-0.015em] text-forest sm:text-[2rem]" {...p} />,
    h3: (p) => <h3 className="mt-10 text-[1.25rem] font-medium text-forest" {...p} />,
    p: (p) => <p className="mt-5 text-[18px] leading-[1.7] text-forest/90 sm:text-[19px]" {...p} />,
    ul: (p) => <ul className="mt-5 space-y-2.5 pl-5 text-[18px] leading-[1.6] text-forest/90 marker:text-copper sm:text-[19px] [list-style:square]" {...p} />,
    ol: (p) => <ol className="mt-5 list-decimal space-y-2.5 pl-6 text-[18px] leading-[1.6] text-forest/90 marker:font-mono marker:text-[14px] marker:text-copper-ink sm:text-[19px]" {...p} />,
    li: (p) => <li className="pl-1" {...p} />,
    a: ({ href = "", ...p }) =>
      href.startsWith("/") ? <Link href={href} className="link" {...p} /> : <a href={href} className="link" rel="noopener noreferrer" {...p} />,
    blockquote: (p) => <blockquote className="my-8 border-l-2 border-forest/30 pl-5 font-serif text-[1.25rem] italic text-forest" {...p} />,
    hr: () => <hr className="my-14 border-forest/15" />,
    strong: (p) => <strong className="font-semibold text-forest" {...p} />,
    code: (p) => <code className="bg-stone/60 px-1 py-0.5 font-mono text-[0.85em]" {...p} />,
    table: (p) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-t border-forest/30 text-left text-[15.5px]" {...p} />
      </div>
    ),
    th: (p) => <th className="label border-b border-forest/20 py-2.5 pr-4 align-bottom font-normal" {...p} />,
    td: (p) => <td className="border-b border-forest/10 py-3 pr-4 align-top text-forest/90" {...p} />,
    PullQuote,
    TechNote,
    Figure,
    Disclaimer,
    SimpleTable,
    AudioNote: (props: { id: string }) => <AudioNote {...props} stacked className="my-10" />,
    ...diagrams,
    ...components,
  };
}
