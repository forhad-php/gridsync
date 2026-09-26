import type { UseCaseRef } from "@/content/use-cases";
import type { UseCaseDetail } from "@/content/use-cases/details";
import { cn } from "@/lib/cn";
import { MediaFrame } from "../media/MediaFrame";
import { VideoLoop } from "../media/VideoLoop";
import { IllustrativeNote } from "../ui/Status";
import { UseCaseDiagram, UseCaseDiagramLegend } from "../diagrams/UseCaseDiagram";

type Props = { index: number; uc: UseCaseRef; d: UseCaseDetail; variant: "plate" | "split" | "ink"; video?: string };

function Diagram({ d, dark }: { d: UseCaseDetail; dark?: boolean }) {
  return (
    <figure>
      <div className={cn("drafting border border-forest/15 p-4 sm:p-6", dark ? "bg-paper" : "bg-paper-white/50")}>
        <div className="hidden sm:block">
          <UseCaseDiagram site={d.diagram.site} inputs={d.diagram.inputs} systems={d.diagram.systems} />
          <UseCaseDiagramLegend />
        </div>
        {/* Mobile fallback: the same relationships as a stacked list. */}
        <div className="text-forest sm:hidden">
          <p className="font-mono text-[12px] text-mineral-ink">Inputs: {d.diagram.inputs.join(" · ")}</p>
          <p className="mt-3 inline-block bg-ink px-3 py-1.5 text-[14px] font-medium text-paper">{d.diagram.site}</p>
          <ul className="ml-3 mt-1 border-l border-forest/40">
            {d.diagram.systems.map((s) => (
              <li key={s.name} className="relative py-2 pl-5">
                <span aria-hidden className={cn("absolute left-0 top-[1.1rem] w-4 border-t", s.state === "participates" ? "border-copper" : s.state === "limited" ? "border-dashed border-forest" : "border-dotted border-forest/50")} />
                <span className="block text-[15px]">{s.name}</span>
                <span className="block font-mono text-[12px] text-mineral-ink">{s.constraint}</span>
                <span className={cn("block font-mono text-[12px]", s.state === "participates" ? "text-copper-ink" : s.state === "limited" ? "text-signal-ink" : "text-mineral-ink")}>
                  {s.state === "participates" ? "● participates" : s.state === "limited" ? "◐ within limits" : "— excluded"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className={cn("mt-3 font-mono text-[12px]", dark ? "text-mineral-light" : "text-mineral-ink")}>
        Building-system diagram · schematic, not to scale
      </figcaption>
    </figure>
  );
}

function ListBlock({ title, items, marker = "rule", dark }: { title: string; items: string[]; marker?: "rule" | "q" | "no"; dark?: boolean }) {
  return (
    <div>
      <h3 className="label">{title}</h3>
      <ul className="mt-3 border-t border-forest/15">
        {items.map((c) => (
          <li key={c} className="flex gap-3 border-b border-forest/10 py-3 text-[16px] leading-snug">
            {marker === "rule" && <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-copper" />}
            {marker === "q" && (
              <span aria-hidden className={cn("font-mono text-[13px]", dark ? "text-copper-light" : "text-copper-ink")}>
                ?
              </span>
            )}
            {marker === "no" && (
              <span aria-hidden className={cn("font-mono text-[13px]", dark ? "text-mineral-light" : "text-mineral-ink")}>
                ×
              </span>
            )}
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Workflow({ steps, dark }: { steps: string[]; dark?: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="label">Example workflow</h3>
        <IllustrativeNote className={dark ? "!text-mineral-light" : undefined}>Illustrative workflow</IllustrativeNote>
      </div>
      <ol className="mt-3 border-t border-forest/15">
        {steps.map((s, i) => (
          <li key={s} className="grid grid-cols-[2.25rem_1fr] border-b border-forest/10 py-3 text-[16px] leading-snug">
            <span className={cn("font-mono text-[12.5px]", dark ? "text-copper-light" : "text-copper-ink")}>{String(i + 1).padStart(2, "0")}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DataNeeded({ data, dark }: { data: UseCaseDetail["data"]; dark?: boolean }) {
  return (
    <div>
      <h3 className="label">What data is required</h3>
      <table className="mt-3 w-full border-t border-forest/15 text-left text-[15px]">
        <caption className="sr-only">Data needed and whether it is required or helpful</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Need</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.item} className="border-b border-forest/10">
              <td className="py-2.5 pr-4">{r.item}</td>
              <td className={cn("whitespace-nowrap py-2.5 text-right font-mono text-[12px]", r.need === "Required" ? (dark ? "text-paper" : "text-forest") : dark ? "text-mineral-light" : "text-mineral-ink")}>
                {r.need === "Required" ? "● Required" : "○ Helpful"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One use case, laid out in one of three editorial arrangements so the page does not repeat itself. */
export function UseCaseSection({ index, uc, d, variant, video }: Props) {
  const num = String(index + 1).padStart(2, "0");
  const header = (
    <header className="max-w-measure">
      <p className="kicker">
        <span className="num">{num}</span>
        {uc.buildingTypes.join(" · ")}
      </p>
      <h2 id={`${uc.slug}-h`} className="h-section mt-4">
        {uc.title}
      </h2>
      <p className={cn("mt-5 font-serif text-[1.4rem] leading-snug", variant === "ink" ? "text-paper" : "text-forest")}>{d.statement}</p>
    </header>
  );

  const context = (
    <div className="space-y-4">
      {d.context.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );

  if (variant === "ink") {
    return (
      <section id={uc.slug} aria-labelledby={`${uc.slug}-h`} className="on-ink my-8 scroll-mt-28 bg-ink px-5 py-16 text-stone sm:px-10">
        {header}
        <div className="mt-12 grid gap-10 xl:grid-cols-2">
          <MediaFrame id={uc.image} compact />
          <div className="text-stone">{context}</div>
        </div>
        <div className="mt-12">
          <Diagram d={d} dark />
        </div>
        <div className="mt-12 grid gap-10 xl:grid-cols-2 [&_li]:border-paper/10 [&_table]:border-paper/15 [&_tr]:border-paper/10 [&_ul]:border-paper/15 [&_ol]:border-paper/15 [&_td]:text-stone">
          <ListBlock title="Operational constraints" items={d.constraints} dark />
          <Workflow steps={d.workflow} dark />
          <ListBlock title="Questions an operator would ask" items={d.questions} marker="q" dark />
          <div className="space-y-10">
            <DataNeeded data={d.data} dark />
            <ListBlock title="What GridSync does not assume" items={d.notAssume} marker="no" dark />
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section id={uc.slug} aria-labelledby={`${uc.slug}-h`} className="scroll-mt-28 border-t border-forest/15 py-16">
        {header}
        <div className="mt-12 grid gap-10 xl:grid-cols-12">
          <div className="text-forest/85 xl:col-span-5">{context}</div>
          <div className="xl:col-span-7">
            <Diagram d={d} />
          </div>
        </div>
        <MediaFrame id={uc.image} className="mt-12" />
        <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          <ListBlock title="Operational constraints" items={d.constraints} />
          <ListBlock title="Questions an operator would ask" items={d.questions} marker="q" />
          <ListBlock title="What GridSync does not assume" items={d.notAssume} marker="no" />
        </div>
        <div className="mt-12 grid gap-10 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <Workflow steps={d.workflow} />
            {video && <VideoLoop id={video} className="mt-10" />}
          </div>
          <div className="xl:col-span-5">
            <DataNeeded data={d.data} />
          </div>
        </div>
      </section>
    );
  }

  // plate
  return (
    <section id={uc.slug} aria-labelledby={`${uc.slug}-h`} className="scroll-mt-28 border-t border-forest/15 py-16">
      <div className="grid gap-10 xl:grid-cols-12">
        <div className="xl:col-span-5">
          {header}
          <div className="mt-8 text-forest/85">{context}</div>
        </div>
        <div className="xl:col-span-7">
          <MediaFrame id={uc.image} />
        </div>
      </div>
      <div className="mt-12 grid gap-10 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <Diagram d={d} />
        </div>
        <div className="xl:col-span-5">
          <ListBlock title="Operational constraints" items={d.constraints} />
        </div>
      </div>
      <div className="mt-12 grid gap-10 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <Workflow steps={d.workflow} />
        </div>
        <div className="space-y-10 xl:col-span-5">
          <ListBlock title="Questions an operator would ask" items={d.questions} marker="q" />
        </div>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <DataNeeded data={d.data} />
        <ListBlock title="What GridSync does not assume" items={d.notAssume} marker="no" />
      </div>
    </section>
  );
}
