"use client";

import { useEffect, useRef, useState } from "react";
import type { SystemKey } from "@/content/systems";
import { cn } from "@/lib/cn";
import { BuildingSchematic } from "./BuildingSchematic";

export type Stage = {
  name: string;
  title: string;
  body: string[];
  active: SystemKey[];
  sources: string[];
  output: string;
};

/**
 * DGM-04 — five-stage narrative. On large screens a sticky schematic follows the stage nearest
 * the middle of the viewport. On small screens, and for reduced motion, each stage carries its
 * own static copy of the diagram instead (switched purely in CSS, so no hydration mismatch).
 */
export function StageNarrative({ stages }: { stages: Stage[] }) {
  const [current, setCurrent] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(Number((e.target as HTMLElement).dataset.stage));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const s = stages[current];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <ol className="lg:col-span-5">
        {stages.map((st, i) => (
          <li
            key={st.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-stage={i}
            className={cn(
              "border-t border-forest/15 py-12 transition-opacity duration-500 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-16",
              i === current ? "lg:opacity-100" : "lg:opacity-40 motion-reduce:lg:opacity-100",
            )}
          >
            <p className="kicker">
              <span className="num">0{i + 1}</span>
              {st.name}
            </p>
            <h3 className="h-sub mt-4">{st.title}</h3>
            <div className="mt-5 space-y-4 text-forest/90">
              {st.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2 text-[15px]">
              <dt className="label pt-0.5">Data used</dt>
              <dd>{st.sources.join(" · ")}</dd>
              <dt className="label pt-0.5">Output</dt>
              <dd>{st.output}</dd>
            </dl>
            {/* Static diagram: mobile, tablet and reduced motion */}
            <div className="drafting mt-8 border border-forest/15 bg-paper-white/40 p-2 lg:hidden motion-reduce:lg:block">
              <BuildingSchematic active={st.active} label={`${st.name}: systems involved are ${st.active.join(", ")}.`} />
            </div>
          </li>
        ))}
      </ol>

      {/* Sticky diagram: large screens with motion allowed */}
      <div className="hidden lg:col-span-7 lg:block motion-reduce:lg:hidden">
        <div className="sticky top-24 py-10">
          <ol className="flex gap-1" aria-label="Stages">
            {stages.map((st, i) => (
              <li
                key={st.name}
                aria-current={i === current ? "step" : undefined}
                className={cn(
                  "flex-1 border-t-2 pt-2 font-mono text-[11.5px] transition-colors",
                  i === current ? "border-copper text-copper-ink" : i < current ? "border-forest/50 text-mineral-ink" : "border-forest/15 text-mineral-ink",
                )}
              >
                0{i + 1} {st.name}
              </li>
            ))}
          </ol>
          <div className="drafting mt-6 border border-forest/15 bg-paper-white/40 p-4">
            <BuildingSchematic active={s.active} label={`Stage ${current + 1}, ${s.name}: highlighted systems are ${s.active.join(", ")}.`} />
          </div>
          <div className="mt-5 grid grid-cols-[7rem_1fr] gap-4 text-[15px]" aria-live="polite">
            <p className="label pt-0.5">Now reading</p>
            <p className="text-forest">{s.sources.join(" · ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
