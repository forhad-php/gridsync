import { cn } from "@/lib/cn";

/** Pull quote set in the editorial serif, offset with a copper rule. */
export function PullQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <figure className="my-12 border-l-2 border-copper pl-6 sm:-ml-8 sm:pl-8">
      <blockquote className="font-serif text-[1.6rem] leading-[1.3] tracking-[-0.01em] text-forest sm:text-[1.9rem]">{children}</blockquote>
      {cite && <figcaption className="label mt-4">{cite}</figcaption>}
    </figure>
  );
}

/** Technical aside: bordered, mono label, for definitions, method notes and practical checks. */
export function TechNote({ title = "Technical note", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="my-10 border border-forest/20 bg-paper-white/70 px-5 py-5 text-[16px] leading-relaxed text-forest sm:px-6">
      <p className="label mb-3 flex items-center gap-2">
        <span aria-hidden className="inline-block h-[7px] w-[7px] bg-copper" />
        {title}
      </p>
      <div className="space-y-3 [&_li]:ml-4 [&_li]:list-disc [&_ul]:space-y-1.5">{children}</div>
    </aside>
  );
}

/** Wraps a diagram or media item with an optional reference id and caption. */
export function Figure({ children, caption, id, wide }: { children: React.ReactNode; caption?: React.ReactNode; id?: string; wide?: boolean }) {
  return (
    <figure className={cn("my-12", wide && "lg:-mr-40")}>
      <div className="drafting overflow-x-auto border border-forest/15 bg-paper-white/40 p-4 sm:p-6">
        {/* Diagrams keep a readable minimum width on small screens and scroll sideways instead. */}
        <div className="min-w-[34rem] sm:min-w-0">{children}</div>
      </div>
      {(caption || id) && (
        <figcaption className="mt-3 flex flex-wrap gap-x-3 text-[14px] leading-snug text-mineral-ink">
          {id && <span className="font-mono text-[12px]">{id}</span>}
          {caption && <span>{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** Content disclaimer for examples and numbers. */
export function Disclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <p className="my-10 flex gap-3 border-t border-forest/15 pt-4 font-mono text-[12.5px] leading-relaxed text-mineral-ink">
      <span aria-hidden className="mt-[5px] inline-block h-[7px] w-[7px] shrink-0 border border-current" />
      <span>
        {children ??
          "Illustrative example. Figures in this note describe a typical situation to explain the method; they are not measured results from a GridSync site."}
      </span>
    </p>
  );
}

/** Plain data table for MDX (GFM tables are not enabled). First column is a row header. */
export function SimpleTable({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  return (
    <div className="my-10 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-t border-forest/30 text-left text-[15px]">
        <caption className="mb-3 text-left text-[14px] text-mineral-ink">{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="label border-b border-forest/20 py-2.5 pr-4 align-bottom font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-b border-forest/10">
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={c} scope="row" className="py-3 pr-4 align-top font-medium text-forest">
                    {c}
                  </th>
                ) : (
                  <td key={c} className="py-3 pr-4 align-top text-forest/85">
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
