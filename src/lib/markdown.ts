import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

// Extend the default schema to allow id attributes (needed for heading anchors)
// and class attributes (for styling), while still blocking scripts/events.
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] || []), "id", "className"],
    a: [...(defaultSchema.attributes?.a || []), "href", "target", "rel"],
    img: [
      ...(defaultSchema.attributes?.img || []),
      "loading",
      "decoding",
      "alt",
      "src",
      "width",
      "height",
      "srcSet",
      "sizes",
    ],
  },
};

/** Rehype plugin: adds loading="lazy", decoding="async", and responsive srcset to <img> tags */
function rehypeLazyImages() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") {
        node.properties = node.properties || {};
        node.properties.loading = "lazy";
        node.properties.decoding = "async";

        const src = String(node.properties.src || "");
        if (src.startsWith("/")) {
          node.properties.width = node.properties.width || "800";
          node.properties.height = node.properties.height || "450";
          const widths = [400, 640, 800, 1200];
          node.properties.srcSet = widths
            .map((w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75 ${w}w`)
            .join(", ");
          node.properties.sizes = "(max-width: 768px) 100vw, 800px";
        }
      }
    });
  };
}

/** Rehype plugin: adds rel="noopener noreferrer" and target="_blank" to external links */
function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "a" &&
        typeof node.properties?.href === "string" &&
        /^https?:\/\//.test(node.properties.href)
      ) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
      }
    });
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeLazyImages)
    .use(rehypeExternalLinks)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

export function extractHeadings(
  html: string
): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>(?:<a[^>]*>)?(.*?)(?:<\/a>)?<\/h[23]>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ""),
    });
  }
  return headings;
}
