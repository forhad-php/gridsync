"use client";

import { useEffect, useRef, useState } from "react";
import { findAudio } from "@/content/media-plan";
import { cn } from "@/lib/cn";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Optional narrated audio with the transcript always visible beside it. Never autoplays.
 * Until a recording exists (`src` missing), the controls are disabled and the brief is shown.
 */
export function AudioNote({ id, className, stacked }: { id: string; className?: string; /** Single column, for narrow article measures. */ stacked?: boolean }) {
  const brief = findAudio(id);
  if (!brief) throw new Error(`Unknown audio brief ${id}`);
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const available = Boolean(brief.src);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTime = () => setTime(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnd = () => setPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

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
    <section aria-label={`Audio: ${brief.title}`} className={cn("grid gap-8 border-y border-forest/15 py-8", !stacked && "md:grid-cols-12", className)}>
      <div className={cn(!stacked && "md:col-span-5")}>
        <p className="label">Listen · optional · {brief.duration.replace("About ", "about ")}</p>
        <h3 className="h-sub mt-3">{brief.title}</h3>
        {brief.src && <audio ref={ref} src={brief.src} preload="none" />}
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            disabled={!available}
            aria-pressed={playing}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest/40 text-forest transition-colors hover:border-forest disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="sr-only">{playing ? "Pause" : "Play"} {brief.title}</span>
            {playing ? (
              <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 fill-current" aria-hidden><path d="M2 1h3v10H2zM7 1h3v10H7z" /></svg>
            ) : (
              <svg viewBox="0 0 12 12" className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden><path d="M2 1l9 5-9 5z" /></svg>
            )}
          </button>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={time}
              disabled={!available}
              onChange={(e) => {
                if (ref.current) ref.current.currentTime = Number(e.target.value);
              }}
              aria-label="Seek"
              aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
              className="w-full accent-[#9A5530] disabled:opacity-40"
            />
            <p className="mt-1 font-mono text-[12px] text-mineral-ink tabular">
              {available ? `${fmt(time)} / ${fmt(duration)}` : "Recording not yet produced — transcript shows the approved script."}
            </p>
          </div>
        </div>
        {!available && (
          <dl className="mt-6 space-y-2 text-[14px] text-mineral-ink">
            <div>
              <dt className="label inline">Narrator · </dt>
              <dd className="inline">{brief.narrator}</dd>
            </div>
            <div>
              <dt className="label inline">Ambient · </dt>
              <dd className="inline">{brief.ambient}</dd>
            </div>
          </dl>
        )}
      </div>
      <div className={cn(!stacked && "md:col-span-6 md:col-start-7")}>
        <h4 className="label">Transcript</h4>
        <div className="mt-4 space-y-4 font-serif text-[1.15rem] leading-relaxed text-forest">
          {brief.transcript.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
