import { Breadcrumbs } from "../navigation/Breadcrumbs";
import { ReplaceMarker } from "../ui/Status";

type Section = { id: string; title: string; body: React.ReactNode };

type Props = {
  path: string;
  crumb: string;
  title: string;
  intro: React.ReactNode;
  updated: string;
  sections: Section[];
  /** Show the "review with counsel" marker. */
  draft?: boolean;
};

/** Plain, readable policy page: contents list on the left, numbered sections on the right. */
export function LegalPage({ path, crumb, title, intro, updated, sections, draft = true }: Props) {
  return (
    <>
      <section className="border-b border-forest/15">
        <div className="container pb-14 pt-10 sm:pt-12">
          <Breadcrumbs trail={[{ name: crumb, path }]} />
          <div className="mt-14 max-w-[52rem] lg:mt-20">
            <p className="kicker">Policy · last updated {updated}</p>
            <h1 className="h-display mt-6">{title}</h1>
            <div className="mt-8 max-w-prose font-serif text-[1.3rem] leading-[1.5] text-forest/90">{intro}</div>
            {draft && <ReplaceMarker className="mt-8">Review with legal counsel before publication</ReplaceMarker>}
          </div>
        </div>
      </section>
      <div className="container grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <h2 className="label">On this page</h2>
            <ol className="mt-4 space-y-2 text-[15px]">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="font-mono text-[12px] text-mineral-ink">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${s.id}`} className="text-forest hover:text-copper-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="max-w-prose lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="border-t border-forest/15 py-10 first:border-t-0 first:pt-0">
              <p className="font-mono text-[12px] text-copper-ink">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.id}-h`} className="h-sub mt-2">
                {s.title}
              </h2>
              <div className="mt-5 space-y-4 text-forest/90 [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
