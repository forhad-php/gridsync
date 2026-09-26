"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FieldAnnotation } from "./FieldAnnotation";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

/**
 * Hero video frame for GridSync: high-definition looping footage of commercial building
 * infrastructure responding to peak grid event conditions, integrated directly with the
 * live operational telemetry field report.
 */
export function HeroVideoFrame({ className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: "250px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !near) return;

    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      setIsPlaying(false);
      return;
    }

    const p = el.play();
    if (p !== undefined) {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
    return () => el.pause();
  }, [near, reduce]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <figure className={cn("relative flex flex-col", className)}>
      <div className="relative overflow-hidden bg-stone aspect-[4/5] border border-forest/20 shadow-sm">
        {/* Drafting background grid */}
        <div className="drafting pointer-events-none absolute inset-0 opacity-20" aria-hidden />

        {/* Responsive smart building video loop */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-building-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="Commercial building tower with active responsive facade and zone illumination during peak demand window"
        >
          {near && (
            <>
              <source src="/videos/hero-building-loop.mp4" type="video/mp4" />
              <source src="/videos/hero-building-loop.webm" type="video/webm" />
            </>
          )}
        </video>

        {/* Live telemetry badge header */}
        <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 border border-forest/25 bg-paper-white/95 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-forest backdrop-blur-sm shadow-xs">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
            </span>
            LIVE SITE FEED · VID-01
          </span>
          <span className="hidden sm:inline-block border border-forest/20 bg-paper-white/85 px-2 py-1 font-mono text-[11px] text-mineral-ink backdrop-blur-sm">
            16:00–18:00 Peak Window
          </span>
        </div>

        {/* Play/Pause control */}
        <button
          type="button"
          onClick={togglePlay}
          className="absolute right-4 top-4 z-10 border border-forest/25 bg-paper-white/90 px-2.5 py-1 font-mono text-[11.5px] text-forest backdrop-blur-sm transition-colors hover:bg-forest hover:text-paper focus-visible:outline-2"
          aria-label={isPlaying ? "Pause video loop" : "Play video loop"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Gradient vignette for contrast protection behind overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink/35 via-ink/10 to-transparent"
        />

        {/* Operational field annotation with leader line */}
        <FieldAnnotation />
      </div>

      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-[12px] text-mineral-ink">
        <span>VID-01 · Riverside Office Campus · Active load modulation during evening grid peak.</span>
        <span className="hidden sm:inline">Austin, TX · 1,240 kW baseline</span>
      </figcaption>
    </figure>
  );
}
