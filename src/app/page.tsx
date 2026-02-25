import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { StaggeredCards, StaggeredItem } from "@/components/motion/StaggeredCards";
import { SocialProofCounters } from "@/components/engagement/SocialProofCounters";
import { Testimonials } from "@/components/engagement/Testimonials";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { getAllContent } from "@/lib/content";

const iconMap: Record<string, string> = {
  wrench: "🔧",
  zap: "⚡",
  home: "🏠",
  thermometer: "🌡️",
  paintbrush: "🎨",
  tree: "🌳",
};

const tools = [
  {
    href: "/tools/roofing-cost-estimator",
    icon: "🏠",
    title: "Roofing Cost Estimator",
    desc: "Estimate roofing costs by area, materials, and region.",
  },
  {
    href: "/tools/painting-cost-estimator",
    icon: "🎨",
    title: "Painting Cost Estimator",
    desc: "Calculate paint, prep, and labor costs.",
  },
  {
    href: "/tools/hvac-sizing-calculator",
    icon: "🌡️",
    title: "HVAC Sizing Calculator",
    desc: "Find the right HVAC size for your home.",
  },
  {
    href: "/tools/energy-savings-quiz",
    icon: "⚡",
    title: "Energy Savings Quiz",
    desc: "Discover ways to lower your energy bills.",
  },
  {
    href: "/tools/project-planner",
    icon: "📋",
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
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Expert Home Repair Guides & Local Service Pros
            </h1>
            <p className="mt-6 text-lg text-blue-100">
              DIY tips, cost calculators, and trusted local contractors —
              everything you need to keep your home in top shape.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/contact" size="lg" variant="secondary">
                Get a Free Quote
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
            <div className="mt-14">
              <SocialProofCounters />
            </div>
          </div>
        </Container>
      </section>

      <SectionDivider variant="wave" color="#ffffff" />

      {/* Service Categories */}
      <section className="py-16">
        <Container>
          <FadeInOnScroll>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Find Local Professionals
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
              Connect with licensed, insured service providers in your area
              across 10 major cities.
            </p>
          </FadeInOnScroll>
          <StaggeredCards className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map((svc) => (
              <StaggeredItem key={svc.slug}>
                <Card href={`/services/${svc.slug}`} className="text-center">
                  <div className="mb-4 text-4xl">
                    {iconMap[svc.icon] || "🔧"}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {svc.label}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Find trusted {svc.label.toLowerCase()} professionals near
                    you.
                  </p>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredCards>
        </Container>
      </section>

      <SectionDivider variant="curve" color="#f9fafb" />

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <Container>
            <FadeInOnScroll>
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Latest DIY Guides
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View all &rarr;
                </Link>
              </div>
            </FadeInOnScroll>
            <StaggeredCards className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      <p className="mt-3 text-xs text-gray-400">
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
      <section className="py-16">
        <Container>
          <FadeInOnScroll>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Free Tools & Calculators
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
              Plan your project, estimate costs, and make smarter decisions with
              our free tools.
            </p>
          </FadeInOnScroll>
          <StaggeredCards className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <StaggeredItem key={tool.href}>
                <Card href={tool.href}>
                  <div className="mb-3 text-3xl">{tool.icon}</div>
                  <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{tool.desc}</p>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredCards>
        </Container>
      </section>

      <SectionDivider variant="wave" color="#f9fafb" />

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <Container>
          <FadeInOnScroll>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              What Homeowners Are Saying
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
              Real feedback from homeowners who used FixIt Finder for their
              projects.
            </p>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.2}>
            <div className="mt-10">
              <Testimonials limit={6} />
            </div>
          </FadeInOnScroll>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 text-white">
        <Container>
          <FadeInOnScroll>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mt-4 text-gray-300">
                Get free quotes from licensed professionals in your area. No
                obligation, no hassle.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button href="/contact" size="lg">
                  Get a Free Quote
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
    </>
  );
}
