import { pageMetadata } from "@/lib/seo";
import { useCases } from "@/content/use-cases";
import { useCaseDetails } from "@/content/use-cases/details";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { UseCaseBrowser } from "@/components/use-cases/UseCaseBrowser";
import { UseCaseSection } from "@/components/use-cases/UseCaseSection";

export const metadata = pageMetadata({
  title: "Use cases — Different buildings, different boundaries",
  description:
    "How GridSync approaches flexibility in office portfolios, retail and mixed-use, cold storage, EV depots, campuses and aggregator portfolios—constraints, workflows and the data each one needs.",
  path: "/use-cases",
});

const variants = ["plate", "split", "ink", "split", "plate", "split"] as const;

export default function UseCasesPage() {
  const types = Array.from(new Set(useCases.flatMap((u) => u.buildingTypes)));
  const items = useCases.map((uc, i) => ({
    slug: uc.slug,
    title: uc.title,
    types: uc.buildingTypes,
    node: (
      <UseCaseSection
        index={i}
        uc={uc}
        d={useCaseDetails[uc.slug]}
        variant={variants[i]}
        video={uc.slug === "ev-depots" ? "VID-05" : undefined}
      />
    ),
  }));

  return (
    <>
      <PageHeader
        trail={[{ name: "Use cases", path: "/use-cases" }]}
        kicker="Use cases"
        title="Different buildings. Different boundaries."
        intro={
          <p>
            The workflow is the same everywhere: observe, forecast, coordinate, verify. What changes is what each building is
            allowed to do—and who decides. These are operating scenarios, not customer case studies.
          </p>
        }
      />
      <UseCaseBrowser items={items} types={types} />
      <CtaBand
        title="Your building will have its own boundaries."
        body="Tell us what kind of site you operate and which constraints matter most. We will start from those, not from a template."
      />
    </>
  );
}
