import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME} - connecting homeowners with trusted local service professionals and providing expert DIY guides for home repairs and maintenance.`,
  keywords: [
    "about FixIt Finder",
    "home service directory",
    "DIY home repair",
    "trusted contractors",
    "home improvement help",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description: `Learn about ${SITE_NAME} - connecting homeowners with trusted local service professionals and providing expert DIY guides.`,
    images: [
      {
        url: "/api/og?title=About%20Us&subtitle=Connecting%20homeowners%20with%20trusted%20pros&category=about",
        width: 1200,
        height: 630,
        alt: `About ${SITE_NAME}`,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900">About {SITE_NAME}</h1>

        <div className="mt-8 space-y-6 text-lg text-gray-700">
          <p>
            {SITE_NAME} is your go-to resource for home repair guidance and
            local service connections. We believe every homeowner deserves access
            to reliable information and trusted professionals.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p>
            We connect homeowners with the knowledge and professionals they need
            to maintain and improve their homes. Whether you want to DIY or hire
            a pro, we have you covered.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Expert DIY Guides</strong> — Step-by-step instructions for
              common home repairs and maintenance tasks.
            </li>
            <li>
              <strong>Local Service Directory</strong> — Find licensed,
              insured professionals in your area for plumbing, electrical,
              roofing, and more.
            </li>
            <li>
              <strong>Cost Estimators</strong> — Interactive tools to help you
              budget for your next home project.
            </li>
            <li>
              <strong>Free Quotes</strong> — Request quotes from multiple
              contractors with no obligation.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900">Why Trust Us</h2>
          <p>
            Our content is written by experienced home improvement professionals
            and reviewed for accuracy. We only connect you with licensed and
            insured service providers who have been vetted for quality.
          </p>
        </div>

        <div className="mt-12 rounded-xl bg-blue-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="mt-2 text-gray-600">
            Whether you need a pro or want to DIY, we can help.
          </p>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact">Get a Free Quote</Button>
            <Button href="/blog" variant="outline">
              Browse DIY Guides
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
