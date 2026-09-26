import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { VideoLoop } from "@/components/media/VideoLoop";
import { EventPhaseTabs } from "@/components/diagrams/EventPhaseTabs";
import { FlexibilityBoundaryChart } from "@/components/charts/FlexibilityBoundaryChart";

export const metadata = pageMetadata({
  title: "Outcomes — Easier to operate, easier to explain",
  description:
    "What changes for facility teams, energy teams and asset owners when building flexibility is visible, bounded and recorded—before, during and after a grid event.",
  path: "/outcomes",
});

const audiences = [
  {
    who: "For facility teams",
    items: ["Better visibility into operating limits", "Fewer disconnected spreadsheets", "More context around control decisions"],
    note: "The people who get the call when a floor is too warm see the plan, the limits and the reason for every change.",
  },
  {
    who: "For energy teams",
    items: ["Clearer flexible-capacity estimates", "Better event preparation", "More reliable measurement context"],
    note: "Estimates come with the constraints and confidence behind them, so offers are made with fewer surprises.",
  },
  {
    who: "For asset owners",
    items: ["A documented path from building operations to energy value", "More transparent portfolio reporting", "Fewer surprises during peak conditions"],
    note: "Reporting shows what each building contributed and why, rather than one portfolio number.",
  },
];

const matrix: { phase: string; sees: string; coordinates: string; evidence: string }[] = [
  {
    phase: "Before an event",
    sees: "The window, participating systems, each system's limits, exclusions and the confidence of the estimate.",
    coordinates: "Forecasts, draft plans asset by asset, and the approval request to the named person.",
    evidence: "Inputs used and their quality, forecast version, plan version, approver and decision time.",
  },
  {
    phase: "During an event",
    sees: "Load against baseline and plan; each zone or asset against its boundary; any step-out and its cause.",
    coordinates: "Approved, time-bounded instructions; automatic release of assets that reach a limit; fallback on expiry.",
    evidence: "Interval readings, instructions and acknowledgements, boundary events, operator interventions.",
  },
  {
    phase: "After an event",
    sees: "Measured response against the programme baseline and the plan, with deviations explained.",
    coordinates: "Verification once final data arrives, and the event report for the site, programme or aggregator.",
    evidence: "Baseline calculation, measured result, deviation notes, exportable record and follow-up actions.",
  },
];

export default function OutcomesPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Outcomes", path: "/outcomes" }]}
        kicker="Outcomes"
        title="Make flexibility easier to operate and easier to explain."
        intro={
          <p>
            We describe outcomes in operational terms because that is where they start. Measured results will be published
            when pilot sites have produced them and their owners have agreed—with the method alongside the number.
          </p>
        }
      />

      <div className="container pt-16">
        <VideoLoop id="VID-06" />
      </div>

      {/* Audiences */}
      <section className="py-24 sm:py-28">
        <div className="container">
          <SectionIntro index="01" kicker="Who it helps" title="Three teams, one record of what the building did." layout="split">
            <p>Flexibility touches people who rarely share a meeting. Each gets something different from the same model.</p>
          </SectionIntro>
          <div className="mt-14 grid border-t border-forest/20 md:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.who} delay={i * 0.08} className="border-b border-forest/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <h3 className="h-sub">{a.who}</h3>
                <ul className="mt-6 space-y-3">
                  {a.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[16px] text-forest">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-copper" />
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-serif text-[1.15rem] leading-snug text-forest/85">{a.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix */}
      <section className="border-t border-forest/15 bg-paper-white/40 py-24 sm:py-28">
        <div className="container">
          <SectionIntro index="02" kicker="Outcome matrix" title="What is seen, coordinated and kept at each stage." />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-[15.5px]">
              <caption className="sr-only">Outcome matrix: for each event stage, what the operator sees, what GridSync coordinates and what evidence remains.</caption>
              <thead>
                <tr className="border-b-2 border-forest/40">
                  <th scope="col" className="w-[16%] py-3 pr-6 align-bottom">
                    <span className="sr-only">Stage</span>
                  </th>
                  <th scope="col" className="label py-3 pr-6 align-bottom font-normal">What the operator sees</th>
                  <th scope="col" className="label py-3 pr-6 align-bottom font-normal">What GridSync coordinates</th>
                  <th scope="col" className="label py-3 align-bottom font-normal">What evidence remains</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((r) => (
                  <tr key={r.phase} className="border-b border-forest/15 align-top">
                    <th scope="row" className="py-6 pr-6 font-serif text-[1.3rem] font-normal leading-tight text-forest">
                      {r.phase}
                    </th>
                    <td className="py-6 pr-6 text-forest/90">{r.sees}</td>
                    <td className="py-6 pr-6 text-forest/90">{r.coordinates}</td>
                    <td className="py-6 text-forest/90">{r.evidence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-[12px] text-mineral-ink lg:hidden">Scroll the table sideways to see all columns.</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-24 sm:py-28">
        <div className="container">
          <SectionIntro index="03" kicker="Before, during, after" title="The same event, three moments." layout="split">
            <p>
              Step through one illustrative event. The{" "}
              <Link href="/grid-events" className="link">
                grid events
              </Link>{" "}
              page follows it stage by stage.
            </p>
          </SectionIntro>
          <div className="mt-12">
            <EventPhaseTabs />
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="border-t border-forest/15 py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="kicker">
              <span className="num">04</span>Reading a forecast
            </p>
            <h2 className="h-sub mt-5">Visible before commitment, not reconstructed after it.</h2>
            <div className="mt-5 space-y-4 text-forest/85">
              <p>
                The dark line is what the building is expected to use. The shaded envelope is how far it could move in each
                interval without leaving its limits. The candidate window is where moving it is most useful.
              </p>
              <p>
                Confidence falls later in the day as weather and occupancy become less certain. That uncertainty is shown, not
                hidden, so the offer can be sized accordingly.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FlexibilityBoundaryChart title="Illustrative scenario: office building, warm weekday" />
          </div>
        </div>
      </section>

      {/* Claims */}
      <section className="border-t border-forest/15 py-24 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="kicker">
              <span className="num">05</span>How we will report results
            </p>
            <p className="serif-statement mt-6">Numbers will come with their method, their site and their limits—or not at all.</p>
          </div>
          <ul className="space-y-6 lg:col-span-6 lg:col-start-7">
            {[
              "Results are published only with the site owner's agreement.",
              "Every figure states the baseline method, period and data used.",
              "Illustrative scenarios are labelled as illustrative wherever they appear.",
              "Shortfalls and step-outs are reported alongside delivered response.",
            ].map((t) => (
              <li key={t} className="border-t border-forest/15 pt-4 text-[17px] text-forest">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Start with the outcomes that matter to your site." body="Tell us which of these would make the biggest difference to your team, and what you would need to see to trust the result." />
    </>
  );
}
