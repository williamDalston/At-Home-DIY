import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAllContent } from "@/lib/content";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & DIY Guides",
  description:
    "Expert home repair guides, DIY tips, and maintenance checklists. Learn how to tackle common household projects yourself.",
};

const POSTS_PER_PAGE = 6;

const categoryBadge: Record<string, "blue" | "green" | "yellow" | "orange" | "default"> = {
  plumbing: "blue",
  electrical: "yellow",
  roofing: "green",
  hvac: "blue",
  painting: "orange",
  landscaping: "green",
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const posts = await getAllContent("blog");

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const start = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-900">Blog & DIY Guides</h1>
      <p className="mt-3 text-lg text-gray-600">
        Expert tips, step-by-step guides, and maintenance checklists for homeowners.
      </p>

      {/* Category filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
          All
        </span>
        {SERVICE_CATEGORIES.map((s) => (
          <Link
            key={s.slug}
            href={`/blog/category/${s.slug}`}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {s.label}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No posts yet. Check back soon!
        </p>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <Card key={post.slug} href={`/blog/${post.slug}`}>
                <div className="flex items-center gap-2">
                  {post.frontmatter.category && (
                    <Badge
                      variant={
                        categoryBadge[post.frontmatter.category] || "blue"
                      }
                    >
                      {post.frontmatter.category}
                    </Badge>
                  )}
                  {post.frontmatter.date && (
                    <span className="text-xs text-gray-500">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="mt-10 flex items-center justify-center gap-2">
              {page > 1 ? (
                <Link
                  href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-300">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </span>
              )}

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={p === 1 ? "/blog" : `/blog?page=${p}`}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      p === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              {page < totalPages ? (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-300">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </nav>
          )}

          {/* Post count */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Showing {start + 1}–{Math.min(start + POSTS_PER_PAGE, posts.length)} of {posts.length} posts
          </p>
        </>
      )}
    </Container>
  );
}
