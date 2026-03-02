import type { Metadata } from "next";
import Link from "next/link";
import { Shield, BadgeCheck, Clock, DollarSign } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { StaggeredCards, StaggeredItem } from "@/components/motion/StaggeredCards";
import { SocialProofCounters } from "@/components/engagement/SocialProofCounters";
import { SchemaWebSite } from "@/components/seo/SchemaWebSite";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { SERVICE_ICONS, TOOL_ICONS } from "@/lib/icons";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "FixIt Finder - Expert Home Repair Guides & Local Service Pros",
  description:
    "Expert DIY guides, cost calculators, and home service information for plumbing, electrical, roofing, HVAC, painting, and landscaping.",
  keywords: [
    "home repair guides",
    "DIY home improvement",
    "local contractors",
    "plumbing services",
    "electrical services",
    "roofing contractors",
    "HVAC services",
    "home maintenance",
    "free contractor quotes",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FixIt Finder - Expert Home Repair Guides & Local Service Pros",
    description:
      "Expert DIY guides, cost calculators, and home service information for plumbing, electrical, roofing, and more.",
    type: "website",
  },
};

const trustBadges = [
  { label: "Free Guides", Icon: DollarSign },
  { label: "No Obligation", Icon: Shield },
  { label: "Expert Tips", Icon: BadgeCheck },
  { label: "Updated Regularly", Icon: Clock },
];

const tools = [
  {
    href: "/tools/roofing-cost-estimator",
    slug: "roofing-cost-estimator",
    title: "Roofing Cost Estimator",
    desc: "Estimate roofing costs by area, materials, and region.",
  },
  {
    href: "/tools/painting-cost-estimator",
    slug: "painting-cost-estimator",
    title: "Painting Cost Estimator",
    desc: "Calculate paint, prep, and labor costs.",
  },
  {
    href: "/tools/hvac-sizing-calculator",
    slug: "hvac-sizing-calculator",
    title: "HVAC Sizing Calculator",
    desc: "Find the right HVAC size for your home.",
  },
  {
    href: "/tools/energy-savings-quiz",
    slug: "energy-savings-quiz",
    title: "Energy Savings Quiz",
    desc: "Discover ways to lower your energy bills.",
  },
  {
    href: "/tools/project-planner",
    slug: "project-planner",
    title: "Project Planner",
    desc: "Step-by-step checklists for major projects.",
  },
];

export default async function HomePage() {
  const posts = await getAllContent("blog");
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-24 text-white sm:py-28 lg:py-32">
        {/* Decorative floating elements */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-blue-500/20 blur-3xl motion-safe:animate-float" />
          <div className="absolute right-[15%] top-[30%] h-48 w-48 rounded-full bg-accent-400/10 blur-3xl motion-safe:animate-float [animation-delay:1s]" />
          <div className="absolute bottom-[10%] left-[30%] h-32 w-32 rounded-full bg-blue-400/15 blur-2xl motion-safe:animate-float [animation-delay:2s]" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Expert Home Repair Guides & Local Service Pros
            </h1>
            <p className="mt-6 text-lg text-blue-100 sm:text-xl">
              DIY tips, cost calculators, and home service guides —
              everything you need to keep your home in top shape.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
              <Button href="/contact" size="lg" variant="secondary">
                Contact Us
              </Button>
              <Button
                href="/blog"
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Browse DIY Guides
              </Button>
            </div>

            {/* Social Proof Counters */}
            <div className="mt-16 sm:mt-20">
              <SocialProofCounters />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-gray-100 bg-white py-8 sm:py-10">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
            {trustBadges.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-gray-700 sm:text-base">
                <Icon className="h-5 w-5 shrink-0 text-accent-500" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service Categories */}
      <section className="py-20 sm:py-24">
        <Container>
          <FadeInOnScroll>
            <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              Find Local Professionals
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
              Browse home service guides and cost information across
              10 major cities.
            </p>
          </FadeInOnScroll>
          <StaggeredCards className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {SERVICE_CATEGORIES.map((svc) => {
              const Icon = SERVICE_ICONS[svc.icon];
              return (
                <StaggeredItem key={svc.slug}>
                  <Card href={`/services/${svc.slug}`} className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      {Icon ? <Icon className="h-7 w-7" /> : null}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {svc.label}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      DIY guides, costs, and tips for{" "}
                      {svc.label.toLowerCase()} projects.
                    </p>
                  </Card>
                </StaggeredItem>
              );
            })}
          </StaggeredCards>
        </Container>
      </section>

      <SectionDivider variant="curve" color="#f9fafb" />

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-20 sm:py-24">
          <Container>
            <FadeInOnScroll>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Latest DIY Guides
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 shrink-0"
                >
                  View all &rarr;
                </Link>
              </div>
            </FadeInOnScroll>
            <StaggeredCards className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {recentPosts.map((post) => (
                <StaggeredItem key={post.slug}>
                  <Card href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {post.frontmatter.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {post.frontmatter.description}
                    </p>
                    {post.frontmatter.date && (
                      <p className="mt-3 text-xs text-gray-500">
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </Card>
                </StaggeredItem>
              ))}
            </StaggeredCards>
          </Container>
        </section>
      )}

      <SectionDivider variant="angle" color="#ffffff" flip />

      {/* Tools Showcase */}
      <section className="py-20 sm:py-24">
        <Container>
          <FadeInOnScroll>
            <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
              Free Tools & Calculators
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
              Plan your project, estimate costs, and make smarter decisions with
              our free tools.
            </p>
          </FadeInOnScroll>
          <StaggeredCards className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {tools.map((tool) => {
              const Icon = TOOL_ICONS[tool.slug];
              return (
                <StaggeredItem key={tool.href}>
                  <Card href={tool.href}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{tool.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{tool.desc}</p>
                  </Card>
                </StaggeredItem>
              );
            })}
          </StaggeredCards>
        </Container>
      </section>

      <SectionDivider variant="wave" color="#f9fafb" />

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-24 text-white sm:py-28">
        {/* Decorative accent orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-20 top-1/3 h-48 w-48 rounded-full bg-accent-400/10 blur-3xl" />
        </div>

        <Container className="relative">
          <FadeInOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mt-5 text-lg text-gray-300">
                Explore our DIY guides, use our free cost calculators, or
                reach out with questions about your next project.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                <Button href="/contact" size="lg">
                  Contact Us
                </Button>
                <Button
                  href="/tools"
                  size="lg"
                  variant="outline"
                  className="border-gray-500 text-white hover:bg-white/10"
                >
                  Try Our Tools
                </Button>
              </div>
            </div>
          </FadeInOnScroll>
        </Container>
      </section>

      <SchemaWebSite />
    </>
  );
}
