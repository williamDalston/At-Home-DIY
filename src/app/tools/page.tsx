import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tools & Calculators",
  description:
    "Free home improvement tools and cost calculators. Estimate roofing costs, plan your projects, and budget smarter.",
};

export default function ToolsIndexPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-900">
        Tools & Calculators
      </h1>
      <p className="mt-3 text-lg text-gray-600">
        Free tools to help you plan and budget your next home project.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card href="/tools/roofing-cost-estimator">
          <div className="mb-4 text-4xl">🏠</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Roofing Cost Estimator
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Get an instant estimate for your roofing project based on area,
            materials, and location.
          </p>
        </Card>

        <Card href="/tools/painting-cost-estimator">
          <div className="mb-4 text-4xl">🎨</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Painting Cost Estimator
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Calculate paint quantities and costs for your interior or exterior
            painting project.
          </p>
        </Card>

        <Card href="/tools/hvac-sizing-calculator">
          <div className="mb-4 text-4xl">🌡️</div>
          <h2 className="text-xl font-semibold text-gray-900">
            HVAC Sizing Calculator
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Determine the right HVAC system size and estimated cost for your
            home.
          </p>
        </Card>

        <Card href="/tools/energy-savings-quiz">
          <div className="mb-4 text-4xl">⚡</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Energy Savings Quiz
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Take a quick quiz to discover how much you could save on energy
            bills.
          </p>
        </Card>

        <Card href="/tools/project-planner">
          <div className="mb-4 text-4xl">📋</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Project Planner
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Step-by-step checklists for kitchen remodels, bathroom renovations,
            and more.
          </p>
        </Card>
      </div>
    </Container>
  );
}
