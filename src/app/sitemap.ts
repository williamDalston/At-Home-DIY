import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllContent } from "@/lib/content";
import { getAllLocations } from "@/lib/locations";
import { BASE_URL, SERVICE_CATEGORIES } from "@/lib/constants";

/** Get the real modification time for a content file. */
function getFileMtime(directory: string, slug: string): Date {
  try {
    const filePath = path.join(process.cwd(), "content", directory, `${slug}.md`);
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date("2026-02-01");
  }
}

/** Site launch / last structural update date — used for pages without file-backed content. */
const SITE_UPDATED = new Date("2026-02-27");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: { path: string; priority: number; changeFreq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, changeFreq: "weekly" },
    { path: "/about", priority: 0.6, changeFreq: "monthly" },
    { path: "/contact", priority: 0.7, changeFreq: "monthly" },
    { path: "/blog", priority: 0.9, changeFreq: "weekly" },
    { path: "/services", priority: 0.9, changeFreq: "weekly" },
    { path: "/tools", priority: 0.8, changeFreq: "monthly" },
    { path: "/tools/roofing-cost-estimator", priority: 0.7, changeFreq: "monthly" },
    { path: "/tools/painting-cost-estimator", priority: 0.7, changeFreq: "monthly" },
    { path: "/tools/hvac-sizing-calculator", priority: 0.7, changeFreq: "monthly" },
    { path: "/tools/energy-savings-quiz", priority: 0.7, changeFreq: "monthly" },
    { path: "/tools/project-planner", priority: 0.7, changeFreq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFreq: "monthly" },
    { path: "/terms", priority: 0.3, changeFreq: "monthly" },
  ];

  const posts = await getAllContent("blog");
  const services = await getAllContent("services");
  const locations = getAllLocations();

  return [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: SITE_UPDATED,
      changeFrequency: page.changeFreq,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.frontmatter.date
        ? new Date(post.frontmatter.date)
        : getFileMtime("blog", post.slug),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((svc) => ({
      url: `${BASE_URL}/services/${svc.frontmatter.serviceType || svc.slug}`,
      lastModified: getFileMtime("services", svc.slug),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...services.flatMap((svc) =>
      locations.map((loc) => ({
        url: `${BASE_URL}/services/${svc.frontmatter.serviceType || svc.slug}/${loc.slug}`,
        lastModified: getFileMtime("services", svc.slug),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    ),
    ...SERVICE_CATEGORIES.map((cat) => ({
      url: `${BASE_URL}/blog/category/${cat.slug}`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
