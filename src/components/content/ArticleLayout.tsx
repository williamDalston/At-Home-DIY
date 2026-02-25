import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReadingTime } from "./ReadingTime";
import { TableOfContents } from "./TableOfContents";
import { StickyTableOfContents } from "./StickyTableOfContents";
import { FAQSection } from "./FAQSection";
import { ShareButtons } from "./ShareButtons";
import { RelatedPosts } from "./RelatedPosts";
import { InternalLinks } from "./InternalLinks";
import { extractHeadings } from "@/lib/markdown";
import { estimateReadingTime } from "@/lib/reading-time";
import type { ContentItem } from "@/lib/content";

interface ArticleLayoutProps {
  post: ContentItem;
  relatedPosts?: ContentItem[];
  breadcrumbs: Array<{ name: string; href: string }>;
  children?: React.ReactNode;
}

export function ArticleLayout({
  post,
  relatedPosts = [],
  breadcrumbs,
  children,
}: ArticleLayoutProps) {
  const { frontmatter, htmlContent, content } = post;
  const headings = extractHeadings(htmlContent);
  const { minutes } = estimateReadingTime(content);

  return (
    <Container className="py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {frontmatter.category && (
                <Badge variant="blue">{frontmatter.category}</Badge>
              )}
              {frontmatter.date && (
                <time className="text-sm text-gray-500">
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <ReadingTime minutes={minutes} />
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
              {frontmatter.title}
            </h1>
            {frontmatter.author && (
              <p className="mt-2 text-gray-600">By {frontmatter.author}</p>
            )}
            {frontmatter.lastModified && (
              <p className="mt-1 text-xs text-gray-400">
                Last updated:{" "}
                {new Date(frontmatter.lastModified).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </header>

          {/* Mobile TOC */}
          <div className="lg:hidden">
            <TableOfContents html={htmlContent} />
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* CTA with gradient border */}
          <div className="mt-10 rounded-xl bg-gradient-to-r from-blue-500 to-accent-400 p-[2px]">
            <div className="rounded-[10px] bg-white p-6 text-center">
              <h3 className="text-lg font-bold text-gray-900">
                Need Professional Help?
              </h3>
              <p className="mt-2 text-gray-600">
                Get free quotes from licensed professionals in your area.
              </p>
              <div className="mt-4">
                <Button href="/contact">Get a Free Quote</Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <ShareButtons title={frontmatter.title} />
          </div>

          {frontmatter.faqs && frontmatter.faqs.length > 0 && (
            <FAQSection faqs={frontmatter.faqs} />
          )}

          {frontmatter.category && (
            <InternalLinks
              category={frontmatter.category}
              currentSlug={post.slug}
            />
          )}

          {children}

          <RelatedPosts posts={relatedPosts} />
        </article>

        {/* Desktop Sticky TOC */}
        <aside className="hidden lg:block">
          <StickyTableOfContents headings={headings} />
        </aside>
      </div>
    </Container>
  );
}
