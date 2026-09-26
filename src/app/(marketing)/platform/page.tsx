import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { IllustrativeNote, OpStatus } from "@/components/ui/Status";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoLoop } from "@/components/media/VideoLoop";
import { JsonLd } from "@/components/accessibility/JsonLd";
import { FlexibilityBoundaryChart } from "@/components/charts/FlexibilityBoundaryChart";
import { BoundaryBand, CoordinationSequence, EvidenceLedger, SiteModelTree, VerificationFigure } from "@/components/diagrams/PlatformDiagrams";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Platform",
  description:
    "Six connected capabilities—site model, operating boundaries, flexibility forecast, event coordination, verification and evidence trail—for operating flexible commercial buildings.",
  path: "/platform",
});

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GridSync",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: site.description,
  url: `${site.url}/platform`,
  publisher: { "@id": `${site.url}/#organization` },
};

const index = [
  ["site-model", "Site model"],
  ["operating-boundaries", "Operating boundaries"],
  ["flexibility-forecast", "Flexibility forecast"],
  ["event-coordination", "Event coordination"],
  ["verification", "Verification"],
  ["evidence-trail", "Evidence trail"],
];

/* Shared detail trio: example, technical note, what operators see. Placement varies per capability. */
function Example({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label">Example</h3>
      <div className="mt-3 text-[16px] text-forest/90">{children}</div>
      <IllustrativeNote className="mt-3">Illustrative example.</IllustrativeNote>
    </div>
  );
}
function TechNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-dashed border-forest/30 pt-4">
      <h3 className="label">Technical note</h3>
      <div className="mt-3 text-[15px] text-forest/85">{children}</div>
    </div>
  );
}
function OperatorsSee({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <div className={cn("border-l-2 border-copper bg-paper-white/70 px-5 py-5", className)}>
      <h3 className="label">What operators see</h3>
      <ul className="mt-3 space-y-2 text-[15px] text-forest">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] h-px w-2.5 shrink-0 bg-forest/40" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function CapHead({ n, id, title, children }: { n: string; id: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <p className="kicker">
        <span className="num">{n}</span>Capability
      </p>
      <h2 id={`${id}-h`} className="h-section mt-4">
        {title}
      </h2>
      <div className="mt-6 space-y-4 text-[17px] text-forest/90 sm:text-[18px]">{children}</div>
    </>
  );
}

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <PageHeader
        trail={[{ name: "Platform", path: "/platform" }]}
        kicker="Platform"
        title="An operating layer for flexible buildings."
        intro={
          <p>
            GridSync sits between the systems that run a building and the signals that ask it to change. Six capabilities
            share one site model, so a forecast, a plan and a verified result always refer to the same equipment and the same
            limits.
          </p>
        }
        aside={<MediaFrame id="IMG-03" priority sizes="(min-width: 1024px) 45vw, 100vw" />}
      />

      {/* Index */}
      <nav aria-label="Capabilities" className="border-b border-forest/15">
        <ol className="container flex gap-x-8 gap-y-3 overflow-x-auto py-5 text-[15px]">
          {index.map(([id, name], i) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="group inline-flex items-baseline gap-2 text-forest hover:text-copper-ink">
                <span className="font-mono text-[12px] text-mineral-ink">0{i + 1}</span>
                {name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1. Site model — split, diagram right, detail trio below */}
      <section id="site-model" aria-labelledby="site-model-h" className="py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <CapHead n="01" id="site-model" title="Site model">
              <p>
                Everything starts with a map of the building as it actually operates: which meters measure which equipment,
                which equipment serves which zones, and which schedules apply to each.
              </p>
              <p>
                The model is built from what already exists—BMS point lists, meter registers, O&amp;M documents and the
                facilities calendar—and is reviewed with the people who run the site before anything else is calculated.
              </p>
            </CapHead>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="drafting border border-forest/15 bg-paper-white/40 p-4 sm:p-6">
              <SiteModelTree />
            </div>
          </Reveal>
        </div>
        <div className="container mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Example>
              <p>
                A chiller submeter is found to include two small air-handling units. The model records the relationship,
                so the chiller&apos;s response is no longer overstated in verification.
              </p>
            </Example>
          </div>
          <div className="lg:col-span-4">
            <TechNote>
              <p>
                Relationships are stored as a graph with effective dates. When a meter is replaced or a zone is re-let, the
                history remains attached to past events.
              </p>
            </TechNote>
          </div>
          <OperatorsSee
            className="lg:col-span-4"
            items={["Every meter and what it measures", "Equipment with its zones and schedules", "Gaps: points not yet mapped or not reporting"]}
          />
        </div>
        <div className="container mt-16 grid lg:grid-cols-12">
          <VideoLoop id="VID-02" className="lg:col-span-6 lg:col-start-7" />
        </div>
      </section>

      {/* 2. Operating boundaries — reversed: diagram left, text right */}
      <section id="operating-boundaries" aria-labelledby="operating-boundaries-h" className="border-t border-forest/15 bg-paper-white/50 py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <div className="drafting border border-forest/15 bg-paper p-4 sm:p-6">
              <BoundaryBand />
            </div>
            <p className="mt-3 font-mono text-[12px] text-mineral-ink">DGM-08 · Zone L4-East, illustrative weekday.</p>
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9">
            <CapHead n="02" id="operating-boundaries" title="Operating boundaries">
              <p>
                Comfort limits, equipment limits, occupancy windows, charging deadlines and maintenance conditions are
                written down as explicit boundaries—each with an owner and a reason.
              </p>
              <p>Flexibility is only ever calculated inside them. A boundary is never relaxed by the software to meet a target.</p>
            </CapHead>
          </Reveal>
        </div>
        <div className="container mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <OperatorsSee
            className="lg:col-span-5"
            items={[
              <>
                Current value against each limit, e.g. <OpStatus state="watch">0.4 °C headroom</OpStatus>
              </>,
              "Who set the boundary, when, and why",
              "Boundaries that change during the day (occupied / unoccupied)",
            ]}
          />
          <div className="lg:col-span-3 lg:col-start-7">
            <Example>
              <p>A hotel sets conference rooms to &ldquo;excluded&rdquo; whenever they are booked, regardless of the floor schedule.</p>
            </Example>
          </div>
          <div className="lg:col-span-3">
            <TechNote>
              <p>
                Boundaries are typed—hard (safety, product protection), agreed (tenant comfort) and preferred—so plans can
                explain which kind of limit ended a response.
              </p>
            </TechNote>
          </div>
        </div>
      </section>

      {/* 3. Flexibility forecast — full width chart */}
      <section id="flexibility-forecast" aria-labelledby="flexibility-forecast-h" className="border-t border-forest/15 py-24 sm:py-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <CapHead n="03" id="flexibility-forecast" title="Flexibility forecast">
                <p>
                  For each interval, GridSync estimates the expected load and how far it could move down or up without
                  crossing a boundary—and says how confident it is.
                </p>
              </CapHead>
            </Reveal>
            <Reveal className="self-end lg:col-span-5 lg:col-start-8" delay={0.1}>
              <p className="serif-statement !text-[1.45rem]">
                A forecast that hides its uncertainty is a forecast operators learn to ignore.
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-14 border-y border-forest/15 py-8">
            <FlexibilityBoundaryChart />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            <Example>
              <p>
                On a warm weekday the widest downward range falls between 16:00 and 18:00, but confidence is lower than in
                the morning because occupancy after 17:00 varies.
              </p>
            </Example>
            <TechNote>
              <p>
                Forecasts combine the site&apos;s own history with weather, calendars and the current state of each zone.
                Every forecast records the inputs it used, so it can be compared with what happened.
              </p>
            </TechNote>
            <OperatorsSee items={["Candidate windows with size and confidence", "Which boundaries narrow each window", "Inputs that changed since the last forecast"]} />
          </div>
        </div>
      </section>

      {/* 4. Event coordination — ink section */}
      <section id="event-coordination" aria-labelledby="event-coordination-h" className="on-ink bg-ink py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="kicker">
              <span className="num">04</span>Capability
            </p>
            <h2 id="event-coordination-h" className="h-section mt-4">
              Event coordination
            </h2>
            <div className="mt-6 space-y-4 text-stone">
              <p>
                When a utility, market or internal signal arrives, GridSync prepares a response asset by asset, routes it for
                approval and sends only approved, time-bounded instructions through the existing controls.
              </p>
              <p>Every instruction expires. When it does, the building returns to its local schedule.</p>
            </div>
            <Link href="/grid-events" className="btn-text mt-8">
              Follow an example event
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <div className="bg-paper p-4 sm:p-6">
              <CoordinationSequence />
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="label">Example</h3>
                <p className="mt-3 text-[15px] text-stone">
                  An operator removes a meeting floor from the plan; the plan is recalculated and re-approved as v2 before the
                  window.
                </p>
                <p className="mt-2 font-mono text-[11.5px] text-mineral-light">Illustrative example.</p>
              </div>
              <div>
                <h3 className="label">Technical note</h3>
                <p className="mt-3 text-[15px] text-stone">
                  Approval rules are configurable per site: always ask, ask above a threshold, or pre-approved inside a
                  standing envelope.
                </p>
              </div>
              <div className="border-l-2 border-copper-light pl-4">
                <h3 className="label">What operators see</h3>
                <p className="mt-3 text-[15px] text-paper">The plan, its version, who approved it, and when each change expires.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Verification — split with narrow text */}
      <section id="verification" aria-labelledby="verification-h" className="py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="drafting border border-forest/15 bg-paper-white/40 p-4 sm:p-6">
              <VerificationFigure />
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-forest" aria-label="Legend">
              <li className="flex items-center gap-2">
                <span aria-hidden className="w-5 border-t border-dashed border-forest" /> Baseline
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="h-px w-5 bg-copper" /> Planned
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="h-0.5 w-5 bg-forest" /> Observed
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="h-3 w-5 bg-moss/30" /> Measured response
              </li>
            </ul>
            <p className="mt-2 font-mono text-[12px] text-mineral-ink">DGM-09 · Illustrative scenario — not measured data.</p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <CapHead n="05" id="verification" title="Verification">
              <p>
                After the window, GridSync compares three lines: what would have happened (baseline), what was planned, and
                what the meters recorded.
              </p>
              <p>Differences are kept and explained rather than averaged away.</p>
            </CapHead>
            <div className="mt-10 space-y-8">
              <TechNote>
                <p>
                  The baseline method follows the programme or contract. Where none is specified, the method is chosen before
                  the event and recorded with it.
                </p>
              </TechNote>
              <OperatorsSee items={["Delivered response by interval", "Deviations with their cause", "Data completeness for the window"]} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Evidence trail — ledger across full width */}
      <section id="evidence-trail" aria-labelledby="evidence-trail-h" className="border-t border-forest/15 bg-paper-white/50 py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <CapHead n="06" id="evidence-trail" title="Evidence trail">
              <p>
                Timestamps, input conditions, approvals, changes and outcomes are preserved for every event, in order, with
                references that can be exported.
              </p>
              <p>Six months later, anyone should be able to see what was known at the time and why each decision was made.</p>
            </CapHead>
          </Reveal>
          <Reveal className="min-w-0 lg:col-span-8" delay={0.1}>
            <div className="border-y border-forest/20 py-4">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-medium text-forest">Event EVT-0412 · record</span>
                <IllustrativeNote />
              </div>
              <EvidenceLedger />
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <Example>
                <p>A tenant asks why their floor was warm on a Thursday in July. The record shows the limit, the reading and the step-out time.</p>
              </Example>
              <OperatorsSee items={["The full event record", "Changes between plan versions", "An export for programme or audit review"]} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="See the platform against your building."
        body="Share what systems and data you have. We will show where the site model would start and which boundaries matter first."
      />
    </>
  );
}
