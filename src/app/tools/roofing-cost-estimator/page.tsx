import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CostCalculator } from "@/components/tools/CostCalculator";
import { InternalLinks } from "@/components/content/InternalLinks";
import { AfterCalculatorAd } from "@/components/ads/AdSlots";
import { getCalculatorData } from "@/lib/calculator";

export const metadata: Metadata = {
  title: "Roofing Cost Estimator",
  description:
    "Free roofing cost calculator. Estimate the cost of your roofing project based on area, materials, pitch, and location. Get instant results.",
  keywords: [
    "roofing cost calculator",
    "roof replacement cost",
    "roof estimate",
    "how much does a new roof cost",
  ],
};

export default function RoofingCostEstimatorPage() {
  const data = getCalculatorData();

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          {
            name: "Roofing Cost Estimator",
            href: "/tools/roofing-cost-estimator",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Roofing Cost Estimator
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Get an instant estimate for your roofing project. Enter your details
          below to see a cost breakdown by materials, labor, and more.
        </p>

        <div className="mt-10">
          <CostCalculator data={data} />
        </div>

        <div className="mt-12 space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900">
            How We Calculate Roofing Costs
          </h2>
          <p>
            Our calculator uses national average pricing data adjusted for your
            specific project variables including roof area, material type, pitch
            steepness, building height, and regional cost differences.
          </p>
          <p>
            Material costs vary significantly — asphalt shingles are the most
            affordable option, while metal and tile roofs cost more upfront but
            typically last longer. Steeper pitches and multi-story homes increase
            labor costs due to safety requirements.
          </p>
          <p>
            For the most accurate estimate, we recommend getting quotes from
            local roofing professionals who can inspect your roof in person.
          </p>
        </div>

        <AfterCalculatorAd />

        <InternalLinks category="roofing" />
      </div>
    </Container>
  );
}
