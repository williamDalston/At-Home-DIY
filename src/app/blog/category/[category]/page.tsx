import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAllContent } from "@/lib/content";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { SERVICE_SLUG_ICONS } from "@/lib/icons";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ category: string }>;
}

const validCategories: string[] = SERVICE_CATEGORIES.map((s) => s.slug);

const categoryBadge: Record<string, "blue" | "green" | "yellow" | "orange" | "default"> = {
  plumbing: "blue",
  electrical: "yellow",
  roofing: "green",
  hvac: "blue",
  painting: "orange",
  landscaping: "green",
};

export async function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const svc = SERVICE_CATEGORIES.find((s) => s.slug === category);
  if (!svc) return {};

  return {
    title: `${svc.label} Guides & Tips`,
    description: `Expert ${svc.label.toLowerCase()} guides, DIY tips, and maintenance checklists for homeowners.`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const svc = SERVICE_CATEGORIES.find((s) => s.slug === category)!;
  const allPosts = await getAllContent("blog");
  const posts = allPosts.filter((p) => p.frontmatter.category === category);
  const Icon = SERVICE_SLUG_ICONS[category];

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: svc.label, href: `/blog/category/${category}` },
        ]}
      />

      <div className="flex items-center gap-4">
        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {svc.label} Guides
          </h1>
          <p className="mt-1 text-lg text-gray-600">
            Expert {svc.label.toLowerCase()} tips and step-by-step tutorials.
          </p>
        </div>
      </div>

      {/* Category nav */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          All
        </Link>
        {SERVICE_CATEGORIES.map((s) => (
          <Link
            key={s.slug}
            href={`/blog/category/${s.slug}`}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              s.slug === category
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">
            No {svc.label.toLowerCase()} guides yet. Check back soon!
          </p>
          <Link
            href="/blog"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse all guides
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} href={`/blog/${post.slug}`}>
              <div className="flex items-center gap-2">
                <Badge variant={categoryBadge[category] || "blue"}>
                  {category}
                </Badge>
                {post.frontmatter.date && (
                  <span className="text-xs text-gray-400">
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-lg font-semibold text-gray-900">
                {post.frontmatter.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {post.frontmatter.description}
              </p>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
