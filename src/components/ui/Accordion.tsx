"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: React.ReactNode };

/** Plain disclosure accordion. Each button controls one region; several can be open at once. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const id = useId();
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  return (
    <div className={cn("border-t border-forest/15", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.q} className="border-b border-forest/15">
            <h3 className="text-[1.125rem] font-medium">
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left text-forest hover:text-ink"
              >
                <span>{item.q}</span>
                <span aria-hidden className="mt-1 font-mono text-[14px] text-copper-ink">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} hidden={!isOpen} className="max-w-prose pb-6 text-forest/85">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
