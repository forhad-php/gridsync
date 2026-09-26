import { cn } from "@/lib/cn";

/**
 * Availability and operating-state tags. Every state has a distinct shape as well as a colour,
 * so meaning never depends on colour alone.
 */
export type Availability = "available" | "pilot" | "evaluating" | "planned";

const availability: Record<Availability, { label: string; shape: React.ReactNode; className: string }> = {
  available: {
    label: "Available now",
    shape: <span className="h-2 w-2 rounded-full bg-moss-ink" />,
    className: "border-moss/50 text-moss-ink",
  },
  pilot: {
    label: "Available in pilot",
    shape: <span className="h-2 w-2 rounded-full border-[1.5px] border-moss-ink" />,
    className: "border-moss/50 text-moss-ink",
  },
  evaluating: {
    label: "Under evaluation",
    shape: <span className="h-2 w-2 rotate-45 border-[1.5px] border-signal-ink" />,
    className: "border-signal/60 text-signal-ink",
  },
  planned: {
    label: "Planned",
    shape: <span className="h-px w-2.5 bg-mineral-ink" />,
    className: "border-forest/20 text-mineral-ink",
  },
};

export function AvailabilityTag({ status, className }: { status: Availability; className?: string }) {
  const a = availability[status];
  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap rounded-[2px] border px-2 py-0.5 font-mono text-[11.5px]", a.className, className)}>
      <span className="inline-flex h-2.5 w-2.5 items-center justify-center" aria-hidden>
        {a.shape}
      </span>
      {a.label}
    </span>
  );
}

export type OpState = "ok" | "watch" | "constrained" | "pending" | "excluded";

const op: Record<OpState, { glyph: string; className: string }> = {
  ok: { glyph: "●", className: "text-moss-ink" },
  watch: { glyph: "◐", className: "text-signal-ink" },
  constrained: { glyph: "▲", className: "text-signal-ink" },
  pending: { glyph: "○", className: "text-copper-ink" },
  excluded: { glyph: "—", className: "text-mineral-ink" },
};

/** Inline operating state: glyph + text, for diagrams and technical panels on paper. */
export function OpStatus({ state, children, className }: { state: OpState; children: React.ReactNode; className?: string }) {
  const o = op[state];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-[12px]", o.className, className)}>
      <span aria-hidden className="text-[10px] leading-none">
        {o.glyph}
      </span>
      {children}
    </span>
  );
}

/** Marks example data. Required wherever numbers, sites or events are shown. */
export function IllustrativeNote({ children = "Illustrative example — not live data.", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 font-mono text-[12px] text-mineral-ink", className)}>
      <span aria-hidden className="inline-block h-[7px] w-[7px] border border-current" />
      {children}
    </p>
  );
}

/** Visible marker for content that must be replaced with verified material before launch. */
export function ReplaceMarker({ children = "Replace with verified evidence", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 border border-dashed border-copper px-2 py-0.5 font-mono text-[11.5px] text-copper-ink", className)}>
      <span aria-hidden>[ ]</span>
      {children}
    </span>
  );
}
