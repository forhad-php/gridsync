import { pageMetadata } from "@/lib/seo";
import { systemSections, type SystemSection } from "@/content/systems-detail";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { IllustrativeNote } from "@/components/ui/Status";
import { MediaFrame } from "@/components/media/MediaFrame";
import { VideoLoop } from "@/components/media/VideoLoop";
import { SystemExplorer } from "@/components/diagrams/SystemExplorer";
import { HvacLoop } from "@/components/diagrams/system-illustrations/HvacLoop";
import { LightingZones } from "@/components/diagrams/system-illustrations/LightingZones";
import { ChargerTimeline } from "@/components/diagrams/system-illustrations/ChargerTimeline";
import { ColdRoom } from "@/components/diagrams/system-illustrations/ColdRoom";
import { BatteryReserve } from "@/components/diagrams/system-illustrations/BatteryReserve";
import { MeterIntervals } from "@/components/diagrams/system-illustrations/MeterIntervals";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Building systems",
  description:
    "How GridSync works with HVAC, lighting, EV charging, refrigeration, batteries and metering already running the building—and the limits it respects for each.",
  path: "/systems",
});

const illustrations: Record<SystemSection["illustration"], React.ReactNode> = {
  hvac: <HvacLoop />,
  lighting: <LightingZones />,
  ev: <ChargerTimeline />,
  cold: <ColdRoom />,
  battery: <BatteryReserve />,
  meter: <MeterIntervals />,
};

const media: Partial<Record<string, React.ReactNode>> = {
  hvac: (
    <div className="grid gap-8 sm:grid-cols-2">
      <MediaFrame id="IMG-05" />
      <VideoLoop id="VID-08" />
    </div>
  ),
  lighting: (
    <div className="grid gap-8 sm:grid-cols-2">
      <VideoLoop id="VID-04" />
      <MediaFrame id="IMG-06" />
    </div>
  ),
};

function SystemBlock({ s, i }: { s: SystemSection; i: number }) {
  const flip = i % 2 === 1;
  return (
    <section id={s.id} aria-labelledby={`${s.id}-h`} className={cn("scroll-mt-28 border-t border-forest/15 py-20 sm:py-24", flip && "bg-paper-white/50")}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
            <p className="kicker">
              <span className="num">{s.letter}</span>Building system
            </p>
            <h2 id={`${s.id}-h`} className="h-section mt-4">
              {s.title}
            </h2>
            <p className="mt-5 font-serif text-[1.35rem] leading-snug text-forest">{s.lede}</p>
            <p className="mt-5 text-forest/85">{s.body}</p>
            <p className="mt-8 border-l-2 border-signal pl-4 text-[15px] text-forest">
              <span className="label block">Operating boundary</span>
              {s.boundary}
            </p>
          </Reveal>
          <Reveal className={cn("lg:col-span-7", flip ? "lg:order-1 lg:col-start-1" : "")} delay={0.1}>
            <figure>
              <div className="drafting border border-forest/15 bg-paper p-4 sm:p-6">{illustrations[s.illustration]}</div>
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[14px] text-mineral-ink">
                <span>{s.caption}</span>
                <IllustrativeNote>Illustrative values.</IllustrativeNote>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <dl className="mt-14 grid gap-x-10 border-t border-forest/15 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((it) => (
            <div key={it.term} className="border-b border-forest/10 py-4">
              <dt className="font-medium text-forest">{it.term}</dt>
              <dd className="mt-1 text-[15px] text-forest/80">{it.note}</dd>
            </div>
          ))}
        </dl>

        {media[s.id] && <div className="mt-14">{media[s.id]}</div>}
      </div>
    </section>
  );
}

export default function SystemsPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Building systems", path: "/systems" }]}
        kicker="Building systems"
        title="Work with the systems already running the building."
        intro={
          <p>
            GridSync does not replace the building management system, the charge-point software or the meters. It reads them,
            models their limits, and—only where permitted—sends time-bounded changes back through them.
          </p>
        }
      />

      <nav aria-label="Systems on this page" className="sticky top-[3.75rem] z-30 border-b border-forest/15 bg-paper/95">
        <ol className="container flex gap-x-7 overflow-x-auto py-4 text-[15px]">
          {systemSections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} className="inline-flex items-baseline gap-2 text-forest hover:text-copper-ink">
                <span className="font-mono text-[12px] text-mineral-ink">{s.letter}</span>
                {s.title.replace(" and behind-the-meter assets", "").replace(" and thermal systems", "")}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section aria-label="System explorer" className="py-20 sm:py-24">
        <div className="container">
          <SectionIntro kicker="Explorer" title="How the systems connect." layout="split">
            <p>Select a system to see what GridSync reads, what it may write, and which limits apply.</p>
          </SectionIntro>
          <SystemExplorer className="mt-14" />
        </div>
      </section>

      {systemSections.map((s, i) => (
        <SystemBlock key={s.id} s={s} i={i} />
      ))}

      <CtaBand
        title="Tell us what is installed."
        body="A list of systems, a BMS point export and a few months of interval data are enough to start a conversation about one building."
      />
    </>
  );
}
