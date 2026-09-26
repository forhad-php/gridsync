import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";
import { ReplaceMarker } from "@/components/ui/Status";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "How GridSync collects, uses and protects personal information submitted through GridSync.build.",
  path: "/privacy",
});

const mail = (
  <a className="link" href={`mailto:${site.email}`}>
    {site.email}
  </a>
);

export default function PrivacyPage() {
  return (
    <LegalPage
      path="/privacy"
      crumb="Privacy"
      title="Privacy notice"
      updated="24 September 2026"
      intro={<p>We collect as little as we can, use it only to reply to you, and delete it when it is no longer needed.</p>}
      sections={[
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <>
              <p>
                GridSync (“we”, “us”) operates GridSync.build. For the purposes of data-protection law we are the controller of the
                personal information described here.
              </p>
              <p>
                Registered company name, number and address: <ReplaceMarker>Legal entity details</ReplaceMarker>
              </p>
              <p>Contact for privacy questions: {mail}.</p>
            </>
          ),
        },
        {
          id: "what-we-collect",
          title: "What we collect",
          body: (
            <>
              <p>When you use the contact form we collect the details you choose to give us:</p>
              <ul>
                <li>your name, work email, company, role and country;</li>
                <li>a phone number, if you ask us to call you;</li>
                <li>information about your building, its systems and your goals.</li>
              </ul>
              <p>
                Our hosting provider records standard technical logs (such as IP address and request time) to operate and secure the
                site. This site does not use advertising or cross-site tracking cookies.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use-it",
          title: "How we use it",
          body: (
            <>
              <p>We use your details to reply to your enquiry and to prepare for a conversation about your building.</p>
              <p>
                Our legal basis is our legitimate interest in responding to business enquiries, or steps taken at your request before
                entering into a contract. We do not use your details for marketing unless you ask us to, and we never sell them.
              </p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "Who we share it with",
          body: (
            <>
              <p>
                We use a small number of service providers to host this site and to receive form submissions. They process data on our
                instructions only.
              </p>
              <p>
                Current list of processors and their locations: <ReplaceMarker>Hosting and form-intake providers</ReplaceMarker>
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "How long we keep it",
          body: (
            <p>
              We keep enquiry details for as long as needed to handle the enquiry and any follow-on discussion, and then delete them.
              Retention period: <ReplaceMarker>Confirm retention period</ReplaceMarker>
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <>
              <p>
                Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal
                information, to object to its use, and to data portability. To use any of these rights, write to {mail}.
              </p>
              <p>
                You also have the right to complain to your local data-protection authority. We would appreciate the chance to deal
                with your concern first.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to this notice",
          body: <p>If we change how we handle personal information, we will update this page and the date at the top.</p>,
        },
      ]}
    />
  );
}
