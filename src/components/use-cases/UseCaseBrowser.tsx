"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Item = { slug: string; title: string; types: string[]; node: React.ReactNode };

/**
 * Building-type filter + sticky in-page index for the use-case sections.
 * Sections are rendered on the server and passed in; the filter only toggles visibility.
 */
export function UseCaseBrowser({ items, types }: { items: Item[]; types: string[] }) {
  const [type, setType] = useState<string | null>(null);
  const matches = (i: Item) => !type || i.types.includes(type);
  const shown = items.filter(matches);

  return (
    <>
      <div className="border-b border-forest/15">
        <div className="container py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:gap-8">
            <p id="bt-filter" className="label shrink-0">
              Filter by building type
            </p>
            <div role="group" aria-labelledby="bt-filter" className="flex flex-wrap gap-2">
              {[null, ...types].map((t) => {
                const active = type === t;
                return (
                  <button
                    key={t ?? "all"}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setType(t)}
                    className={cn(
                      "rounded-[2px] border px-3 py-1.5 text-[14px] transition-colors",
                      active ? "border-forest bg-forest text-paper" : "border-forest/25 text-forest hover:border-forest",
                    )}
                  >
                    {t ?? "All buildings"}
                  </button>
                );
              })}
            </div>
          </div>
          <p aria-live="polite" className="mt-4 font-mono text-[12px] text-mineral-ink">
            {type ? `${shown.length} of ${items.length} use cases include ${type.toLowerCase()} buildings.` : `Showing all ${items.length} use cases.`}
          </p>
        </div>
      </div>

      <div className="container grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <nav aria-label="Use cases on this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="label">On this page</p>
            <ol className="mt-4 border-t border-forest/15">
              {items.map((i, n) => {
                const on = matches(i);
                return (
                  <li key={i.slug} className="border-b border-forest/10">
                    {on ? (
                      <a href={`#${i.slug}`} className="flex gap-3 py-3 text-[15px] text-forest hover:text-copper-ink">
                        <span className="font-mono text-[12px] text-copper-ink">0{n + 1}</span>
                        {i.title}
                      </a>
                    ) : (
                      <span className="flex gap-3 py-3 text-[15px] text-mineral-ink line-through decoration-forest/30">
                        <span className="font-mono text-[12px]">0{n + 1}</span>
                        {i.title}
                        <span className="sr-only"> (hidden by filter)</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-9">
          {items.map((i) => (
            <div key={i.slug} hidden={!matches(i)}>
              {i.node}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
