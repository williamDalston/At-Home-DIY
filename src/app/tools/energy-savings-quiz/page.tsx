import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EnergyQuiz } from "@/components/tools/EnergyQuiz";
import { InternalLinks } from "@/components/content/InternalLinks";
import { AfterCalculatorAd } from "@/components/ads/AdSlots";
import { getEnergyQuizData } from "@/lib/energy-quiz";

export const metadata: Metadata = {
  title: "Home Energy Savings Quiz",
  description:
    "Take our free home energy quiz to find out how efficient your home is and discover ways to save on energy bills. Get personalized recommendations.",
  keywords: [
    "home energy quiz",
    "energy efficiency assessment",
    "save on energy bills",
    "home energy audit",
    "energy savings tips",
  ],
};

export default function EnergySavingsQuizPage() {
  const data = getEnergyQuizData();

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          {
            name: "Energy Savings Quiz",
            href: "/tools/energy-savings-quiz",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Home Energy Savings Quiz
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Answer 7 quick questions about your home to discover your energy
          efficiency score and get personalized tips to lower your energy bills.
        </p>

        <div className="mt-10">
          <EnergyQuiz data={data} />
        </div>

        <div className="mt-12 space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900">
            Why Energy Efficiency Matters
          </h2>
          <p>
            The average American household spends over $2,000 per year on energy
            bills. Simple upgrades like LED lighting, smart thermostats, and
            improved insulation can reduce that by 20-40%.
          </p>
          <p>
            Our quiz evaluates key factors that impact your home&apos;s energy
            consumption — including your HVAC system age, insulation quality,
            window type, and thermostat technology. Based on your answers, we
            provide actionable recommendations ranked by impact.
          </p>
          <p>
            For a comprehensive assessment, consider hiring a professional energy
            auditor who can use thermal imaging and blower door tests to identify
            specific air leaks and insulation gaps.
          </p>
        </div>

        <AfterCalculatorAd />

        <InternalLinks category="hvac" />
      </div>
    </Container>
  );
}
