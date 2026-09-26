/**
 * DGM-03 — battery versus building. Drawn for a dark (ink) surface.
 * Left: a battery holds power flat until its usable energy is spent.
 * Right: a building's response tapers as zones drift toward the comfort limit.
 */
const PAPER = "#F3F0E8";
const COPPER = "#D08A5E";
const SIGNAL = "#D9B84C";
const MONO = { fontFamily: "var(--font-mono), monospace", fontSize: 10.5 };

function Axes({ yLabel }: { yLabel: string }) {
  return (
    <>
      <path d="M40 20v150h240" fill="none" stroke={PAPER} strokeOpacity="0.4" />
      <text x="40" y="12" fill="#A7B0AA" {...MONO}>
        {yLabel}
      </text>
      <text x="280" y="188" textAnchor="end" fill="#A7B0AA" {...MONO}>
        time into event →
      </text>
    </>
  );
}

export function BatteryVsBuilding() {
  return (
    <div className="grid gap-10 sm:grid-cols-2">
      <figure>
        <svg viewBox="0 0 300 200" className="h-auto w-full" role="img" aria-label="Battery: power output stays flat until usable energy is exhausted, then drops to zero.">
          <Axes yLabel="kW delivered" />
          <path d="M40 60h150v110" fill="none" stroke={PAPER} strokeWidth="2" />
          <path d="M190 60v-14" stroke={PAPER} strokeOpacity="0.4" strokeDasharray="2 3" />
          <text x="186" y="42" textAnchor="end" fill={PAPER} {...MONO}>
            usable energy spent
          </text>
        </svg>
        <figcaption className="mt-4">
          <p className="font-medium text-paper">Battery</p>
          <p className="mt-1 text-[15px] text-mineral-light">Flat output, known limit, no one inside.</p>
        </figcaption>
      </figure>
      <figure>
        <svg viewBox="0 0 300 200" className="h-auto w-full" role="img" aria-label="Building: response starts high and tapers as zone temperature drifts toward the comfort limit; the operator steps out before the limit.">
          <Axes yLabel="kW reduced" />
          <path d="M40 60 C90 62 130 80 170 108 S230 150 240 158" fill="none" stroke={COPPER} strokeWidth="2" />
          <path d="M40 150 C90 140 150 100 240 58" fill="none" stroke={SIGNAL} strokeDasharray="4 3" />
          <path d="M40 52h240" stroke={SIGNAL} strokeOpacity="0.5" strokeDasharray="1 3" />
          <text x="46" y="46" fill={SIGNAL} {...MONO}>
            comfort limit
          </text>
          <text x="48" y="136" fill={SIGNAL} {...MONO}>
            zone temperature ↗
          </text>
          <path d="M222 52v118" stroke={PAPER} strokeOpacity="0.5" strokeDasharray="2 3" />
          <text x="218" y="164" textAnchor="end" fill={PAPER} {...MONO}>
            operator steps out
          </text>
          <text x="92" y="76" fill={COPPER} {...MONO}>
            response
          </text>
        </svg>
        <figcaption className="mt-4">
          <p className="font-medium text-paper">Building</p>
          <p className="mt-1 text-[15px] text-mineral-light">Response tapers as the space drifts; comfort and occupancy decide when to stop.</p>
        </figcaption>
      </figure>
    </div>
  );
}
