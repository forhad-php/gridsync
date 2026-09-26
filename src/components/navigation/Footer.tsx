import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Wordmark } from "../brand/Wordmark";

export function Footer() {
  return (
    <footer className="on-ink bg-ink text-stone">
      <div className="container pb-10 pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="GridSync, home" className="text-paper">
              <Wordmark suffix className="text-[20px]" />
            </Link>
            <p className="mt-6 max-w-sm font-serif text-[1.35rem] leading-snug text-paper">
              Buildings that respond without disruption.
            </p>
            <dl className="mt-10 space-y-3 text-[15px]">
              <div className="flex gap-4">
                <dt className="label w-20 shrink-0 pt-0.5">Email</dt>
                <dd>
                  <a className="link" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="label w-20 shrink-0 pt-0.5">LinkedIn</dt>
                <dd>
                  <a className="link" href={site.linkedin} rel="noopener noreferrer" target="_blank">
                    GridSync<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="label">{group.heading}</h2>
                <ul className="mt-5 space-y-3 text-[15px]">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-stone transition-colors hover:text-paper">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="rule mt-20 grid gap-6 pt-6 text-[14px] text-mineral-light md:grid-cols-12">
          <p className="md:col-span-7">
            Operating examples on this site are illustrative and are labelled as such. GridSync does not publish customer
            names, savings figures, certifications or programme participation until they can be verified.
          </p>
          <p className="md:col-span-5 md:text-right">© {new Date().getFullYear()} GridSync. GridSync.build</p>
        </div>
      </div>
    </footer>
  );
}
