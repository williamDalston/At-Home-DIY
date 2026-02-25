import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { getAllLocations } from "@/lib/locations";
import { BASE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/services",
    "/tools",
    "/tools/roofing-cost-estimator",
    "/tools/painting-cost-estimator",
    "/tools/hvac-sizing-calculator",
    "/tools/energy-savings-quiz",
    "/tools/project-planner",
    "/privacy-policy",
    "/terms",
  ];

  const posts = await getAllContent("blog");
  const services = await getAllContent("services");
  const locations = getAllLocations();

  return [
    ...staticPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.frontmatter.date
        ? new Date(post.frontmatter.date)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((svc) => ({
      url: `${BASE_URL}/services/${svc.frontmatter.serviceType || svc.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...services.flatMap((svc) =>
      locations.map((loc) => ({
        url: `${BASE_URL}/services/${svc.frontmatter.serviceType || svc.slug}/${loc.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    ),
  ];
}
