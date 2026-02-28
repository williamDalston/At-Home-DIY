import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdown";
import type { ContentItem, ContentFrontmatter } from "./content";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Location {
  city: string;
  state: string;
  slug: string;
  population?: number;
  climate?: string;
  avgHomeAge?: string;
  costIndex?: number;
  permitNote?: string;
  weatherChallenges?: string[];
  topConcerns?: string[];
}

export function getAllLocations(): Location[] {
  const filePath = path.join(CONTENT_DIR, "locations", "locations.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Location[];
}

export function getLocationBySlug(slug: string): Location | undefined {
  return getAllLocations().find((loc) => loc.slug === slug);
}

export async function getServiceLocationContent(
  service: string,
  locationSlug: string
): Promise<ContentItem | null> {
  const overridePath = path.join(
    CONTENT_DIR,
    "locations",
    "overrides",
    `${service}--${locationSlug}.md`
  );

  if (fs.existsSync(overridePath)) {
    const fileContents = fs.readFileSync(overridePath, "utf-8");
    const { data, content } = matter(fileContents);
    const htmlContent = await markdownToHtml(content);
    return {
      slug: `${service}--${locationSlug}`,
      frontmatter: data as ContentFrontmatter,
      content,
      htmlContent,
    };
  }

  return null;
}

export function generateCityServiceParams(): Array<{
  service: string;
  location: string;
}> {
  const locations = getAllLocations();
  const servicesDir = path.join(CONTENT_DIR, "services");

  if (!fs.existsSync(servicesDir)) return [];

  const services = fs
    .readdirSync(servicesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));

  return services.flatMap((service) =>
    locations.map((loc) => ({
      service,
      location: loc.slug,
    }))
  );
}
