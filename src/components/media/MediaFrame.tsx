import Image from "next/image";
import { findImage, type ImageBrief } from "@/content/media-plan";
import { cn } from "@/lib/cn";
import { Sketch } from "./Sketch";

type Props = {
  /** Image brief id from content/media-plan.ts, e.g. "IMG-01". */
  id: string;
  className?: string;
  /** Override the brief's aspect ratio for this placement. */
  aspect?: ImageBrief["aspect"];
  priority?: boolean;
  sizes?: string;
  /** Visible caption under the frame. Defaults to none. */
  caption?: React.ReactNode;
  /** Hide the production-brief disclosure (e.g. very small placements). */
  compact?: boolean;
  children?: React.ReactNode;
};

const aspectClass: Record<ImageBrief["aspect"], string> = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "21/9": "aspect-[21/9]",
  "1/1": "aspect-square",
};

/**
 * Photograph slot. Renders the real image when the brief has `src`; otherwise a clearly
 * labelled placeholder carrying the production brief. `children` are overlaid (annotations).
 */
export function MediaFrame({ id, className, aspect, priority, sizes = "(min-width: 1024px) 50vw, 100vw", caption, compact, children }: Props) {
  const brief = findImage(id);
  if (!brief) throw new Error(`Unknown image brief ${id}`);
  const ratio = aspectClass[aspect ?? brief.aspect];

  return (
    <figure className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden bg-stone", ratio)}>
        {brief.src ? (
          <Image src={brief.src} alt={brief.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        ) : (
          <div role="img" aria-label={`Photograph placeholder: ${brief.alt}`} className="drafting absolute inset-0">
            <Sketch kind={brief.sketch} />
            <p className="absolute left-4 top-4 bg-paper-white/90 px-2 py-1 font-mono text-[11px] text-mineral-ink">
              {brief.id} · Photograph to be commissioned
            </p>
          </div>
        )}
        {children}
      </div>
      {!brief.src && !compact && (
        <details className="group border-x border-b border-forest/15 bg-paper-white/60 px-4 py-2.5 text-[13.5px]">
          <summary className="cursor-pointer list-none font-mono text-[11.5px] text-mineral-ink marker:hidden hover:text-forest">
            <span aria-hidden className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
            Production brief — {brief.subject.split(",")[0].replace(/\.$/, "")}
          </summary>
          <dl className="mt-3 grid gap-x-6 gap-y-2 pb-1 sm:grid-cols-[7rem_1fr]">
            <dt className="label">Subject</dt>
            <dd>{brief.subject}</dd>
            <dt className="label">Framing</dt>
            <dd>{brief.framing}</dd>
            <dt className="label">Lighting</dt>
            <dd>{brief.lighting}</dd>
            <dt className="label">Alt text</dt>
            <dd>{brief.alt}</dd>
          </dl>
        </details>
      )}
      {caption && <figcaption className="mt-3 text-[14px] text-mineral-ink">{caption}</figcaption>}
    </figure>
  );
}
