import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAllContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog & DIY Guides",
  description:
    "Expert home repair guides, DIY tips, and maintenance checklists. Learn how to tackle common household projects yourself.",
};

export default async function BlogIndexPage() {
  const posts = await getAllContent("blog");

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

      {posts.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} href={`/blog/${post.slug}`}>
              <div className="flex items-center gap-2">
                {post.frontmatter.category && (
                  <Badge variant="blue">{post.frontmatter.category}</Badge>
                )}
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
