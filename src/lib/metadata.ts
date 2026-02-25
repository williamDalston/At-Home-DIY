import type { Metadata } from "next";
import type { ContentItem } from "./content";
import type { Location } from "./locations";

export function blogPostMetadata(post: ContentItem): Metadata {
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.image ? [post.frontmatter.image] : undefined,
    },
  };
}

export function servicePageMetadata(service: ContentItem): Metadata {
  return {
    title: service.frontmatter.title,
    description: service.frontmatter.description,
    keywords: service.frontmatter.keywords,
  };
}

export function cityLandingMetadata(
  service: ContentItem,
  location: Location
): Metadata {
  const title = `${service.frontmatter.title} in ${location.city}, ${location.state}`;
  const description = `Find trusted ${service.frontmatter.serviceType || service.slug} professionals in ${location.city}, ${location.state}. Licensed, insured, free estimates.`;

  return {
    title,
    description,
    keywords: [
      `${service.frontmatter.serviceType} ${location.city}`,
      `${service.frontmatter.serviceType} near me`,
      ...(service.frontmatter.keywords || []),
    ],
    openGraph: { title, description },
  };
}
