import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HvacCalculator } from "@/components/tools/HvacCalculator";
import { InternalLinks } from "@/components/content/InternalLinks";
import { AfterCalculatorAd } from "@/components/ads/AdSlots";
import { getHvacData } from "@/lib/hvac-calculator";

export const metadata: Metadata = {
  title: "HVAC Sizing Calculator",
  description:
    "Free HVAC sizing calculator. Determine the right BTU and tonnage for your home based on square footage, climate zone, and insulation level.",
  keywords: [
    "hvac sizing calculator",
    "what size hvac do I need",
    "btu calculator",
    "air conditioner size calculator",
    "hvac cost estimator",
  ],
};

export default function HvacSizingCalculatorPage() {
  const data = getHvacData();

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          {
            name: "HVAC Sizing Calculator",
            href: "/tools/hvac-sizing-calculator",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">
          HVAC Sizing Calculator
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Determine the right HVAC system size for your home. Enter your details
          below to see the recommended BTU capacity, tonnage, and estimated cost.
        </p>

        <div className="mt-10">
          <HvacCalculator data={data} />
        </div>

        <div className="mt-12 space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900">
            How HVAC Sizing Works
          </h2>
          <p>
            Proper HVAC sizing is critical — a system that&apos;s too small
            won&apos;t keep your home comfortable, while an oversized system
            cycles on and off too frequently, wasting energy and wearing out
            faster.
          </p>
          <p>
            Our calculator uses the square footage of your home, your climate
            zone, and insulation quality to estimate the BTU (British Thermal
            Units) needed. We then convert to tons (1 ton = 12,000 BTU) and
            apply system-specific costs.
          </p>
          <p>
            For the most accurate sizing, a professional HVAC contractor should
            perform a Manual J load calculation, which accounts for window
            placement, ceiling height, ductwork, and other factors specific to
            your home.
          </p>
        </div>

        <AfterCalculatorAd />

        <InternalLinks category="hvac" />
      </div>
    </Container>
  );
}
