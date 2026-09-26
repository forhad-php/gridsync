import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { ReplaceMarker } from "@/components/ui/Status";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = pageMetadata({
  title: "Contact — Start with one building",
  description:
    "Tell GridSync what systems you operate, what data you already have, and where flexibility is difficult to see. We start with one building.",
  path: "/contact",
});

const faqs = [
  {
    q: "Do we need to replace our BMS?",
    a: <p>No. GridSync reads from the systems already running the building and only writes, where you permit it, through them.</p>,
  },
  {
    q: "What if our data is incomplete?",
    a: (
      <p>
        That is normal. Interval meter data and an idea of the main equipment is enough to start a conversation. Part of the first
        assessment is finding out which gaps matter.
      </p>
    ),
  },
  {
    q: "What happens after we send this?",
    a: <p>We read what you have sent and contact you using your preferred method. The first conversation is to understand the building and decide together whether an assessment is worthwhile.</p>,
  },
  {
    q: "Can we start with a single site in a larger portfolio?",
    a: <p>Yes, and we recommend it. One building, understood well, is a better starting point than a portfolio understood roughly.</p>,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-forest/15">
        <div className="container pb-16 pt-10 sm:pt-12">
          <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-14 max-w-[58rem] lg:mt-20">
            <p className="kicker">Contact</p>
            <h1 className="h-display mt-6">Start with one building.</h1>
            <p className="mt-8 max-w-prose font-serif text-[1.3rem] leading-[1.5] text-forest/90 sm:text-[1.45rem]">
              Tell us what systems you operate, what data you already have, and where flexibility is difficult to see. The more
              context you share, the more useful the first conversation will be.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach us">
            <div>
              <h2 className="label">Direct</h2>
              <dl className="mt-4 divide-y divide-forest/10 border-y border-forest/10 text-[15px]">
                <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
                  <dt className="text-mineral-ink">Email</dt>
                  <dd>
                    <a className="link" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
                  <dt className="text-mineral-ink">LinkedIn</dt>
                  <dd>
                    <a className="link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                      GridSync<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
                  <dt className="text-mineral-ink">Office</dt>
                  <dd>
                    <ReplaceMarker>Office address, if published</ReplaceMarker>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="label">How we use what you send</h2>
              <div className="mt-4 space-y-3 text-[15px] text-forest/85">
                <p>
                  Your details are used only to reply to this enquiry and to prepare for a conversation about your building. They
                  are not added to a newsletter and are not sold or shared for marketing.
                </p>
                <p>
                  Building information you share—systems, energy use, goals—is treated as confidential and is not published or used
                  as an example without your written agreement.
                </p>
                <p>
                  You can ask us to delete your details at any time by writing to{" "}
                  <a className="link" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  . Full details are in the <Link className="link" href="/privacy">privacy notice</Link>.
                </p>
              </div>
            </div>

            <div>
              <h2 className="label">Before you write</h2>
              <Accordion items={faqs} className="mt-4" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
