import { cn } from "@/lib/cn";
import { Breadcrumbs, type Crumb } from "../navigation/Breadcrumbs";

type Props = {
  trail: Crumb[];
  kicker: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  /** Optional media or diagram placed in the right column. */
  aside?: React.ReactNode;
  className?: string;
};

/** Standard inner-page opening: breadcrumb, kicker, H1, serif-leaning introduction, optional aside. */
export function PageHeader({ trail, kicker, title, intro, aside, className }: Props) {
  return (
    <section className={cn("border-b border-forest/15", className)}>
      <div className="container pb-16 pt-10 sm:pb-20 sm:pt-12">
        <Breadcrumbs trail={trail} />
        <div className={cn("mt-14 grid gap-12 lg:mt-20", aside && "lg:grid-cols-12 lg:gap-10")}>
          <div className={cn(aside ? "lg:col-span-6" : "max-w-[58rem]")}>
            <p className="kicker">{kicker}</p>
            <h1 className="h-display mt-6">{title}</h1>
            <div className="mt-8 max-w-prose font-serif text-[1.3rem] leading-[1.5] text-forest/90 sm:text-[1.45rem]">{intro}</div>
          </div>
          {aside && <div className="lg:col-span-6 lg:self-end">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
