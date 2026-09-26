import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { fieldNotes, formatDate } from "@/content/field-notes";
import { MediaFrame } from "@/components/media/MediaFrame";
import { HeroVideoFrame } from "@/components/home/HeroVideoFrame";
import { OperationalRealitySection } from "@/components/home/OperationalRealitySection";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { SystemExplorer } from "@/components/diagrams/SystemExplorer";
import { BatteryVsBuilding } from "@/components/diagrams/BatteryVsBuilding";
import { CoordinateFigure, ForecastFigure, ObserveFigure, VerifyFigure } from "@/components/diagrams/ModuleFigures";

export const metadata = pageMetadata({
  title: "GridSync — Buildings that respond without disruption",
  description: site.description,
  path: "/",
  absolute: true,
});

const modules = [
  {
    name: "Observe",
    figure: <ObserveFigure />,
    body: "Bring meters, BMS points, schedules and signals into one site model, with data quality shown rather than smoothed over.",
    sees: "Which equipment is reporting, which is stale, and what it is doing now.",
  },
  {
    name: "Forecast",
    figure: <ForecastFigure />,
    body: "Estimate where and when load can move, how far, and how confident the estimate is—inside the site's own limits.",
    sees: "A candidate window, its size, its confidence and the constraints that shaped it.",
  },
  {
    name: "Coordinate",
    figure: <CoordinateFigure />,
    body: "Prepare a response asset by asset, route it for approval, and send only approved, time-bounded instructions.",
    sees: "Who approved what, which zones are excluded, and when each change expires.",
  },
  {
    name: "Verify",
    figure: <VerifyFigure />,
    body: "Compare baseline, plan and metered result, and keep the conditions that explain any difference.",
    sees: "Delivered response, deviations, and the record behind them.",
  },
];

const outcomes = [
  ["Better visibility before a grid event", "Operators see the window, the participating equipment and the limits before anything is committed."],
  ["Fewer manual coordination steps", "Schedules, meters and constraints are read once and kept in one model instead of reassembled for every event."],
  ["Clearer operating boundaries", "Comfort bands, equipment limits and exclusions are written down, owned and visible on every plan."],
  ["More explainable event performance", "Each result keeps its baseline, inputs and decisions, so it can be explained later to a tenant, an auditor or a programme."],
  ["Better alignment between energy and facility teams", "Both teams work from the same plan, with the same words for the same equipment."],
];

export default function HomePage() {
  const note = fieldNotes[1];
  return (
    <>
      {/* Hero */}
      <section className="border-b border-forest/15">
        <div className="container grid gap-14 pb-16 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
          <div className="flex flex-col lg:col-span-6 lg:pr-6">
            <p className="kicker">Grid-interactive building operations</p>
            <h1 className="h-display mt-7">Buildings that respond without disruption.</h1>
            <p className="lead mt-8 max-w-prose">
              GridSync helps commercial building teams coordinate HVAC, lighting, EV charging, and other flexible loads with
              changing grid conditions—while keeping comfort, schedules, equipment limits, and operator decisions in view.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href="/contact" className="btn-primary">
                Discuss a building
              </Link>
              <Link href="/how-it-works" className="btn-text">
                See how it works
              </Link>
            </div>
            <dl className="mt-auto hidden grid-cols-3 gap-6 border-t border-forest/15 pt-6 lg:grid">
              {[
                ["Reads", "BMS, meters, schedules, tariffs, signals"],
                ["Respects", "Comfort, occupancy, equipment limits"],
                ["Keeps", "Approvals, inputs, measured results"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label">{k}</dt>
                  <dd className="mt-2 text-[15px] leading-snug text-forest">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6">
            <HeroVideoFrame />
          </div>
        </div>
      </section>

      {/* A. Operational reality */}
      <OperationalRealitySection />

      {/* B. What GridSync coordinates */}
      <section className="border-t border-forest/15 bg-paper-white/50 py-24 sm:py-32">
        <div className="container">
          <SectionIntro index="02" kicker="What GridSync coordinates" title="Observe, forecast, coordinate, verify." layout="split">
            <p>Four connected steps over one site model. Each has a clear output that an operator can read, question and sign off.</p>
          </SectionIntro>
          <ol className="mt-16 grid border-t border-forest/20 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((m, i) => (
              <Reveal
                as="li"
                key={m.name}
                delay={i * 0.08}
                className="flex flex-col border-b border-forest/15 py-10 md:px-8 md:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:px-6 xl:last:border-r-0"
              >
                <div className="drafting border border-forest/10 bg-paper px-3 pb-2 pt-4">{m.figure}</div>
                <p className="label mt-8">0{i + 1}</p>
                <h3 className="h-sub mt-2">{m.name}</h3>
                <p className="mt-3 flex-1 text-forest/85">{m.body}</p>
                <p className="mt-6 border-l-2 border-copper pl-4 text-[15px] text-forest">
                  <span className="label block">What operators see</span>
                  {m.sees}
                </p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-12">
            <Link href="/platform" className="btn-text">
              Read about the platform
            </Link>
          </div>
        </div>
      </section>

      {/* C. A building is not a battery */}
      <section className="on-ink bg-ink py-24 sm:py-32">
        <div className="container grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="kicker">
              <span className="num">03</span>A building is not a battery
            </p>
            <h2 className="h-section mt-5">Flexibility with people inside it.</h2>
            <div className="mt-8 space-y-5 text-stone">
              <p>
                A battery has a state of charge, a power limit and a warranty. A building has all of those—plus occupants,
                production schedules, fresh-air requirements, maintenance windows and safety systems that must never be
                overridden.
              </p>
              <p>
                When cooling is reduced, the response does not stay flat. It tapers as each zone drifts toward its limit, and
                the right moment to stop is decided by comfort and occupancy, not by a meter.
              </p>
            </div>
            <Link href="/field-notes/a-building-is-not-a-battery" className="btn-text mt-10">
              Read the field note
            </Link>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <BatteryVsBuilding />
            <p className="mt-8 font-mono text-[12px] text-mineral-light">DGM-03 · Qualitative shapes, not measured data.</p>
          </Reveal>
        </div>
      </section>

      {/* D. Systems view */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <SectionIntro index="04" kicker="Systems view" title="One model of the systems already running the building." layout="split">
            <p>
              GridSync sits beside the building management system, not in place of it. Select a system to see what GridSync
              reads, what it may write, and the limits it has to respect.
            </p>
          </SectionIntro>
          <SystemExplorer className="mt-16" />
        </div>
      </section>

      {/* E. Practical outcomes */}
      <section className="border-t border-forest/15 py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="kicker">
              <span className="num">05</span>Practical outcomes
            </p>
            <h2 className="h-section mt-5">What changes for the people running the building.</h2>
            <p className="muted mt-6 text-[15px]">
              We describe outcomes in operational terms. Measured results will be published when pilots have produced them and
              the site owners have agreed.
            </p>
            <Link href="/outcomes" className="btn-text mt-8">
              See the outcome matrix
            </Link>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {outcomes.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-forest/15 py-7 last:border-b">
                <span className="font-mono text-[13px] text-copper-ink">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-[1.5rem] leading-snug text-forest">{title}</h3>
                  <p className="mt-2 text-forest/80">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* F. Field note */}
      <section aria-labelledby="field-note-heading" className="border-t border-forest/15">
        <MediaFrame id="IMG-02" compact sizes="100vw" className="[&>div]:max-h-[70vh]" />
        <div className="container grid gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-3">
            <p className="kicker">
              <span className="num">06</span>Field note
            </p>
            <p className="label mt-4">
              {note.category} · {formatDate(note.date)} · {note.readingTime}
            </p>
          </div>
          <div className="lg:col-span-7">
            <h2 id="field-note-heading" className="h-section">
              <Link href={`/field-notes/${note.slug}`} className="hover:text-copper-ink">
                {note.title}
              </Link>
            </h2>
            <p className="mt-6 font-serif text-[1.35rem] leading-snug text-forest/90">{note.dek}</p>
            <div className="mt-8 flex flex-wrap gap-8">
              <Link href={`/field-notes/${note.slug}`} className="btn-text">
                Read the note
              </Link>
              <Link href="/field-notes" className="btn-text">
                All field notes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* G. Final CTA */}
      <CtaBand />
    </>
  );
}
