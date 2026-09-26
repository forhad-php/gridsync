"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { stages } from "./event-stages";

/** Illustrative progress: stages before this index are complete; this one is pending. */
const CURRENT = 3;

/**
 * Interactive component 2 — event lifecycle timeline. A tablist of eight stages (arrow keys,
 * Home/End); the panel shows what the operator sees, what GridSync does and what is recorded.
 */
export function EventTimeline() {
  const [sel, setSel] = useState(CURRENT);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = sel;
    if (e.key in map) next = (sel + map[e.key] + stages.length) % stages.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = stages.length - 1;
    else return;
    e.preventDefault();
    setSel(next);
    tabs.current[next]?.focus();
  };

  const status = (i: number) => (i < CURRENT ? "complete" : i === CURRENT ? "pending" : "upcoming");
  const s = stages[sel];

  return (
    <div>
      <div role="tablist" aria-label="Event lifecycle stages" aria-orientation="horizontal" onKeyDown={onKey} className="relative grid border-t border-forest/20 lg:grid-cols-8">
        {stages.map((st, i) => {
          const active = i === sel;
          const state = status(i);
          return (
            <button
              key={st.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={active}
              aria-controls={`${id}-p`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSel(i)}
              className={cn(
                "group relative flex items-start gap-4 border-b border-forest/10 py-4 text-left transition-colors lg:flex-col lg:gap-3 lg:border-b-0 lg:px-3 lg:pb-5 lg:pt-6",
                active ? "bg-paper-white" : "hover:bg-paper-white/50",
              )}
            >
              <span aria-hidden className={cn("absolute inset-x-0 top-0 hidden h-[3px] lg:block", active ? "bg-copper" : "bg-transparent")} />
              <span aria-hidden className={cn("absolute inset-y-0 left-0 w-[3px] lg:hidden", active ? "bg-copper" : "bg-transparent")} />
              <span className="flex items-center gap-2 pl-3 lg:pl-0">
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex h-3 w-3 shrink-0 rounded-full border-[1.5px]",
                    state === "complete" && "border-moss-ink bg-moss-ink",
                    state === "pending" && "border-copper-ink bg-paper",
                    state === "upcoming" && "border-forest/40 bg-transparent",
                  )}
                />
                <span className="font-mono text-[12px] text-mineral-ink">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span className="flex-1">
                <span className={cn("block text-[15px] leading-snug", active ? "font-medium text-forest" : "text-forest/85")}>{st.name}</span>
                <span className="mt-1 block font-mono text-[11.5px] text-mineral-ink">
                  {st.when}
                  <span className="sr-only">, {state}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${id}-p`} role="tabpanel" aria-labelledby={`${id}-t${sel}`} tabIndex={0} className="border-y border-forest/15 bg-paper-white px-5 py-8 sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={sel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="h-sub">
                <span className="mr-3 font-mono text-[14px] text-copper-ink">{String(sel + 1).padStart(2, "0")}</span>
                {s.name}
              </h3>
              <p className="font-mono text-[12px] text-mineral-ink">
                {status(sel) === "complete" ? "● Complete" : status(sel) === "pending" ? "○ Pending operator review" : "— Not yet reached"} · {s.when}
              </p>
            </div>
            <dl className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                ["What the operator sees", s.sees],
                ["What GridSync does", s.does],
                ["What is recorded", s.recorded],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-forest/15 pt-4">
                  <dt className="label">{k}</dt>
                  <dd className="mt-2 text-[16px] leading-relaxed text-forest">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 font-mono text-[12px] text-mineral-ink">
        Use the arrow keys to move between stages. Status markers: ● complete, ○ pending, — not yet reached.
      </p>
    </div>
  );
}
