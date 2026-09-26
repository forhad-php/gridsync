import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";
import { ReplaceMarker } from "@/components/ui/Status";

export const metadata = pageMetadata({
  title: "Accessibility statement",
  description: "How GridSync.build is designed to meet WCAG 2.2 AA, known limitations, and how to report a problem.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage
      path="/accessibility"
      crumb="Accessibility"
      title="Accessibility statement"
      updated="24 September 2026"
      intro={<p>We want everyone who operates, manages or studies buildings to be able to use this site, whatever tools they use.</p>}
      sections={[
        {
          id: "standard",
          title: "Our target",
          body: (
            <>
              <p>
                GridSync.build is designed to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. The site has been
                tested with keyboard navigation, reduced-motion settings, zoom to 200% and narrow screens.
              </p>
              <p>
                Independent audit: <ReplaceMarker>Not yet carried out — add date and scope when completed</ReplaceMarker>
              </p>
            </>
          ),
        },
        {
          id: "what-we-did",
          title: "What we have done",
          body: (
            <ul>
              <li>Semantic headings and landmarks on every page, with a “Skip to content” link.</li>
              <li>A visible focus indicator on every link, button and form control.</li>
              <li>
                Brand colours adjusted for text: copper, moss, signal yellow and mineral grey each have a darker “ink” variant used for
                small text so that it meets a 4.5:1 contrast ratio on our paper background.
              </li>
              <li>Status is never shown by colour alone; each state also has a shape or a word.</li>
              <li>Charts have a legend, a text summary and a table view.</li>
              <li>Interactive diagrams can be operated with buttons as well as a pointer.</li>
              <li>All motion respects the “reduce motion” setting; scroll-driven diagrams have a static alternative.</li>
              <li>Video loops are silent, never autoplay with sound, can be paused, and carry captions or descriptive text.</li>
              <li>Audio is optional, never autoplays, and is always accompanied by a full transcript.</li>
              <li>Form fields have labels, hints and error messages that are announced to assistive technology, with a summary of errors on submission.</li>
            </ul>
          ),
        },
        {
          id: "limitations",
          title: "Known limitations",
          body: (
            <ul>
              <li>
                Photography, video and audio are still being produced. Placeholders describe the intended content in text; they will
                be replaced with real media carrying alt text, captions and transcripts.
              </li>
              <li>Some complex diagrams convey spatial relationships that are summarised in text rather than described element by element.</li>
            </ul>
          ),
        },
        {
          id: "feedback",
          title: "Report a problem",
          body: (
            <p>
              If something on this site does not work for you, please tell us at{" "}
              <a className="link" href={`mailto:${site.email}?subject=Accessibility`}>{site.email}</a>. Include the page address and
              what you were trying to do. We aim to reply to accessibility reports as a priority.
            </p>
          ),
        },
      ]}
    />
  );
}
