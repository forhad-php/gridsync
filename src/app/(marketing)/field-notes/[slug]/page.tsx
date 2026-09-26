import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fieldNotes, findNote, formatDate } from "@/content/field-notes";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MediaFrame } from "@/components/media/MediaFrame";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/accessibility/JsonLd";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return fieldNotes.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const note = findNote(params.slug);
  if (!note) return {};
  return pageMetadata({ title: note.title, description: note.dek, path: `/field-notes/${note.slug}`, type: "article" });
}

export default async function FieldNotePage({ params }: Params) {
  const note = findNote(params.slug);
  if (!note) notFound();

  // Relative path keeps the import inside webpack's static analysis; bodies live in /content/field-notes.
  const { default: Body } = await import(`../../../../../content/field-notes/${note.slug}.mdx`);

  const related = fieldNotes
    .filter((n) => n.slug !== note.slug)
    .map((n) => ({
      n,
      score: (n.category === note.category ? 2 : 0) + n.buildingTypes.filter((t) => note.buildingTypes.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.n);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.dek,
    datePublished: note.date,
    dateModified: note.date,
    author: { "@type": "Organization", name: note.author, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/field-notes/${note.slug}`,
    articleSection: note.category,
    inLanguage: "en-GB",
  };

  return (
    <>
      <article>
        <header className="border-b border-forest/15">
          <div className="container pb-12 pt-10 sm:pt-12">
            <Breadcrumbs
              trail={[
                { name: "Field notes", path: "/field-notes" },
                { name: note.title, path: `/field-notes/${note.slug}` },
              ]}
            />
            <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <p className="kicker">
                  <span className="num">Field note</span>
                  {note.category}
                </p>
                <h1 className="h-display mt-6 !text-[clamp(2.4rem,3.8vw+0.6rem,4.25rem)]">{note.title}</h1>
                <p className="mt-8 max-w-prose font-serif text-[1.35rem] leading-[1.45] text-forest/90 sm:text-[1.5rem]">{note.dek}</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-end border-t border-forest/15 pt-5 text-[15px] lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
                <div>
                  <dt className="label">Written by</dt>
                  <dd className="mt-1 text-forest">{note.author}</dd>
                </div>
                <div>
                  <dt className="label">Published</dt>
                  <dd className="mt-1 text-forest">
                    <time dateTime={note.date}>{formatDate(note.date)}</time>
                  </dd>
                </div>
                <div>
                  <dt className="label">Reading time</dt>
                  <dd className="mt-1 text-forest">{note.readingTime}</dd>
                </div>
                <div>
                  <dt className="label">Relevant to</dt>
                  <dd className="mt-1 text-forest">{note.buildingTypes.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="container pt-10">
          <MediaFrame id={note.heroImage} aspect="21/9" priority sizes="(min-width: 1320px) 1224px, 100vw" />
        </div>

        <div className="container grid gap-10 pb-24 pt-8 lg:grid-cols-12 lg:gap-10">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 border-t border-forest/15 pt-5">
              <p className="label">Field notes</p>
              <p className="mt-3 text-[15px] leading-relaxed text-mineral-ink">
                Written by the GridSync editorial team for facility and energy teams. Examples are illustrative unless stated
                otherwise.
              </p>
              <Link href="/field-notes" className="btn-text mt-6 !text-[14px]">
                All field notes
              </Link>
            </div>
          </aside>
          <div className="min-w-0 max-w-prose lg:col-span-7 lg:col-start-5 [&>section:first-child]:mt-8">
            <Body />
          </div>
        </div>
      </article>

      <section aria-labelledby="related-heading" className="border-t border-forest/15 py-20">
        <div className="container">
          <h2 id="related-heading" className="h-sub">
            Related notes
          </h2>
          <ul className="mt-10 grid gap-10 border-t border-forest/15 pt-8 md:grid-cols-3 md:gap-8">
            {related.map((r) => (
              <li key={r.slug}>
                <p className="label">
                  {r.category} · {r.readingTime}
                </p>
                <h3 className="mt-3 text-[1.25rem] font-medium leading-snug text-forest">
                  <Link href={`/field-notes/${r.slug}`} className="hover:text-copper-ink">
                    {r.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[15.5px] text-forest/80">{r.dek}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={articleLd} />
    </>
  );
}
