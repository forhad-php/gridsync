import { cn } from "@/lib/cn";
import { Mark } from "./Mark";

type Props = {
  className?: string;
  /** Show the small ".build" technical suffix. */
  suffix?: boolean;
};

/** Lock-up: mark + "GridSync". Colour follows `currentColor`, so it works on paper and on ink. */
export function Wordmark({ className, suffix }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark className="h-[1.35em] w-[1.35em] shrink-0" />
      <span className="text-[1.15em] font-semibold tracking-[-0.035em]">
        GridSync
        {suffix && <span className="ml-0.5 font-mono text-[0.62em] font-normal tracking-normal opacity-70">.build</span>}
      </span>
    </span>
  );
}
