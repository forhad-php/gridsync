import Link from "next/link";

export const metadata = { title: "Page not found" };

const links = [
  ["Home", "/"],
  ["Platform", "/platform"],
  ["How it works", "/how-it-works"],
  ["Field notes", "/field-notes"],
  ["Contact", "/contact"],
];

export default function NotFound() {
  return (
    <section className="container grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="kicker">
          <span className="num">404</span>Page not found
        </p>
        <h1 className="h-display mt-6">This page is not on the drawing.</h1>
        <p className="lead mt-8 max-w-prose">The address may have changed, or the page may never have existed. These are good places to continue.</p>
      </div>
      <nav aria-label="Suggested pages" className="lg:col-span-4 lg:col-start-9 lg:self-end">
        <ul className="border-t border-forest/15">
          {links.map(([label, href]) => (
            <li key={href} className="border-b border-forest/15">
              <Link href={href} className="flex items-center justify-between py-4 text-[1.1rem] text-forest hover:text-copper-ink">
                {label}
                <span aria-hidden className="font-mono text-[13px] text-mineral-ink">
                  {href}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
