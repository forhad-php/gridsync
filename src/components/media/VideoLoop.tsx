"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { findVideo, type ImageBrief } from "@/content/media-plan";
import { cn } from "@/lib/cn";
import { Sketch } from "./Sketch";

const aspectClass: Record<ImageBrief["aspect"], string> = {
  "4/5": "aspect-[4/5]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "21/9": "aspect-[21/9]",
  "1/1": "aspect-square",
};

/**
 * Silent looping video. Loads only when near the viewport, never plays sound, shows the poster
 * and a play control instead of autoplaying when the visitor prefers reduced motion or saves data.
 * Without `src` it renders a labelled placeholder with the video brief.
 */
export function VideoLoop({ id, className }: { id: string; className?: string }) {
  const brief = findVideo(id);
  if (!brief) throw new Error(`Unknown video brief ${id}`);
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !brief.src) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [brief.src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !near) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => el.pause();
  }, [near, reduce]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true));
    else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden bg-stone", aspectClass[brief.aspect])}>
        {brief.src ? (
          <>
            <video
              ref={ref}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="none"
              poster={brief.posterSrc}
              aria-label={brief.caption}
            >
              {near && <source src={brief.src} type="video/mp4" />}
              {brief.captionsSrc && <track kind="captions" src={brief.captionsSrc} srcLang="en" label="English" default />}
            </video>
            <button
              type="button"
              onClick={toggle}
              className="absolute bottom-3 right-3 bg-ink/80 px-3 py-1.5 font-mono text-[12px] text-paper hover:bg-ink"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? "Pause" : "Play"}
            </button>
          </>
        ) : (
          <div role="img" aria-label={`Video placeholder: ${brief.caption}`} className="drafting absolute inset-0">
            <Sketch kind={brief.sketch} />
            <p className="absolute left-4 top-4 bg-paper-white/90 px-2 py-1 font-mono text-[11px] text-mineral-ink">
              {brief.id} · Silent loop, {brief.duration} · to be filmed
            </p>
            <span aria-hidden className="absolute bottom-4 right-4 inline-flex h-9 w-9 items-center justify-center border border-forest/40 bg-paper-white/80">
              <svg viewBox="0 0 10 10" className="h-3 w-3 fill-forest/70"><path d="M2 1l7 4-7 4z" /></svg>
            </span>
          </div>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[14px] text-mineral-ink">
        <span>{brief.caption}</span>
        {!brief.src && (
          <span className="font-mono text-[11.5px]">
            Camera: {brief.camera.replace(/\.$/, "")} · Poster: {brief.poster.replace(/\.$/, "")}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
