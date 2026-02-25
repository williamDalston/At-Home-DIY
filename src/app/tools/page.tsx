import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TOOL_ICONS } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Tools & Calculators",
  description:
    "Free home improvement tools and cost calculators. Estimate roofing costs, plan your projects, and budget smarter.",
};

const tools = [
  {
    href: "/tools/roofing-cost-estimator",
    slug: "roofing-cost-estimator",
    title: "Roofing Cost Estimator",
    desc: "Get an instant estimate for your roofing project based on area, materials, and location.",
  },
  {
    href: "/tools/painting-cost-estimator",
    slug: "painting-cost-estimator",
    title: "Painting Cost Estimator",
    desc: "Calculate paint quantities and costs for your interior or exterior painting project.",
  },
  {
    href: "/tools/hvac-sizing-calculator",
    slug: "hvac-sizing-calculator",
    title: "HVAC Sizing Calculator",
    desc: "Determine the right HVAC system size and estimated cost for your home.",
  },
  {
    href: "/tools/energy-savings-quiz",
    slug: "energy-savings-quiz",
    title: "Energy Savings Quiz",
    desc: "Take a quick quiz to discover how much you could save on energy bills.",
  },
  {
    href: "/tools/project-planner",
    slug: "project-planner",
    title: "Project Planner",
    desc: "Step-by-step checklists for kitchen remodels, bathroom renovations, and more.",
  },
];

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
        {tools.map((tool) => {
          const Icon = TOOL_ICONS[tool.slug];
          return (
            <Card key={tool.slug} href={tool.href}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                {Icon ? <Icon className="h-6 w-6" /> : null}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {tool.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{tool.desc}</p>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
