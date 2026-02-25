import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Home Services",
  description:
    "Find trusted local professionals for plumbing, electrical, roofing, and more. Get free quotes from licensed contractors in your area.",
};

export default async function ServicesIndexPage() {
  const services = await getAllContent("services");

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-900">Home Services</h1>
      <p className="mt-3 text-lg text-gray-600">
        Connect with licensed, insured home service professionals in your area.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <Card
            key={svc.slug}
            href={`/services/${svc.frontmatter.serviceType || svc.slug}`}
            className="text-center"
          >
            <div className="mb-4 text-4xl">
              {svc.frontmatter.icon === "wrench" && "🔧"}
              {svc.frontmatter.icon === "zap" && "⚡"}
              {svc.frontmatter.icon === "home" && "🏠"}
              {svc.frontmatter.icon === "thermometer" && "🌡️"}
              {svc.frontmatter.icon === "paintbrush" && "🎨"}
              {svc.frontmatter.icon === "tree" && "🌳"}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {svc.frontmatter.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {svc.frontmatter.description}
            </p>
          </Card>
        ))}
      </div>
    </Container>
  );
}
