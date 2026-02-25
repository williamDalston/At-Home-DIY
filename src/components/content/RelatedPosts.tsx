import { Card } from "@/components/ui/Card";
import type { ContentItem } from "@/lib/content";

interface RelatedPostsProps {
  posts: ContentItem[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} href={`/blog/${post.slug}`}>
            <h3 className="font-semibold text-gray-900">
              {post.frontmatter.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
              {post.frontmatter.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
