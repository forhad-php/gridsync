import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { ReplaceMarker } from "@/components/ui/Status";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoLoop } from "@/components/media/VideoLoop";

export const metadata = pageMetadata({
  title: "About",
  description:
    "GridSync exists to connect energy decisions with the operational reality of commercial buildings: comfort, schedules, maintenance, safety and people.",
  path: "/about",
});

const principles = [
  {
    title: "Operations come first.",
    body: "A building exists to house people, products and work. Flexibility is offered from what the operation can spare, never taken from what it needs.",
  },
  {
    title: "Constraints are part of the model.",
    body: "Comfort bands, equipment limits, occupancy windows and maintenance conditions are modelled explicitly, owned by someone, and attached to every plan.",
  },
  {
    title: "Uncertainty should be visible.",
    body: "Every estimate carries its confidence and the inputs that moved it. A number without its uncertainty is not ready to be committed.",
  },
  {
    title: "Controls must be explainable.",
    body: "If an operator cannot say why a unit is in a plan, it comes out of the plan. Every instruction traces back to an approval.",
  },
  {
    title: "Measurement should preserve context.",
    body: "A result is kept with its baseline, its inputs, its deviations and its decisions, so it can be explained months later.",
  },
  {
    title: "Claims must be earned.",
    body: "We publish results, customers and certifications only when they exist and can be verified. Until then, examples are labelled as examples.",
  },
];

const approach = [
  ["Read before write", "Every connection starts read-only. Control is added point by point, with permission, after operators have reviewed several forecast cycles."],
  ["Beside the BMS, not instead of it", "The building management system stays authoritative. Local safety logic, interlocks and life-safety systems are never overridden."],
  ["One site model", "Meters, equipment, spaces, schedules and limits are described once, in terms operators already use, and reused by every forecast and plan."],
  ["Bounded instructions", "Instructions are time-limited, reversible and have a defined fallback to the local schedule if communication is lost."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "About", path: "/about" }]}
        kicker="About GridSync"
        title="Built around the realities of operating buildings."
        intro={
          <p>
            Buildings are complex systems run by people. Energy flexibility cannot be separated from comfort, schedules,
            maintenance and safety—so we do not try to.
          </p>
        }
        aside={<MediaFrame id="IMG-11" priority compact />}
      />

      {/* Why we exist */}
      <section className="py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
          <SectionIntro index="01" kicker="Why we exist" title="Energy decisions are being made far from the plant room." className="lg:col-span-5" />
          <Reveal className="space-y-6 text-[1.075rem] text-forest/90 lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p>
              Grids increasingly need buildings to move demand: earlier, later, less, occasionally more. The request usually
              arrives as a window, a size and a price. The building it lands on has tenants, a chiller with a minimum run time,
              a fleet that must leave at six, and a maintenance contractor on level two.
            </p>
            <p>
              Most of what decides whether a building can respond is already known—by someone, in some system. It is rarely
              known in one place, and rarely before the event. The result is either no participation, or participation that
              quietly costs comfort and trust.
            </p>
            <p className="serif-statement !text-[1.6rem]">
              GridSync exists to connect energy decisions with operational reality, so buildings can respond without disruption.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-forest/15 bg-paper-white/50 py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionIntro index="02" kicker="How we work" title="On site, with the people who run the building.">
              <p>
                Every engagement starts with one building and a walk-through: plant room, electrical room, meter data, the BMS
                front-end and the schedules that actually drive the week.
              </p>
            </SectionIntro>
            <ol className="mt-10 border-t border-forest/15">
              {[
                "Walk the site with facilities and energy teams.",
                "Connect read-only and review data quality together.",
                "Agree operating boundaries, owners and exclusions in writing.",
                "Run forecasts in shadow before anything is controlled.",
                "Add control only where operators ask for it.",
              ].map((s, i) => (
                <li key={s} className="grid grid-cols-[2.5rem_1fr] border-b border-forest/15 py-4 text-[16px]">
                  <span className="font-mono text-[13px] text-copper-ink">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <VideoLoop id="VID-03" />
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="on-ink bg-ink py-24 sm:py-32">
        <div className="container">
          <SectionIntro index="03" kicker="Principles" title="Six rules we hold ourselves to." layout="split">
            <p>They shape the product, the way we talk about it, and what we are willing to claim.</p>
          </SectionIntro>
          <ol className="mt-16 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={(i % 3) * 0.06}
                className="border-t border-paper/20 pb-12 pt-8"
              >
                <span className="font-mono text-[13px] text-copper-light">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-[1.65rem] font-normal leading-snug text-paper">{p.title}</h3>
                <p className="mt-4 text-[16px] text-stone">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
          <SectionIntro index="04" kicker="Team" title="The people behind GridSync." className="lg:col-span-5">
            <p>
              We will introduce the team here with names, roles and backgrounds once each person has approved their profile.
            </p>
          </SectionIntro>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <ReplaceMarker>Team profiles — replace with approved names, roles and photographs</ReplaceMarker>
            <ul className="mt-8 grid gap-px border border-forest/15 bg-forest/15 sm:grid-cols-2">
              {["Profile 01", "Profile 02", "Profile 03", "Profile 04"].map((slot) => (
                <li key={slot} className="bg-paper p-6">
                  <div aria-hidden className="drafting flex aspect-[4/3] items-end border border-dashed border-forest/25 bg-stone/60 p-3">
                    <span className="font-mono text-[11px] text-mineral-ink">Portrait to be supplied</span>
                  </div>
                  <p className="mt-4 font-medium text-forest">{slot}</p>
                  <p className="mt-1 text-[14px] text-mineral-ink">Name, role and background pending approval.</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technical approach */}
      <section className="border-t border-forest/15 py-24 sm:py-32">
        <div className="container">
          <SectionIntro index="05" kicker="Technical approach" title="Conservative by design." layout="split">
            <p>
              Buildings run for decades. The software around them should be predictable, reversible and easy to explain.{" "}
              <Link href="/integrations" className="link">
                Read about data and integrations
              </Link>
              .
            </p>
          </SectionIntro>
          <dl className="mt-16 grid gap-x-10 border-t border-forest/15 md:grid-cols-2">
            {approach.map(([t, b]) => (
              <Reveal key={t} className="grid gap-3 border-b border-forest/15 py-8 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-medium text-forest">{t}</dt>
                <dd className="text-forest/85">{b}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Responsible claims */}
      <section className="border-t border-forest/15 bg-paper-white/50 py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-10">
          <SectionIntro index="06" kicker="Responsible claims" title="What you will not find on this site." className="lg:col-span-5" />
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <ul className="border-t border-forest/15">
              {[
                "Customer names or logos we have not been given permission to show.",
                "Savings percentages or capacity figures that have not been measured.",
                "Certifications we have not been awarded.",
                "Programme participation or utility partnerships that do not exist.",
                "Testimonials, anonymous or otherwise, presented as proof.",
              ].map((c) => (
                <li key={c} className="flex gap-4 border-b border-forest/15 py-4">
                  <span aria-hidden className="font-mono text-mineral-ink">—</span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-forest/85">
              Where an example helps, it is labelled <span className="font-mono text-[14px]">Illustrative example</span>. Where
              evidence is still to come, the page says so.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
