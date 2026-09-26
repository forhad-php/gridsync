import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { AvailabilityTag, ReplaceMarker } from "@/components/ui/Status";
import { MediaFrame } from "@/components/media/MediaFrame";
import { IntegrationMap } from "@/components/diagrams/IntegrationMap";

export const metadata = pageMetadata({
  title: "Data & integrations — Connect the data that explains the building",
  description:
    "What GridSync reads from building-management systems, meters, chargers, schedules, weather and grid signals; how it processes them; what it writes back; and the principles that govern control.",
  path: "/integrations",
});

const principles = [
  ["Read before write", "Every site starts read-only. Control is added only after operators have seen several forecast cycles and agreed which points may be written."],
  ["Permissioned control", "Write access is granted point by point, with a time limit on every instruction. Nothing outside the permitted list can be changed."],
  ["Data quality visible", "Gaps, stale points, estimated reads and unit problems are shown alongside the data, not smoothed away. Estimates carry the quality of their inputs."],
  ["Fallback behaviour defined", "If a connection drops or an instruction expires, the equipment returns to its local schedule. The fallback is agreed before control begins."],
  ["Human approval configurable", "Sites decide what needs a person's approval: every event, only exceptions, or specific assets. The rule that applied is recorded."],
  ["Existing controls remain authoritative", "The BMS and local safety logic stay in charge. GridSync works through them and never around them."],
];

const onboarding = [
  ["Inventory", "List systems, meters and data you already have, and who has access to each."],
  ["Read-only connection", "Connect meters and BMS points for observation. No writes."],
  ["Model and review", "Build the site model with the facilities team; confirm names, limits and exclusions."],
  ["Forecast cycles", "Run forecasts alongside normal operation and compare them with what actually happened."],
  ["Permissioned control", "Agree writable points, limits, expiries and fallback. Add control where it is useful."],
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Data & integrations", path: "/integrations" }]}
        kicker="Data & integrations"
        title="Connect the data that explains the building."
        intro={
          <p>
            Flexibility is only as good as the data behind it. GridSync reads what the building already produces, keeps its
            quality visible, and writes back only what an operator has approved.
          </p>
        }
        aside={<MediaFrame id="IMG-10" priority />}
      />

      <section className="py-24 sm:py-28">
        <div className="container">
          <SectionIntro index="01" kicker="Integration map" title="Inputs, processing, outputs." layout="split">
            <p>Select any input or output to see what GridSync uses, how often, which processing steps it feeds, and its current status.</p>
          </SectionIntro>
          <div className="mt-14">
            <IntegrationMap />
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-forest/15 pt-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="label">Status labels</p>
              <ul className="mt-3 flex flex-wrap items-center gap-2 [&>li]:flex">
                <li><AvailabilityTag status="available" /></li>
                <li><AvailabilityTag status="pilot" /></li>
                <li><AvailabilityTag status="evaluating" /></li>
                <li><AvailabilityTag status="planned" /></li>
              </ul>
            </div>
            <div className="max-w-md text-[14px] text-mineral-ink">
              <p>
                GridSync does not list a protocol or product as supported until it has been implemented and tested on a site.
                Statuses are reviewed with each release.
              </p>
              <ReplaceMarker className="mt-3">Confirm status before launch</ReplaceMarker>
            </div>
          </div>
        </div>
      </section>

      <section className="on-ink bg-ink py-24 sm:py-28">
        <div className="container">
          <div className="max-w-measure">
            <p className="kicker">
              <span className="num">02</span>Integration principles
            </p>
            <h2 className="h-section mt-5">How GridSync behaves inside someone else&apos;s control system.</h2>
          </div>
          <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {principles.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.05} className="border-t border-paper/15 pt-5">
                <p className="font-mono text-[12px] text-copper-light">0{i + 1}</p>
                <h3 className="mt-2 text-[1.25rem] font-medium">{t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-stone">{b}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="kicker">
              <span className="num">03</span>Connecting a site
            </p>
            <h2 className="h-sub mt-5">Five steps, and the first three change nothing in the building.</h2>
            <p className="muted mt-5 text-[15px]">
              Timelines depend on access to the BMS and meter data. Many sites can start with an interval-data file and a
              schedule while network access is arranged.
            </p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {onboarding.map(([t, b], i) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-forest/15 py-6 last:border-b">
                <span className="font-mono text-[13px] text-copper-ink">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.125rem] font-medium text-forest">{t}</h3>
                  <p className="mt-1.5 text-forest/80">{b}</p>
                  {i === 2 && <p className="mt-2 font-mono text-[12px] text-moss-ink">● Read-only until here</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Tell us what your building already runs." body="A list of systems and a sample of meter data is enough to start a conversation about what can be connected, and in what order." />
    </>
  );
}
