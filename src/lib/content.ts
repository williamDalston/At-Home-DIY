import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdown";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContentFrontmatter {
  title: string;
  description: string;
  date?: string;
  category?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  imageAlt?: string;
  faqs?: FAQ[];
  serviceType?: string;
  icon?: string;
  benefits?: string[];
  lastModified?: string;
  city?: string;
  state?: string;
}

export interface ContentItem {
  slug: string;
  frontmatter: ContentFrontmatter;
  content: string;
  htmlContent: string;
}

export async function getContentBySlug(
  directory: string,
  slug: string
): Promise<ContentItem> {
  const filePath = path.join(CONTENT_DIR, directory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);

  return {
    slug,
    frontmatter: data as ContentFrontmatter,
    content,
    htmlContent,
  };
}

export async function getAllContent(
  directory: string
): Promise<ContentItem[]> {
  const dirPath = path.join(CONTENT_DIR, directory);

  if (!fs.existsSync(dirPath)) return [];

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".md"));

  const items = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      return getContentBySlug(directory, slug);
    })
  );

  return items.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    }
    return 0;
  });
}

export async function getRelatedContent(
  directory: string,
  currentSlug: string,
  category: string,
  limit = 3
): Promise<ContentItem[]> {
  const all = await getAllContent(directory);
  return all
    .filter(
      (item) =>
        item.slug !== currentSlug && item.frontmatter.category === category
    )
    .slice(0, limit);
}
