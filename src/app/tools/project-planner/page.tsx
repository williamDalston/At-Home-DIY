import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProjectPlanner } from "@/components/tools/ProjectPlanner";
import { AfterCalculatorAd } from "@/components/ads/AdSlots";
import { getChecklistData } from "@/lib/project-checklist";

export const metadata: Metadata = {
  title: "Project Planner & Checklists",
  description:
    "Free home improvement project planner with step-by-step checklists for kitchen remodels, bathroom renovations, roof replacement, painting, and deck building.",
  keywords: [
    "home improvement checklist",
    "renovation planner",
    "kitchen remodel checklist",
    "bathroom renovation steps",
    "project planning tool",
  ],
  alternates: {
    canonical: "/tools/project-planner",
  },
  openGraph: {
    title: "Project Planner & Checklists | FixIt Finder",
    description:
      "Free home improvement project planner with step-by-step checklists for kitchen remodels, bathroom renovations, and more.",
    images: [
      {
        url: "/api/og?title=Project%20Planner&subtitle=Step-by-step%20checklists&category=planning",
        width: 1200,
        height: 630,
        alt: "Project Planner & Checklists",
      },
    ],
  },
};

export default function ProjectPlannerPage() {
  const data = getChecklistData();

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          {
            name: "Project Planner",
            href: "/tools/project-planner",
          },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Project Planner & Checklists
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Stay organized with our step-by-step project checklists. Select your
          project type and track your progress from planning through completion.
        </p>

        <div className="mt-10">
          <ProjectPlanner checklists={data.checklists} />
        </div>

        <div className="mt-12 space-y-6 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900">
            Why Use a Project Checklist?
          </h2>
          <p>
            Home improvement projects involve dozens of decisions and tasks that
            need to happen in the right order. A checklist ensures nothing falls
            through the cracks — from pulling permits before demolition to
            scheduling final inspections.
          </p>
          <p>
            Our checklists are organized in the recommended order of operations,
            so you know what to do first and what can wait. Check off items as
            you go to track your progress visually.
          </p>
          <p>
            Need help with any step? Use our contractor finder to connect with
            licensed professionals in your area who can handle the heavy lifting.
          </p>
        </div>

        <AfterCalculatorAd />
      </div>
    </Container>
  );
}
