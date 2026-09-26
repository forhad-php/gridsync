import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { audio, diagrams, images, videos } from "@/content/media-plan";

export const metadata = pageMetadata({
  title: "Brand and media plan",
  description: "GridSync logo files, usage rules, colour and type system, and the production plan for photography, video, audio and diagrams.",
  path: "/brand",
  noindex: true,
});

const files = [
  { name: "Mark", file: "gridsync-mark.svg", use: "Favicons, equipment labels, tight spaces" },
  { name: "Logo", file: "gridsync-logo.svg", use: "Default lock-up, ink on paper" },
  { name: "Logo, monochrome", file: "gridsync-logo-mono.svg", use: "Single-colour print, engraving, workwear" },
  { name: "Logo, reverse", file: "gridsync-logo-reverse.svg", use: "Paper on ink backgrounds" },
  { name: "App icon", file: "gridsync-app-icon.svg", use: "512 px, rounded square" },
  { name: "Social profile mark", file: "gridsync-social.svg", use: "400 × 400 px, circular crops safe" },
];

const palette = [
  { name: "Deep ink", hex: "#17221F", use: "Navigation, footer, dark sections", note: "Paper on ink 14.4:1" },
  { name: "Charcoal green", hex: "#24332E", use: "Headings, structural blocks", note: "On paper 11.6:1" },
  { name: "Mineral grey", hex: "#66716C", use: "Rules, large secondary text", note: "4.45:1 on paper — use #56615C (5.7:1) for small text" },
  { name: "Warm paper", hex: "#F3F0E8", use: "Primary background", note: "—" },
  { name: "Soft stone", hex: "#DAD8CF", use: "Media surfaces, secondary fills", note: "—" },
  { name: "Copper", hex: "#B96F45", use: "Actions, active states, highlights", note: "3.4:1 on paper — use #9A5530 (5.0:1) for text and buttons" },
  { name: "Muted moss", hex: "#788F72", use: "Environmental and operating status", note: "3.1:1 on paper — use #556B50 (5.1:1) for text" },
  { name: "Pale sage", hex: "#C7D2C0", use: "Quiet fills, selection", note: "—" },
  { name: "Signal yellow", hex: "#D9B84C", use: "Warnings, grid events, constrained capacity", note: "Fill only on paper — use #7A5C0C (5.5:1) for text; 8.5:1 on ink" },
  { name: "White", hex: "#FCFBF7", use: "Raised paper, form fields", note: "—" },
];

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <>
      <dt className="label pt-0.5">{k}</dt>
      <dd className="text-[15px] text-forest/90">{v}</dd>
    </>
  );
}

export default function BrandPage() {
  return (
    <>
      <section className="border-b border-forest/15">
        <div className="container pb-14 pt-10 sm:pt-12">
          <Breadcrumbs trail={[{ name: "Brand and media plan", path: "/brand" }]} />
          <div className="mt-14 max-w-[52rem] lg:mt-20">
            <p className="kicker">Internal reference · not indexed</p>
            <h1 className="h-display mt-6">Brand and media plan.</h1>
            <p className="mt-8 max-w-prose font-serif text-[1.3rem] leading-[1.5] text-forest/90">
              Logo files and rules, the colour and type system, and the production brief for every photograph, video, audio piece and
              diagram on GridSync.build.
            </p>
          </div>
        </div>
      </section>

      {/* Logo */}
      <section className="container py-20" aria-labelledby="logo-h">
        <h2 id="logo-h" className="h-section">Logo</h2>
        <p className="lead mt-5 max-w-prose">
          Two offset horizontal lines held by one vertical alignment line: floors, load moving in time, and the grid that keeps them
          in step. No lightning, leaves, globes or arrows.
        </p>

        <div className="mt-12 grid gap-px border border-forest/15 bg-forest/15 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex aspect-[4/3] items-center justify-center bg-paper text-ink">
            <Mark className="h-24 w-24" title="GridSync mark" />
          </div>
          <div className="flex aspect-[4/3] items-center justify-center bg-paper text-ink">
            <Wordmark className="text-[26px]" />
          </div>
          <div className="flex aspect-[4/3] items-center justify-center bg-white text-black">
            <Wordmark className="text-[26px]" />
          </div>
          <div className="flex aspect-[4/3] items-center justify-center bg-ink text-paper">
            <Wordmark suffix className="text-[26px]" />
          </div>
        </div>
        <p className="mt-3 font-mono text-[12px] text-mineral-ink">Mark · lock-up on paper · monochrome · reverse on ink with .build suffix</p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3 className="h-sub">Clear space</h3>
            <p className="mt-3 text-forest/85">
              Keep clear space equal to <em>x</em> on every side, where <em>x</em> is the offset between the two horizontal lines—one
              quarter of the mark’s height. Nothing else may enter this area.
            </p>
            <figure className="drafting mt-8 border border-forest/15 bg-paper-white/50 p-8">
              <svg viewBox="0 0 320 124" className="h-auto w-full" role="img" aria-label="Diagram: the logo with a clear-space margin of x on all sides, where x equals the offset between the two horizontal lines, one quarter of the mark's 24-unit grid.">
                <rect x="42.5" y="36.7" width="243.5" height="66.6" fill="none" stroke="#B96F45" strokeDasharray="4 4" />
                <g transform="translate(55 45) scale(2.0833)" fill="none" stroke="#17221F" strokeWidth="2.5" strokeLinecap="square">
                  <path d="M8 3.25v17.5" />
                  <path d="M3.25 9h12.5" />
                  <path d="M8 15h12.75" />
                </g>
                <text x="118" y="84" fill="#17221F" fontSize="36" fontWeight="600" letterSpacing="-1.2" fontFamily="var(--font-sans)">
                  GridSync
                </text>
                <path d="M42.5 112h12.5M42.5 108v8M55 108v8" stroke="#9A5530" />
                <text x="45" y="123" fontSize="9" fill="#9A5530" fontFamily="var(--font-mono)">x</text>
                <path d="M30 36.7v12.5M26 36.7h8M26 49.2h8" stroke="#9A5530" />
                <text x="18" y="46" fontSize="9" fill="#9A5530" fontFamily="var(--font-mono)">x</text>
              </svg>
            </figure>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="h-sub">Minimum size</h3>
            <table className="mt-5 w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-forest/30">
                  <th className="label pb-2 font-normal">Asset</th>
                  <th className="label pb-2 font-normal">Digital</th>
                  <th className="label pb-2 font-normal">Print</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                <tr>
                  <td className="py-3">Mark</td>
                  <td>16 px</td>
                  <td>6 mm</td>
                </tr>
                <tr>
                  <td className="py-3">Lock-up</td>
                  <td>96 px wide</td>
                  <td>24 mm wide</td>
                </tr>
                <tr>
                  <td className="py-3">Lock-up with .build</td>
                  <td>140 px wide</td>
                  <td>35 mm wide</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-6 flex items-end gap-6 text-ink">
              <Mark className="h-4 w-4" />
              <Mark className="h-6 w-6" />
              <Mark className="h-8 w-8" />
              <span className="font-mono text-[12px] text-mineral-ink">16 · 24 · 32 px</span>
            </div>
            <h3 className="h-sub mt-12">Files</h3>
            <ul className="mt-4 divide-y divide-forest/10 border-y border-forest/10">
              {files.map((f) => (
                <li key={f.file} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-[15px]">
                  <span>
                    <span className="font-medium text-forest">{f.name}</span>
                    <span className="ml-2 text-mineral-ink">{f.use}</span>
                  </span>
                  <a className="link font-mono text-[13px]" href={`/brand/${f.file}`} download>
                    {f.file}
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap items-baseline justify-between gap-x-4 py-3 text-[15px]">
                <span>
                  <span className="font-medium text-forest">Favicon</span>
                  <span className="ml-2 text-mineral-ink">Ink tile with paper mark</span>
                </span>
                <a className="link font-mono text-[13px]" href="/icon.svg" download>
                  icon.svg
                </a>
              </li>
            </ul>
            <p className="mt-3 text-[14px] text-mineral-ink">Lock-up SVGs use live IBM Plex Sans text. Outline the text in the production master files.</p>
          </div>
        </div>
      </section>

      {/* Colour */}
      <section className="border-t border-forest/15 py-20" aria-labelledby="colour-h">
        <div className="container">
          <h2 id="colour-h" className="h-section">Colour</h2>
          <p className="lead mt-5 max-w-prose">
            Warm, restrained, and used with intent. Where a brand colour is too light for small text, a darker ink variant is used so
            text meets WCAG AA.
          </p>
          <ul className="mt-12 grid gap-px border border-forest/15 bg-forest/15 sm:grid-cols-2 lg:grid-cols-5">
            {palette.map((c) => (
              <li key={c.hex} className="bg-paper">
                <div className="h-24 border-b border-forest/15" style={{ background: c.hex }} aria-hidden />
                <div className="p-4">
                  <p className="font-medium text-forest">{c.name}</p>
                  <p className="font-mono text-[12px] text-mineral-ink">{c.hex}</p>
                  <p className="mt-2 text-[14px] text-forest/85">{c.use}</p>
                  <p className="mt-2 text-[13px] text-mineral-ink">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Type */}
      <section className="border-t border-forest/15 py-20" aria-labelledby="type-h">
        <div className="container grid gap-12 lg:grid-cols-12">
          <h2 id="type-h" className="h-section lg:col-span-4">Type</h2>
          <dl className="divide-y divide-forest/15 border-y border-forest/15 lg:col-span-8">
            <div className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr]">
              <dt className="label">IBM Plex Sans · display & body</dt>
              <dd className="text-[2.5rem] font-medium leading-tight tracking-[-0.02em] text-forest">Coordinate building operations with the grid.</dd>
            </div>
            <div className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr]">
              <dt className="label">Newsreader · editorial</dt>
              <dd className="font-serif text-[1.9rem] leading-snug text-forest">A calmer way to manage changing energy conditions.</dd>
            </div>
            <div className="grid gap-4 py-8 sm:grid-cols-[12rem_1fr]">
              <dt className="label">IBM Plex Mono · technical</dt>
              <dd className="font-mono text-[14px] text-forest">AHU-2 · 16:00–18:00 · zone 22.4 °C · awaiting review</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Media plan */}
      <section className="on-ink bg-ink py-20" aria-labelledby="media-h">
        <div className="container">
          <h2 id="media-h" className="h-section">Media plan</h2>
          <p className="lead mt-5 max-w-prose">
            Documentary, natural light, real textures, muted colour. No stock executives, floating dashboards, lens flares or fake
            text on equipment. Until real media is supplied, the site shows labelled placeholders carrying these briefs.
          </p>
          <p className="mt-4 font-mono text-[12px] text-mineral-light">
            {images.length} images · {videos.length} videos · {audio.length} audio pieces · {diagrams.length} diagrams — source: content/media-plan.ts
          </p>
        </div>
      </section>

      <section className="container py-16" aria-labelledby="img-h">
        <h3 id="img-h" className="h-sub">Photography briefs</h3>
        <ol className="mt-8 grid gap-x-10 lg:grid-cols-2">
          {images.map((b) => (
            <li key={b.id} className="border-t border-forest/15 py-8">
              <p className="font-mono text-[13px] text-copper-ink">
                {b.id} · {b.aspect.replace("/", ":")}
              </p>
              <p className="mt-2 font-medium text-forest">{b.page}</p>
              <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2">
                <Row k="Subject" v={b.subject} />
                <Row k="Framing" v={b.framing} />
                <Row k="Lighting" v={b.lighting} />
                <Row k="Colour" v={b.colour} />
                <Row k="Alt text" v={b.alt} />
                <Row k="Status" v={b.src ? "Supplied" : "To be commissioned"} />
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-forest/15 bg-paper-white/50 py-16" aria-labelledby="vid-h">
        <div className="container">
          <h3 id="vid-h" className="h-sub">Video briefs</h3>
          <p className="mt-2 text-[15px] text-mineral-ink">All loops: silent, muted, lazy-loaded, poster image required, paused for reduced-motion users.</p>
          <ol className="mt-8 grid gap-x-10 lg:grid-cols-2">
            {videos.map((b) => (
              <li key={b.id} className="border-t border-forest/15 py-8">
                <p className="font-mono text-[13px] text-copper-ink">
                  {b.id} · {b.duration}
                </p>
                <p className="mt-2 font-medium text-forest">{b.page}</p>
                <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2">
                  <Row k="Scene" v={b.scene} />
                  <Row k="Camera" v={b.camera} />
                  <Row k="Sound" v={b.sound} />
                  <Row k="Poster" v={b.poster} />
                  <Row k="Caption" v={b.caption} />
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-16" aria-labelledby="aud-h">
        <h3 id="aud-h" className="h-sub">Audio briefs</h3>
        <p className="mt-2 text-[15px] text-mineral-ink">Optional only. No background music, no synthetic voices, never autoplay, transcript always shown.</p>
        <ol className="mt-8 space-y-0">
          {audio.map((b) => (
            <li key={b.id} className="grid gap-6 border-t border-forest/15 py-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[13px] text-copper-ink">
                  {b.id} · {b.duration}
                </p>
                <p className="mt-2 font-medium text-forest">{b.title}</p>
                <p className="text-[15px] text-mineral-ink">{b.page}</p>
                <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-2">
                  <Row k="Narrator" v={b.narrator} />
                  <Row k="Topic" v={b.topic} />
                  <Row k="Transcript" v={b.transcriptRequirement} />
                  <Row k="Ambient" v={b.ambient} />
                </dl>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="label">Script</p>
                <div className="mt-3 space-y-3 font-serif text-[1.1rem] leading-relaxed text-forest">
                  {b.transcript.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-forest/15 bg-paper-white/50 py-16" aria-labelledby="dgm-h">
        <div className="container">
          <h3 id="dgm-h" className="h-sub">Diagram briefs</h3>
          <p className="mt-2 text-[15px] text-mineral-ink">All diagrams are inline SVG in the site’s drawing language: thin ink lines, copper for the active path, mono labels.</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[56rem] text-left text-[14px]">
              <thead>
                <tr className="border-b border-forest/30">
                  {["ID", "Diagram", "Inputs", "Outputs", "Labels", "Interaction", "Mobile fallback"].map((h) => (
                    <th key={h} scope="col" className="label pb-3 pr-4 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10 align-top">
                {diagrams.map((d) => (
                  <tr key={d.id}>
                    <td className="py-4 pr-4 font-mono text-[13px] text-copper-ink">{d.id}</td>
                    <th scope="row" className="py-4 pr-4 font-medium text-forest">
                      {d.title}
                      <span className="mt-1 block text-[13px] font-normal text-mineral-ink">{d.page}</span>
                    </th>
                    <td className="py-4 pr-4">{d.inputs.join(", ")}</td>
                    <td className="py-4 pr-4">{d.outputs.join(", ")}</td>
                    <td className="py-4 pr-4">{d.labels.join(", ")}</td>
                    <td className="py-4 pr-4">{d.interaction}</td>
                    <td className="py-4">{d.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
