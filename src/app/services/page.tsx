import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SERVICE_ICONS } from "@/lib/icons";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Home Services",
  description:
    "Find trusted local professionals for plumbing, electrical, roofing, HVAC, painting, and landscaping. Get free quotes from licensed contractors in your area.",
  keywords: [
    "home services",
    "local contractors",
    "plumbing services",
    "electrical services",
    "roofing contractors",
    "HVAC services",
    "home repair",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Home Services | FixIt Finder",
    description:
      "Find trusted local professionals for plumbing, electrical, roofing, HVAC, painting, and landscaping. Get free quotes from licensed contractors.",
    images: [
      {
        url: "/api/og?title=Home%20Services&subtitle=Find%20trusted%20local%20professionals&category=services",
        width: 1200,
        height: 630,
        alt: "FixIt Finder Home Services",
      },
    ],
  },
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
        {services.map((svc) => {
          const Icon = svc.frontmatter.icon
            ? SERVICE_ICONS[svc.frontmatter.icon]
            : undefined;
          return (
            <Card
              key={svc.slug}
              href={`/services/${svc.frontmatter.serviceType || svc.slug}`}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                {Icon ? <Icon className="h-7 w-7" /> : null}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {svc.frontmatter.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {svc.frontmatter.description}
              </p>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
