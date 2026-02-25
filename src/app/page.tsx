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
import { SERVICE_ICONS, TOOL_ICONS } from "@/lib/icons";
import { getAllContent } from "@/lib/content";

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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-20 text-white">
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
                      Find trusted {svc.label.toLowerCase()} professionals near
                      you.
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
        <section className="bg-gray-50 py-16">
          <Container>
            <FadeInOnScroll>
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Latest DIY Guides
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
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
            {tools.map((tool) => {
              const Icon = TOOL_ICONS[tool.slug];
              return (
                <StaggeredItem key={tool.href}>
                  <Card href={tool.href}>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </div>
                    <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{tool.desc}</p>
                  </Card>
                </StaggeredItem>
              );
            })}
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
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-20 text-white">
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
