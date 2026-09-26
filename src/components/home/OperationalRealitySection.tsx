"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { DistributedDemandVisual } from "./DistributedDemandVisual";
import { cn } from "@/lib/cn";

export const fragments = [
  { source: "Operating schedules", lives: "Facility calendar, tenant agreements", owner: "Facilities team" },
  { source: "Interval meter data", lives: "Utility portal, submeter logger", owner: "Energy team" },
  { source: "BMS points and setpoints", lives: "BMS front-end", owner: "Controls contractor" },
  { source: "Tariffs and programme rules", lives: "Supply contract, programme documents", owner: "Procurement" },
  { source: "Occupancy", lives: "Room bookings, access logs, sensors", owner: "Workplace team" },
  { source: "Equipment limits", lives: "O&M manuals, maintenance log, experience", owner: "Maintenance engineers" },
];

export function OperationalRealitySection() {
  const [activeIdx, setActiveIdx] = useState<number | undefined>(undefined);

  return (
    <section className="py-24 sm:py-32">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <SectionIntro
            index="01"
            kicker="The operational reality"
            title="Most buildings already have flexible demand. It is spread across six places."
          >
            <p>
              The chiller could start earlier. The EV fleet does not need to charge at five. Level 3 is half empty on Fridays.
              Each of these is known to someone, in some system—rarely to the same person, and rarely before an event.
            </p>
          </SectionIntro>

          {/* High-quality realistic visual with scroll-based parallax and hotspot illumination */}
          <DistributedDemandVisual
            activeId={activeIdx}
            onSelectFragment={(i) => setActiveIdx(i)}
            className="w-full"
          />
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-14">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Where flexibility information typically lives in a commercial building, and who owns it.</caption>
            <thead>
              <tr className="border-b border-forest/30">
                <th scope="col" className="label pb-3 pr-4 font-normal">Information</th>
                <th scope="col" className="label pb-3 pr-4 font-normal">Where it lives</th>
                <th scope="col" className="label hidden pb-3 font-normal sm:table-cell">Who holds it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/10">
              {fragments.map((f, i) => {
                const isActive = activeIdx === i;
                return (
                  <tr
                    key={f.source}
                    onMouseEnter={() => setActiveIdx(i)}
                    onMouseLeave={() => setActiveIdx(undefined)}
                    onClick={() => setActiveIdx(i)}
                    className={cn(
                      "cursor-pointer transition-colors duration-200",
                      isActive ? "bg-forest/[0.04]" : "hover:bg-forest/[0.02]"
                    )}
                  >
                    <th scope="row" className="py-4 pr-4 align-top font-medium text-forest">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition-colors",
                            isActive ? "bg-copper-ink text-paper-white" : "border border-forest/25 text-mineral-ink"
                          )}
                        >
                          {i + 1}
                        </span>
                        {f.source}
                      </span>
                    </th>
                    <td className="py-4 pr-4 align-top text-forest/85">
                      {f.lives}
                      <span className="mt-1 block text-[14px] text-mineral-ink sm:hidden">{f.owner}</span>
                    </td>
                    <td className="hidden py-4 align-top text-mineral-ink sm:table-cell">{f.owner}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-6 font-serif text-[1.25rem] leading-snug text-forest">
            GridSync starts by putting these in one place, in the same terms, with the same limits attached.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
