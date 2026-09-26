import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoLoop } from "@/components/media/VideoLoop";
import { AudioNote } from "@/components/media/AudioNote";
import { StageNarrative, type Stage } from "@/components/diagrams/StageNarrative";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "Connect, understand, identify, coordinate, verify: how GridSync moves from building conditions to an operator-approved grid response without replacing the BMS.",
  path: "/how-it-works",
});

const stages: Stage[] = [
  {
    name: "Connect",
    title: "Read from the systems already in place.",
    body: [
      "GridSync connects to the building management system, meters and charge-point software that already run the site. Nothing is replaced, and the first connection is read-only.",
      "Where a system cannot be reached directly, exports and interval files are enough to begin.",
    ],
    active: ["bms", "meters"],
    sources: ["BMS point list", "Revenue meter", "Submeters", "Charge-point system"],
    output: "A live, read-only feed with data quality flags.",
  },
  {
    name: "Understand",
    title: "Build a model of equipment, spaces and limits.",
    body: [
      "Points are mapped to equipment, equipment to zones, and zones to schedules. Comfort bands, equipment limits and exclusions are recorded with the people responsible for them.",
      "This is the step most often skipped elsewhere, and the one that decides whether later numbers can be trusted.",
    ],
    active: ["hvac", "lighting", "occupancy", "ev"],
    sources: ["Point mapping", "Operating schedules", "Zone definitions", "O&M limits"],
    output: "A reviewed site model with operating boundaries.",
  },
  {
    name: "Identify",
    title: "Find where demand can move safely.",
    body: [
      "With weather, tariffs and the current state of each zone, GridSync estimates which periods allow load to shift, reduce or increase—and how confident that estimate is.",
      "Every estimate stays inside the boundaries recorded in the previous step.",
    ],
    active: ["weather", "tariffs", "hvac", "ev"],
    sources: ["Weather forecast", "Tariff periods", "Zone temperatures", "Fleet departure plan"],
    output: "Candidate windows with size, confidence and constraints.",
  },
  {
    name: "Coordinate",
    title: "Prepare a response the operator can review.",
    body: [
      "When a grid or tariff signal arrives, GridSync drafts a plan asset by asset. The operator reviews it, excludes what should not take part, and approves.",
      "Only approved, time-bounded instructions are sent through the existing controls. Each one expires on its own.",
    ],
    active: ["signal", "bms", "hvac", "lighting", "ev"],
    sources: ["Event notice", "Approval rules", "Plan versions", "Control permissions"],
    output: "An approved plan and the instructions sent.",
  },
  {
    name: "Verify",
    title: "Measure what happened and keep the context.",
    body: [
      "After the window, metered load is compared with the baseline and the plan. Deviations are recorded with their cause—a zone reaching its limit, a meter gap, an early step-out.",
      "The result is kept with the inputs and decisions that explain it.",
    ],
    active: ["meters", "signal"],
    sources: ["Interval meter data", "Baseline method", "Event record"],
    output: "A verified result and an exportable evidence record.",
  },
];

const doesNot = [
  ["It does not blindly override safety controls.", "Life-safety, fire, emergency lighting and equipment protection logic stay in the local controls and are never written to."],
  ["It does not treat every building like a battery.", "Thermal response tapers, occupants notice, and production cannot wait. The model reflects that."],
  ["It does not hide uncertainty.", "Every estimate carries its confidence and the inputs behind it, including when those inputs are poor."],
  ["It does not replace the operator's responsibility.", "Operators approve, exclude and stop. GridSync records their decisions; it does not make them for them."],
  ["It does not make unsupported savings claims.", "Results are reported as measured, with their method. Projections are labelled as projections."],
];

const faqs = [
  {
    q: "Do we need to replace or upgrade our BMS?",
    a: <p>No. GridSync reads from the existing BMS and, where you permit it, writes a small number of time-bounded changes through it. The BMS remains authoritative.</p>,
  },
  {
    q: "Can we start without any control access?",
    a: <p>Yes. Most sites start read-only. Operators review several forecasts against what actually happened before any write permission is discussed.</p>,
  },
  {
    q: "What happens if the connection to GridSync is lost during an event?",
    a: <p>Every instruction has an expiry. If GridSync cannot reach the site, changes lapse and the building returns to its local schedule. The fallback is agreed per site before control is enabled.</p>,
  },
  {
    q: "Who approves a plan?",
    a: <p>The site decides. Plans can always require a named approver, require approval above a threshold, or be pre-approved inside a standing envelope agreed in advance.</p>,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "How it works", path: "/how-it-works" }]}
        kicker="How it works"
        title="From building conditions to grid response."
        intro={
          <p>
            Five stages, in order. Each produces something an operator can read and question before the next begins—and none
            of them requires replacing the systems already running the building.
          </p>
        }
        aside={<VideoLoop id="VID-01" />}
      />

      <section aria-labelledby="stages-h" className="pb-16 pt-8">
        <div className="container">
          <h2 id="stages-h" className="sr-only">
            Five stages
          </h2>
          <StageNarrative stages={stages} />
        </div>
      </section>

      <section className="border-t border-forest/15 py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <MediaFrame id="IMG-04" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionIntro kicker="In practice" title="Most of the work happens before the event.">
              <p>
                The quality of a response is decided in the hour before it starts: occupancy, maintenance, the state of each
                zone, and a plan someone can explain. Below, an engineer describes that hour; the transcript is always shown.
              </p>
            </SectionIntro>
          </div>
        </div>
        <div className="container mt-14">
          <AudioNote id="AUD-01" />
        </div>
      </section>

      <section aria-labelledby="does-not" className="on-ink bg-ink py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="kicker">Limits we hold ourselves to</p>
            <h2 id="does-not" className="h-section mt-5">
              What GridSync does not do.
            </h2>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {doesNot.map(([t, b], i) => (
              <Reveal as="li" key={t} delay={i * 0.05} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-paper/15 py-6 last:border-b">
                <span aria-hidden className="font-mono text-[13px] text-copper-light">
                  —
                </span>
                <div>
                  <p className="font-serif text-[1.45rem] leading-snug text-paper">{t}</p>
                  <p className="mt-2 text-stone">{b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="hiw-faq" className="py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="kicker">Questions</p>
            <h2 id="hiw-faq" className="h-section mt-5">
              Before connecting a site.
            </h2>
          </div>
          <Accordion items={faqs} className="lg:col-span-7 lg:col-start-6" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
