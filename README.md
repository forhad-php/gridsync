# GridSync.build

Website for **GridSync** — grid-interactive building operations.
*Buildings that respond without disruption.*

An editorial, multi-page site: fourteen public routes, MDX field notes, custom SVG diagrams, and a media system that shows clearly labelled placeholders until real photography, video and audio are produced.

## Stack

- Next.js 14 (App Router, static generation), TypeScript
- Tailwind CSS with a custom token set (`tailwind.config.ts`)
- Framer Motion, used only for comprehension (reveals, line drawing, timeline state), with the reduced-motion preference respected globally
- Recharts for the flexibility boundary chart (lazy-loaded); every other diagram is hand-drawn inline SVG
- React Hook Form + Zod on the contact form, with the same schema used by the API route
- MDX (`@next/mdx`) for field notes
- IBM Plex Sans, Newsreader and IBM Plex Mono via `next/font`, self-hosted with no layout shift

## Scripts

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the build
npm run lint
npm run typecheck
```

Requires Node 18.17 or newer (tested on Node 22).

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, robots and structured data. Defaults to `https://gridsync.build`. |
| `CONTACT_WEBHOOK_URL` | Contact submissions are POSTed here as JSON (CRM intake, Slack, Zapier, Make…). **If it is not set, submissions are validated and logged but not stored.** |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: hero field report, operational reality, Observe/Forecast/Coordinate/Verify, building vs battery, system explorer, outcomes, field note, CTA |
| `/platform` | Six capabilities, each with a diagram, example, technical note and "what operators see" |
| `/how-it-works` | Five-stage scroll narrative with a sticky building cross-section; "what GridSync does not do"; optional narrated audio |
| `/systems` | HVAC, lighting, EV charging, refrigeration, batteries, metering |
| `/use-cases` | Six operating contexts with diagrams, constraints, workflows and data requirements |
| `/grid-events` | Interactive eight-stage event lifecycle (illustrative example) |
| `/integrations` | Clickable integration map with honest availability status |
| `/outcomes` | Outcome matrix, before/during/after tabs, illustrative flexibility chart |
| `/field-notes`, `/field-notes/[slug]` | Editorial hub with category and building-type filters; MDX articles |
| `/about`, `/contact` | Company story and principles; detailed contact form |
| `/privacy`, `/terms`, `/accessibility` | Policy drafts |
| `/brand` | Not indexed. Logo files and rules, colour, type, and the full media plan |

The contact API is `/api/contact`. The site also generates `sitemap.xml`, `robots.txt`, `opengraph-image`, `apple-icon` and `icon.svg`.

## Content model

| File | What it holds |
| --- | --- |
| `content/media-plan.ts` | Single source for all 12 image, 8 video, 3 audio and 10 diagram briefs |
| `content/field-notes/index.ts` + `*.mdx` | Field-note catalogue (title, dek, category, building types, date, reading time, hero image, audio) and the article bodies |
| `content/systems.ts` | Systems on the building schematic: role, constraints, what is read and written |
| `content/use-cases/` | Use-case catalogue and detailed narratives |
| `src/lib/site.ts` | Name, URL, email, LinkedIn, navigation |

### Replacing placeholders with real media

Every photograph, video and audio slot reads its brief from `content/media-plan.ts`. To publish real media:

1. Put the files in `public/images`, `public/videos` or `public/audio`. Use AVIF/WebP for stills, H.264 MP4 under about 3 MB for loops, and MP3/AAC for audio.
2. Add `src` to the brief. Videos also need `posterSrc` and a `captionsSrc` WebVTT file.
3. Update the brief's `alt`, video `caption` and audio `transcript` so they match what was actually recorded.

The components switch from placeholder to real media automatically. Stills use `next/image` (responsive and AVIF/WebP). Videos lazy-load, stay muted and pause for reduced-motion users. Audio never autoplays and always shows its transcript.

### Brand files

`public/brand/` contains the mark, lock-up, monochrome and reverse lock-ups, app icon and social profile mark. The lock-ups use live IBM Plex Sans text. **Outline the text in the production master files** before sending them to print or third parties. Usage rules are on `/brand`.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import it. The Next.js preset needs no changes.
3. Add `NEXT_PUBLIC_SITE_URL` and `CONTACT_WEBHOOK_URL` under **Settings → Environment Variables**.
4. Deploy, then add the `gridsync.build` domain.

`opengraph-image` and `apple-icon` run on the edge runtime. On Windows, the Node runtime of `@vercel/og` fails to prerender them locally.

## Accessibility and performance

- Target: WCAG 2.2 AA. See `/accessibility`.
- Some brand colours are too light for small text on paper (copper 3.4:1, moss 3.1:1, mineral 4.45:1). Each has an `-ink` variant for text that meets 4.5:1 or better.
- Every status pairs a shape or word with its colour. Charts have a legend, a text summary and a table view.
- Scroll-driven diagrams have static alternatives. `MotionConfig reducedMotion="user"` is set site-wide.
- The contact form has labelled fields, hints, inline errors, and an error summary that receives focus on a failed submit.
- Pages are statically generated, Recharts is split out, video loads only near the viewport, and there is no autoplay audio or third-party tracking.

## Pre-launch checklist

Items the site deliberately leaves marked or illustrative:

- [ ] **Media:** commission the 12 photographs, 8 video loops and 3 audio pieces in `content/media-plan.ts`. Until then, placeholders are labelled "to be commissioned".
- [ ] **Team** (`/about`): replace the four profile slots with approved names, roles and portraits.
- [ ] **Office address** (`/contact`): publish it or remove the row.
- [ ] **Legal entity details, processors, retention period and jurisdiction** (`/privacy`, `/terms`): have counsel review, then remove the "Review with legal counsel" markers.
- [ ] **Accessibility audit** (`/accessibility`): add the date and scope once an independent audit has been done.
- [ ] **LinkedIn URL** in `src/lib/site.ts`: confirm the company page exists.
- [ ] **Integration status labels** (`/integrations`): confirm every "Available in pilot", "Under evaluation" and "Planned" label against what is actually implemented.
- [ ] **Illustrative examples:** every site, event, figure and chart marked "Illustrative example — not live data" or "Illustrative scenario" must stay labelled until replaced with verified evidence, used with the site owner's written permission.
- [ ] **Field notes:** review the articles and dates; confirm authorship before replacing "GridSync editorial team" with named authors.
- [ ] **`CONTACT_WEBHOOK_URL`:** set it, and test a real submission end to end.
- [ ] **Rate limiting:** move the in-memory limiter in `/api/contact` to a shared store for production.
- [ ] **Search the codebase for `ReplaceMarker`:** every remaining instance is visible on the site and should be resolved before launch.
