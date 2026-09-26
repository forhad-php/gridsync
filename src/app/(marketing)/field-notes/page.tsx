import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { fieldNotes, formatDate } from "@/content/field-notes";
import { PageHeader } from "@/components/ui/PageHeader";
import { MediaFrame } from "@/components/media/MediaFrame";
import { CtaBand } from "@/components/ui/CtaBand";
import { NoteFilter } from "@/components/field-notes/NoteFilter";

export const metadata = pageMetadata({
  title: "Field notes",
  description:
    "Practical notes on building systems, grid flexibility, measurement and data quality, written for facility and energy teams.",
  path: "/field-notes",
});

export default function FieldNotesPage() {
  const [featured, ...rest] = fieldNotes;
  const thumbs = Object.fromEntries(fieldNotes.map((n) => [n.slug, <MediaFrame key={n.slug} id={n.heroImage} aspect="4/3" compact sizes="176px" />]));

  return (
    <>
      <PageHeader
        trail={[{ name: "Field notes", path: "/field-notes" }]}
        kicker="Field notes"
        title="Notes from the plant room and the meter."
        intro={
          <p>
            Short, practical writing about how buildings actually behave when energy conditions change—comfort boundaries,
            controllable load, data quality, and what it takes to explain an event afterwards.
          </p>
        }
      />

      {/* Featured */}
      <section aria-labelledby="featured-heading" className="border-b border-forest/15">
        <div className="container grid gap-10 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-7">
            <Link href={`/field-notes/${featured.slug}`} aria-hidden tabIndex={-1} className="block">
              <MediaFrame id={featured.heroImage} aspect="16/9" compact sizes="(min-width: 1024px) 55vw, 100vw" />
            </Link>
          </div>
          <div className="flex flex-col lg:col-span-4 lg:col-start-9">
            <p className="kicker">
              <span className="num">Featured</span>
              {featured.category}
            </p>
            <h2 id="featured-heading" className="h-sub mt-5 !text-[clamp(1.75rem,1.6vw+1rem,2.5rem)] !leading-[1.1]">
              <Link href={`/field-notes/${featured.slug}`} className="hover:text-copper-ink">
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 font-serif text-[1.25rem] leading-snug text-forest/90">{featured.dek}</p>
            <p className="label mt-6">
              {featured.author} · {formatDate(featured.date)} · {featured.readingTime}
            </p>
            <Link href={`/field-notes/${featured.slug}`} className="btn-text mt-8 self-start">
              Read the note
            </Link>
          </div>
        </div>
      </section>

      {/* Filterable index */}
      <section aria-labelledby="index-heading" className="py-20 sm:py-24">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="index-heading" className="h-section">
              All notes
            </h2>
            <p className="muted max-w-md text-[15px]">
              Filter by the kind of building you operate or by topic. {rest.length + 1} notes so far; more are in preparation.
            </p>
          </div>
          <NoteFilter notes={fieldNotes} thumbs={thumbs} />
        </div>
      </section>

      <CtaBand
        title="Have a question we should write about?"
        body="Tell us what you are trying to understand about your building's flexibility. Useful questions often become field notes."
        primary={{ label: "Discuss a building", href: "/contact" }}
        secondary={{ label: "See how it works", href: "/how-it-works" }}
      />
    </>
  );
}
