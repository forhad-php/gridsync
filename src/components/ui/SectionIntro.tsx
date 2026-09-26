import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  /** Section number shown in the kicker, e.g. "01". */
  index?: string;
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** "split" puts the title left and the body right on large screens (editorial offset). */
  layout?: "stack" | "split";
  as?: "h2" | "h3";
};

export function SectionIntro({ index, kicker, title, children, className, layout = "stack", as: H = "h2" }: Props) {
  if (layout === "split") {
    return (
      <Reveal className={cn("grid gap-8 lg:grid-cols-12 lg:gap-10", className)}>
        <div className="lg:col-span-6">
          <p className="kicker">
            {index && <span className="num">{index}</span>}
            {kicker}
          </p>
          <H className="h-section mt-5">{title}</H>
        </div>
        {children && <div className="lead self-end lg:col-span-5 lg:col-start-8">{children}</div>}
      </Reveal>
    );
  }
  return (
    <Reveal className={cn("max-w-measure", className)}>
      <p className="kicker">
        {index && <span className="num">{index}</span>}
        {kicker}
      </p>
      <H className="h-section mt-5">{title}</H>
      {children && <div className="lead mt-6">{children}</div>}
    </Reveal>
  );
}
