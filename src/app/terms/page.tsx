import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";
import { ReplaceMarker } from "@/components/ui/Status";

export const metadata = pageMetadata({
  title: "Terms of use",
  description: "Terms that apply to using the GridSync.build website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      path="/terms"
      crumb="Terms"
      title="Terms of use"
      updated="24 September 2026"
      intro={<p>These terms cover the use of this website. Any GridSync service is provided under a separate written agreement.</p>}
      sections={[
        {
          id: "about",
          title: "About these terms",
          body: (
            <p>
              By using GridSync.build you agree to these terms. If you do not agree, please do not use the site. The site is operated
              by <ReplaceMarker>Legal entity details</ReplaceMarker>.
            </p>
          ),
        },
        {
          id: "information",
          title: "Information on this site",
          body: (
            <>
              <p>
                The content on this site is general information about building operations and energy flexibility. It is not
                engineering, legal or financial advice for a specific building.
              </p>
              <p>
                Operating examples, figures, sites and events shown on this site are illustrative unless stated otherwise, and are
                labelled as such. They are not measured results and do not describe real customers.
              </p>
            </>
          ),
        },
        {
          id: "services",
          title: "Services and availability",
          body: (
            <p>
              Descriptions of capabilities and integrations indicate their status—for example “Available in pilot”, “Planned” or
              “Under evaluation”. Status can change. Nothing on this site is an offer to supply a service; any service is subject to a
              separate agreement.
            </p>
          ),
        },
        {
          id: "ip",
          title: "Intellectual property",
          body: (
            <p>
              The GridSync name, mark, text, diagrams and design of this site belong to GridSync. You may share links and quote short
              extracts with attribution. Please ask before reusing diagrams or longer extracts.
            </p>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          body: <p>Do not attempt to disrupt the site, access it by automated means that place an unreasonable load on it, or submit false or harmful information through its forms.</p>,
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <p>
              We work to keep the site accurate and available but cannot guarantee it. To the extent the law allows, we are not
              liable for loss arising from reliance on general information published here. Nothing in these terms limits liability that
              cannot be limited by law.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law and contact",
          body: (
            <>
              <p>
                Governing law and jurisdiction: <ReplaceMarker>Confirm jurisdiction</ReplaceMarker>
              </p>
              <p>
                Questions about these terms: <a className="link" href={`mailto:${site.email}`}>{site.email}</a>. See also the{" "}
                <Link className="link" href="/privacy">privacy notice</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
