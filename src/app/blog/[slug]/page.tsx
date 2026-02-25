import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { SchemaHowTo } from "@/components/seo/SchemaHowTo";
import { SchemaArticle } from "@/components/seo/SchemaArticle";
import { ReadingProgressBar } from "@/components/engagement/ReadingProgressBar";
import { NewsletterSignup } from "@/components/engagement/NewsletterSignup";
import { AskExpertForm } from "@/components/engagement/AskExpertForm";
import { Container } from "@/components/ui/Container";
import { getAllContent, getContentBySlug, getRelatedContent } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllContent("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getContentBySlug("blog", slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      keywords: post.frontmatter.keywords,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        publishedTime: post.frontmatter.date,
        images: post.frontmatter.image ? [post.frontmatter.image] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getContentBySlug("blog", slug);
  } catch {
    notFound();
  }

  const relatedPosts = post.frontmatter.category
    ? await getRelatedContent("blog", slug, post.frontmatter.category)
    : [];

  const isHowTo = post.frontmatter.title.toLowerCase().includes("how to");

  return (
    <>
      <ReadingProgressBar />
      <ArticleLayout
        post={post}
        relatedPosts={relatedPosts}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.frontmatter.title, href: `/blog/${slug}` },
        ]}
      />
      <Container className="mx-auto max-w-3xl space-y-8 pb-12">
        <NewsletterSignup variant="banner" />
        <AskExpertForm />
      </Container>
      {isHowTo && (
        <SchemaHowTo
          name={post.frontmatter.title}
          steps={extractSteps(post.htmlContent)}
        />
      )}
      <SchemaArticle
        title={post.frontmatter.title}
        description={post.frontmatter.description || ""}
        datePublished={post.frontmatter.date || ""}
        slug={slug}
      />
    </>
  );
}

function extractSteps(html: string): string[] {
  const steps: string[] = [];
  const regex = /<li>(.*?)<\/li>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, "").trim();
    if (text.length > 10) {
      steps.push(text);
    }
  }
  return steps.slice(0, 10);
}
