import Link from "next/link";
import { Mark } from "../brand/Mark";

type Props = {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing band used at the end of most pages. Deep ink, one statement, two quiet actions. */
export function CtaBand({
  title = "Start with one building.",
  body = "Tell us what systems you operate, what data you already have, and where flexibility is difficult to see.",
  primary = { label: "Discuss a building", href: "/contact" },
  secondary = { label: "See how it works", href: "/how-it-works" },
}: Props) {
  return (
    <section className="on-ink relative overflow-hidden bg-ink">
      <Mark className="pointer-events-none absolute -bottom-40 -right-24 h-[34rem] w-[34rem] text-paper/[0.025]" />
      <div className="container relative grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="h-section">{title}</h2>
          <p className="lead mt-6 max-w-prose">{body}</p>
        </div>
        <div className="flex flex-wrap items-end gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <Link href={primary.href} className="btn-primary">
            {primary.label}
          </Link>
          <Link href={secondary.href} className="btn-text">
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
