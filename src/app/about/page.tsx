import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME} - expert DIY guides, cost calculators, and home service information for homeowners.`,
  keywords: [
    "about FixIt Finder",
    "home service directory",
    "DIY home repair",
    "home service guides",
    "home improvement help",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us | ${SITE_NAME}`,
    description: `Learn about ${SITE_NAME} - expert DIY guides, cost calculators, and home service information for homeowners.`,
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
    <Container className="py-10 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">About {SITE_NAME}</h1>

        <div className="mt-10 space-y-8 text-lg text-gray-700 leading-relaxed">
          <p>
            {SITE_NAME} is your go-to resource for home repair guidance and
            project planning. We believe every homeowner deserves access
            to reliable, practical information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p>
            We provide homeowners with the guides, tools, and cost information
            they need to make informed decisions about home projects. Whether
            you want to DIY or understand what to expect when hiring a pro,
            we have you covered.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Expert DIY Guides</strong> — Step-by-step instructions for
              common home repairs and maintenance tasks.
            </li>
            <li>
              <strong>Service Guides</strong> — Detailed information about
              home services including what to expect, average costs, and
              how to choose the right professional.
            </li>
            <li>
              <strong>Cost Estimators</strong> — Interactive tools to help you
              budget for your next home project.
            </li>
            <li>
              <strong>Contact Form</strong> — Reach out with questions about
              your project and we will respond with guidance.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900">Why Trust Us</h2>
          <p>
            Our content is researched and reviewed for accuracy. Cost data
            is sourced from industry publications and national averages. We
            aim to give you the information you need to make confident
            decisions about your home.
          </p>

          <h2 id="editorial-standards" className="text-2xl font-bold text-gray-900">
            Editorial Standards &amp; Methodology
          </h2>
          <p>
            Transparency matters. Here is how we create and maintain the
            information on this site:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Cost estimates</strong> are derived from national average
              data published by industry sources (HomeAdvisor, Angi, U.S. Bureau
              of Labor Statistics) and adjusted for regional cost-of-living
              differences. They are intended as rough planning guides, not
              binding quotes.
            </li>
            <li>
              <strong>DIY guides</strong> are written and reviewed by our
              editorial team, which includes licensed contractors and experienced
              home improvement writers. Each guide is fact-checked before
              publication.
            </li>
            <li>
              <strong>Service guides</strong> provide general information about
              what to look for when hiring professionals, including licensing,
              insurance, and questions to ask. We do not endorse specific
              contractors.
            </li>
            <li>
              <strong>Updates:</strong> We review and update content on a
              quarterly basis. Cost data is refreshed annually. Each article
              displays its published and last-updated date.
            </li>
          </ul>
          <p className="text-base text-gray-500">
            Have a correction or concern? Contact us at{" "}
            <a href="/contact" className="text-blue-600 underline decoration-blue-200 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
              our contact page
            </a>.
          </p>
        </div>

        <div className="mt-14 rounded-xl border border-blue-100 bg-blue-50 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-gray-600">
            Whether you need a pro or want to DIY, we can help.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact">Contact Us</Button>
            <Button href="/blog" variant="outline">
              Browse DIY Guides
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
