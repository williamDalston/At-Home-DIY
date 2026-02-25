import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "blog" | "service";
  category?: string;
}

export async function GET() {
  const [blogs, services] = await Promise.all([
    getAllContent("blog"),
    getAllContent("services"),
  ]);

  const items: SearchItem[] = [
    ...blogs.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description || "",
      href: `/blog/${post.slug}`,
      type: "blog" as const,
      category: post.frontmatter.category,
    })),
    ...services.map((svc) => ({
      title: svc.frontmatter.title,
      description: svc.frontmatter.description || "",
      href: `/services/${svc.slug}`,
      type: "service" as const,
      category: svc.frontmatter.serviceType || svc.slug,
    })),
  ];

  return NextResponse.json(items, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
