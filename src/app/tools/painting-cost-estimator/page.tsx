import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PaintingCalculator } from "@/components/tools/PaintingCalculator";
import { InternalLinks } from "@/components/content/InternalLinks";
import { AfterCalculatorAd } from "@/components/ads/AdSlots";
import { getPaintingData } from "@/lib/painting-calculator";

export const metadata: Metadata = {
  title: "Painting Cost Estimator",
  description:
    "Free painting cost calculator. Estimate the cost of your interior or exterior painting project based on wall area, paint type, and surface condition.",
  keywords: [
    "painting cost calculator",
    "house painting estimate",
    "how much does painting cost",
    "interior painting cost",
  ],
  alternates: {
    canonical: "/tools/painting-cost-estimator",
  },
  openGraph: {
    title: "Painting Cost Estimator | FixIt Finder",
    description:
      "Free painting cost calculator. Estimate interior or exterior painting costs based on wall area, paint type, and surface condition.",
    images: [
      {
        url: "/api/og?title=Painting%20Cost%20Estimator&subtitle=Free%20painting%20calculator&category=painting",
        width: 1200,
        height: 630,
        alt: "Painting Cost Estimator",
      },
    ],
  },
};

export default function PaintingCostEstimatorPage() {
  const data = getPaintingData();

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          {
            name: "Painting Cost Estimator",
            href: "/tools/painting-cost-estimator",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Painting Cost Estimator
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Get an instant estimate for your painting project. Enter your room
          details below to see a cost breakdown including paint, prep, primer,
          and labor.
        </p>

        <div className="mt-10">
          <PaintingCalculator data={data} />
        </div>

        <div className="mt-12 space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900">
            How We Calculate Painting Costs
          </h2>
          <p>
            Our calculator uses national average pricing for paint, primer, and
            professional labor. Costs are adjusted based on the paint finish you
            select (flat finishes are more economical, while high-gloss costs
            more per gallon) and the condition of your walls.
          </p>
          <p>
            Walls in poor condition require more prep work — including patching,
            sanding, and priming — which increases the overall cost. Two coats
            of paint is standard for most projects, though a third coat may be
            needed for dramatic color changes.
          </p>
          <p>
            For the most accurate estimate, measure your walls and subtract the
            area of windows and doors. Then get quotes from local painting
            professionals to compare.
          </p>
        </div>

        <AfterCalculatorAd />

        <InternalLinks category="painting" />
      </div>
    </Container>
  );
}
