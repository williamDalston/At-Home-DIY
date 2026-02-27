import Link from "next/link";
import { getAllContent } from "@/lib/content";

// Map service categories to their matching tool pages
const CATEGORY_TOOL_MAP: Record<string, { label: string; href: string }> = {
  roofing: {
    label: "Roofing Cost Estimator",
    href: "/tools/roofing-cost-estimator",
  },
  painting: {
    label: "Painting Cost Estimator",
    href: "/tools/painting-cost-estimator",
  },
  hvac: {
    label: "HVAC Sizing Calculator",
    href: "/tools/hvac-sizing-calculator",
  },
  electrical: {
    label: "Energy Savings Quiz",
    href: "/tools/energy-savings-quiz",
  },
  plumbing: {
    label: "Project Planner",
    href: "/tools/project-planner",
  },
  landscaping: {
    label: "Project Planner",
    href: "/tools/project-planner",
  },
};

interface InternalLinksProps {
  /** Current page category (e.g. "roofing", "hvac") */
  category: string;
  /** Slug to exclude from related posts (the current page) */
  currentSlug?: string;
  /** Maximum number of related blog posts to show */
  limit?: number;
}

export async function InternalLinks({
  category,
  currentSlug,
  limit = 3,
}: InternalLinksProps) {
  const allPosts = await getAllContent("blog");
  const relatedPosts = allPosts
    .filter(
      (p) => p.frontmatter.category === category && p.slug !== currentSlug
    )
    .slice(0, limit);

  const tool = CATEGORY_TOOL_MAP[category];
  const serviceHref = `/services/${category}`;

  // If no related content at all, don't render
  if (relatedPosts.length === 0 && !tool) return null;

  return (
    <aside className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="text-lg font-bold text-gray-900">Related Resources</h3>
      <ul className="mt-3 space-y-2">
        {relatedPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.frontmatter.title}
            </Link>
          </li>
        ))}
        <li>
          <Link href={serviceHref} className="text-blue-600 hover:underline">
            {category.charAt(0).toUpperCase() + category.slice(1)} Services
          </Link>
        </li>
        {tool && (
          <li>
            <Link href={tool.href} className="text-blue-600 hover:underline">
              {tool.label}
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
