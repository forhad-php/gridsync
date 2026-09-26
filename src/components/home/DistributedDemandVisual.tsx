"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export type FlexibilityFragment = {
  num: string;
  source: string;
  lives: string;
  owner: string;
  asset: string;
  action: string;
  x: number; // percentage from left
  y: number; // percentage from top
};

export const flexibilityFragments: FlexibilityFragment[] = [
  {
    num: "01",
    source: "Operating schedules",
    lives: "Facility calendar, tenant agreements",
    owner: "Facilities team",
    asset: "Central Plant Sequencing",
    action: "Pre-cool staging 45m early; chiller start times aligned with ramp rates",
    x: 24,
    y: 68,
  },
  {
    num: "02",
    source: "Interval meter data",
    lives: "Utility portal, submeter logger",
    owner: "Energy team",
    asset: "Main Utility Feed & Submeter Logger",
    action: "15-minute interval logging for baseline verification and kW cap tracking",
    x: 18,
    y: 42,
  },
  {
    num: "03",
    source: "BMS points and setpoints",
    lives: "BMS front-end, controller panel",
    owner: "Controls contractor",
    asset: "DDC Central Control Panel",
    action: "Supply water temp reset (+1.5 °C) and secondary pump speed modulation",
    x: 23,
    y: 84,
  },
  {
    num: "04",
    source: "Tariffs and programme rules",
    lives: "Supply contract, programme documents",
    owner: "Procurement",
    asset: "Grid Interconnection & Tariff Rules",
    action: "Automatic response to 16:00–18:00 critical peak tariff dispatch signals",
    x: 78,
    y: 22,
  },
  {
    num: "05",
    source: "Occupancy",
    lives: "Room bookings, access logs, sensors",
    owner: "Workplace team",
    asset: "Zone Air Handling & VAV Risers",
    action: "Modulate half-empty zones (e.g., Level 3 Friday afternoon) while protecting core spaces",
    x: 52,
    y: 28,
  },
  {
    num: "06",
    source: "Equipment limits",
    lives: "O&M manuals, maintenance log, experience",
    owner: "Maintenance engineers",
    asset: "Centrifugal Chillers & Compressors",
    action: "Enforce manufacturer delta-T minimums and motor start-stop cycles to prevent damage",
    x: 72,
    y: 62,
  },
];

type Props = {
  className?: string;
  activeId?: number;
  onSelectFragment?: (index: number) => void;
};

/**
 * High-quality, realistic visual for Section 01:
 * "Most buildings already have flexible demand. It is spread across six places."
 *
 * Visually communicates distributed physical infrastructure across central chiller plant,
 * BMS controllers, interval metering, and distribution risers. Features smooth scroll-driven
 * parallax depth and sequential hotspot illumination matching the six operational fragments.
 */
export function DistributedDemandVisual({ className, activeId, onSelectFragment }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transform: gentle vertical settling
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-16, 16]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.985, 1, 0.99]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.75, 1]);

  // Local active state
  const [internalActive, setInternalActive] = useState<number>(0);
  const [hasManualSelection, setHasManualSelection] = useState(false);

  const activeIndex = activeId !== undefined ? activeId : internalActive;
  const current = flexibilityFragments[activeIndex] ?? flexibilityFragments[0];

  // Scroll-based progressive hotspot activation
  useEffect(() => {
    if (reduceMotion || hasManualSelection || activeId !== undefined) return;

    return scrollYProgress.on("change", (v) => {
      // Map scroll progress in the active reading range (0.2 to 0.75) to 6 items
      if (v < 0.22) {
        setInternalActive(0);
      } else if (v > 0.72) {
        setInternalActive(5);
      } else {
        const step = Math.min(5, Math.max(0, Math.floor(((v - 0.22) / 0.5) * 6)));
        setInternalActive(step);
      }
    });
  }, [scrollYProgress, reduceMotion, hasManualSelection, activeId]);

  const selectItem = (index: number) => {
    setHasManualSelection(true);
    setInternalActive(index);
    onSelectFragment?.(index);
  };

  return (
    <div ref={containerRef} className={cn("relative flex flex-col", className)}>
      <motion.figure
        style={{ y, scale, opacity }}
        className="relative overflow-hidden border border-forest/20 bg-paper-white shadow-sm"
      >
        {/* Header telemetry strip */}
        <div className="flex items-center justify-between border-b border-forest/15 bg-paper-white/95 px-3.5 py-2 font-mono text-[11.5px]">
          <div className="flex items-center gap-2 text-forest">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-copper-ink" />
            <span className="font-medium tracking-wide">FIG-01 · DISTRIBUTED DEMAND ASSETS</span>
          </div>
          <span className="text-mineral-ink">6 places mapped</span>
        </div>

        {/* Visual Frame */}
        <div className="relative aspect-[16/10] overflow-hidden bg-stone">
          {/* Subtle drafting grid */}
          <div className="drafting pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden />

          {/* Realistic, high-resolution photography of commercial central cooling and BMS plant */}
          <Image
            src="/images/distributed-plant.jpg"
            alt="Commercial building central chiller plant, showing industrial chillers, centrifugal pumps, insulated chilled-water piping loops, and BMS digital control panel"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            priority
          />

          {/* Coordinate system overlay lines */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" aria-hidden>
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#24332E" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#24332E" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#24332E" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#24332E" strokeWidth="0.5" strokeDasharray="3 3" />
          </svg>

          {/* Interactive hotspot pins for each of the six places */}
          {flexibilityFragments.map((f, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={f.num}
                type="button"
                onClick={() => selectItem(i)}
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
                className={cn(
                  "group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper",
                  isActive ? "z-20 scale-110" : "z-10 hover:scale-105 opacity-85 hover:opacity-100"
                )}
                aria-label={`Inspect place ${f.num}: ${f.source} (${f.asset})`}
                aria-pressed={isActive}
              >
                {/* Active pulse ring */}
                {isActive && !reduceMotion && (
                  <span
                    aria-hidden
                    className="absolute -inset-2 animate-ping rounded-full border border-copper bg-copper/20 opacity-75"
                  />
                )}

                {/* Hotspot badge */}
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-medium shadow-md transition-colors",
                    isActive
                      ? "border-2 border-paper-white bg-copper-ink text-paper-white ring-2 ring-copper"
                      : "border border-forest/30 bg-paper-white/95 text-forest hover:bg-paper-white"
                  )}
                >
                  {f.num}
                </span>

                {/* Micro indicator label on hover or when active */}
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-[2px] border px-2 py-0.5 font-mono text-[10.5px] shadow-sm backdrop-blur-sm transition-opacity duration-200",
                    isActive
                      ? "border-copper-ink bg-ink text-paper opacity-100"
                      : "hidden border-forest/20 bg-paper-white/90 text-forest group-hover:block"
                  )}
                >
                  {f.source}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Telemetry Drawer: explains the active flexibility location */}
        <div className="border-t border-forest/15 bg-paper-white/95 p-3.5 sm:p-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.num}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="space-y-1.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-forest/10 pb-1.5">
                <span className="font-mono text-[11.5px] font-medium text-copper-ink">
                  Place {current.num} · {current.source}
                </span>
                <span className="font-mono text-[11px] text-mineral-ink">{current.asset}</span>
              </div>
              <div className="grid gap-x-4 gap-y-1 text-[13px] sm:grid-cols-[5.5rem_1fr]">
                <span className="font-mono text-[11.5px] text-mineral-ink">Where it lives:</span>
                <span className="text-forest/90">{current.lives}</span>
                <span className="font-mono text-[11.5px] text-mineral-ink">Who holds it:</span>
                <span className="text-forest/90">{current.owner}</span>
                <span className="font-mono text-[11.5px] text-mineral-ink">Flexibility role:</span>
                <span className="font-medium text-forest">{current.action}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick tab switcher for all 6 places */}
          <div role="tablist" aria-label="Flexible demand places" className="mt-3 flex items-center justify-between border-t border-forest/10 pt-2.5">
            <span className="font-mono text-[10.5px] text-mineral-ink">Select system:</span>
            <div className="flex gap-1">
              {flexibilityFragments.map((f, i) => (
                <button
                  key={f.num}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  onClick={() => selectItem(i)}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-[2px] font-mono text-[11px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-copper",
                    i === activeIndex
                      ? "bg-copper-ink text-paper-white"
                      : "border border-forest/20 text-mineral-ink hover:border-forest/50 hover:text-forest"
                  )}
                >
                  {f.num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.figure>

      <p className="mt-2.5 font-mono text-[11.5px] text-mineral-ink">
        FIG-01 · Realistic commercial facility infrastructure. Scroll or select a place to see how physical equipment relates to operating fragments.
      </p>
    </div>
  );
}
