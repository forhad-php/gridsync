import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { Accordion } from "@/components/ui/Accordion";
import { IllustrativeNote, OpStatus } from "@/components/ui/Status";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoLoop } from "@/components/media/VideoLoop";
import { EventTimeline } from "@/components/diagrams/EventTimeline";
import { stages } from "@/components/diagrams/event-stages";

export const metadata = pageMetadata({
  title: "Grid events — Prepare before the event begins",
  description:
    "The full lifecycle of a grid event in GridSync: from signal received and site review, through operator approval and coordinated response, to verification and follow-up.",
  path: "/grid-events",
});

const example: [string, React.ReactNode][] = [
  ["Event type", "Peak demand reduction"],
  ["Site", "Riverside Office Campus"],
  ["Window", "16:00–18:00"],
  ["Expected condition", "High local demand"],
  ["Participating systems", "HVAC, EV charging, lighting"],
  ["Exclusions", "Occupied meeting zones, maintenance area"],
  ["Approval", <OpStatus key="a" state="pending" className="!text-[14px]">Pending operator review</OpStatus>],
];

const faqs = [
  {
    q: "What happens if nobody approves the plan?",
    a: <p>Nothing is sent. The plan stays in draft, the event record notes that no approval was given, and the site does not participate. Where a programme allows it, GridSync can also report reduced or zero availability.</p>,
  },
  {
    q: "Can an operator stop an event once it has started?",
    a: <p>Yes. An operator can release any asset or the whole site at any time. Instructions revert to the local schedule, and the reason and time are kept in the record.</p>,
  },
  {
    q: "What if an asset reaches a limit during the window?",
    a: <p>It steps out. Limits are part of the plan, not something to work around. The step-out is shown to the operator immediately and recorded with the reading that triggered it.</p>,
  },
  {
    q: "Does every event need operator approval?",
    a: <p>Approval rules are configured per site. Some sites approve every event; others pre-approve plans that stay inside agreed limits and only review exceptions. Either way, the rule that applied is recorded.</p>,
  },
];

export default function GridEventsPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Grid events", path: "/grid-events" }]}
        kicker="Grid events"
        title="Prepare for the event before the event begins."
        intro={
          <p>
            Most of the risk in a demand-response event is removed the day before: by knowing the site, agreeing the limits
            and getting a clear decision. GridSync treats the event as eight stages, each with an owner and a record.
          </p>
        }
        aside={<MediaFrame id="IMG-09" priority />}
      />

      {/* Example event */}
      <section className="py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <SectionIntro kicker="Example event" title="One event, followed from notice to review." className="lg:col-span-5">
            <p>
              The walkthrough below follows a single peak-reduction event at an office campus. The site, times and systems are
              invented for illustration; the sequence is the one GridSync follows for every event.
            </p>
          </SectionIntro>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <div className="border border-forest/20 bg-paper-white">
              <div className="flex items-baseline justify-between border-b border-forest/15 px-5 py-3">
                <p className="font-mono text-[12px] text-forest">Event record · GE-0417</p>
                <p className="font-mono text-[12px] text-mineral-ink">Draft</p>
              </div>
              <dl className="divide-y divide-forest/10 px-5">
                {example.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                    <dt className="label pt-0.5">{k}</dt>
                    <dd className="text-[16px] text-forest">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-forest/15 px-5 py-3">
                <IllustrativeNote />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="border-t border-forest/15 bg-paper-white/40 py-24 sm:py-28">
        <div className="container">
          <SectionIntro index="01" kicker="Event lifecycle" title="Eight stages, each with an owner and a record." layout="split">
            <p>
              Select a stage to see what the operator sees, what GridSync does, and what remains afterwards. The example is
              paused at stage four: the plan is waiting for a person to decide.
            </p>
          </SectionIntro>
          <div className="mt-14">
            <EventTimeline />
          </div>
          <IllustrativeNote className="mt-6" />
        </div>
      </section>

      {/* Signal path */}
      <section className="py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <VideoLoop id="VID-07" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="kicker">
              <span className="num">02</span>Signal and response
            </p>
            <h2 className="h-sub mt-5">The request travels one way. The evidence travels back.</h2>
            <p className="mt-5 text-forest/85">
              A grid signal is a request with conditions: a window, a direction, a size and a way of measuring the result.
              The building&apos;s answer is only useful if it comes back with the same conditions attached.
            </p>
            <ol className="mt-8 border-t border-forest/15">
              {stages.map((s, i) => (
                <li key={s.name} className="flex gap-3 border-b border-forest/10 py-2 text-[15px]">
                  <span className="font-mono text-[12px] text-copper-ink">{String(i + 1).padStart(2, "0")}</span>
                  {s.name}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Principles in dark band */}
      <section className="on-ink bg-ink py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="kicker">
              <span className="num">03</span>During the window
            </p>
            <h2 className="h-section mt-5">Limits come first. Targets come second.</h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {[
              ["Boundaries travel with the plan", "Every instruction carries the limit it must respect and the time it expires."],
              ["Step-outs are normal", "An asset leaving the plan because it reached a limit is the system working, not failing."],
              ["People can always intervene", "Operators can release an asset or the site at any moment, and the reason is kept."],
              ["Shortfalls are explained", "If delivery falls short, the record shows which asset, when, and why."],
            ].map(([t, b]) => (
              <li key={t} className="border-t border-paper/15 pt-4">
                <h3 className="text-[1.125rem] font-medium">{t}</h3>
                <p className="mt-2 text-[15px] text-stone">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="kicker">
              <span className="num">04</span>Questions
            </p>
            <h2 className="h-sub mt-5">What operators ask about events.</h2>
            <p className="muted mt-4 text-[15px]">
              For the full picture of what GridSync reads and writes, see{" "}
              <Link href="/integrations" className="link">
                data &amp; integrations
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand title="Walk through your next event with us." body="Bring a recent event notice and a picture of your site. We will show how the lifecycle would apply." />
    </>
  );
}
