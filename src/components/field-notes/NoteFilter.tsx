"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, formatDate, type BuildingType, type Category, type FieldNote } from "@/content/field-notes";
import { useCases } from "@/content/use-cases";
import { cn } from "@/lib/cn";

const buildingTypes: BuildingType[] = ["Office", "Retail", "Logistics", "Cold storage", "Campus", "Hotel", "Hospital", "EV depot", "Mixed-use"];

type Props = {
  notes: FieldNote[];
  /** Server-rendered thumbnails keyed by slug, so media placeholders stay server components. */
  thumbs: Record<string, React.ReactNode>;
};

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  counts,
}: {
  label: string;
  options: T[];
  value: T | null;
  onChange: (v: T | null) => void;
  counts: Record<string, number>;
}) {
  return (
    <div role="group" aria-label={label}>
      <p className="label">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={value === null}
          onClick={() => onChange(null)}
          className={cn(
            "rounded-[2px] border px-3 py-1.5 text-[14px] transition-colors",
            value === null ? "border-forest bg-forest text-paper" : "border-forest/25 text-forest hover:border-forest",
          )}
        >
          All
        </button>
        {options.map((o) => {
          const n = counts[o] ?? 0;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={value === o}
              disabled={n === 0}
              onClick={() => onChange(value === o ? null : o)}
              className={cn(
                "rounded-[2px] border px-3 py-1.5 text-[14px] transition-colors disabled:cursor-not-allowed disabled:opacity-35",
                value === o ? "border-forest bg-forest text-paper" : "border-forest/25 text-forest hover:border-forest",
              )}
            >
              {o}
              <span className={cn("ml-2 font-mono text-[11px]", value === o ? "text-stone" : "text-mineral-ink")}>{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Interactive component 6 — filter Field Notes by category and building type. */
export function NoteFilter({ notes, thumbs }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [type, setType] = useState<BuildingType | null>(null);

  const shown = useMemo(
    () => notes.filter((n) => (!category || n.category === category) && (!type || n.buildingTypes.includes(type))),
    [notes, category, type],
  );

  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = {};
    notes.filter((n) => !type || n.buildingTypes.includes(type)).forEach((n) => (c[n.category] = (c[n.category] ?? 0) + 1));
    return c;
  }, [notes, type]);

  const typeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    notes.filter((n) => !category || n.category === category).forEach((n) => n.buildingTypes.forEach((t) => (c[t] = (c[t] ?? 0) + 1)));
    return c;
  }, [notes, category]);

  const related = type ? useCases.filter((u) => u.buildingTypes.includes(type)) : [];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="space-y-8 lg:col-span-4">
        <FilterGroup label="Building type" options={buildingTypes} value={type} onChange={setType} counts={typeCounts} />
        <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} counts={categoryCounts} />

        {related.length > 0 && (
          <div className="border-t border-forest/15 pt-6">
            <p className="label">Related use cases · {type}</p>
            <ul className="mt-3 space-y-2">
              {related.map((u) => (
                <li key={u.slug}>
                  <Link href={`/use-cases#${u.slug}`} className="link text-[15px]">
                    {u.title}
                  </Link>
                  <p className="text-[14px] text-mineral-ink">{u.narrative}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="lg:col-span-8">
        <div className="flex items-baseline justify-between border-b border-forest/30 pb-3">
          <p aria-live="polite" className="font-mono text-[12.5px] text-mineral-ink">
            {shown.length} {shown.length === 1 ? "note" : "notes"}
            {type && ` · ${type}`}
            {category && ` · ${category}`}
          </p>
          {(type || category) && (
            <button
              type="button"
              className="text-[14px] text-copper-ink underline decoration-copper/40 underline-offset-4 hover:decoration-copper-ink"
              onClick={() => {
                setType(null);
                setCategory(null);
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {shown.length === 0 ? (
          <p className="py-12 text-forest/80">No notes match this combination yet.</p>
        ) : (
          <ul className="divide-y divide-forest/15">
            {shown.map((n) => (
              <li key={n.slug} className="group grid gap-5 py-8 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <div className="hidden sm:block">{thumbs[n.slug]}</div>
                <article>
                  <p className="label">
                    {n.category} · {formatDate(n.date)} · {n.readingTime}
                  </p>
                  <h3 className="mt-2 text-[1.45rem] font-medium leading-snug text-forest">
                    <Link href={`/field-notes/${n.slug}`} className="decoration-copper/50 underline-offset-[6px] group-hover:underline">
                      {n.title}
                    </Link>
                  </h3>
                  <p className="mt-2 font-serif text-[1.1rem] leading-snug text-forest/85">{n.dek}</p>
                  <p className="mt-3 font-mono text-[11.5px] text-mineral-ink">{n.buildingTypes.join(" · ")}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
