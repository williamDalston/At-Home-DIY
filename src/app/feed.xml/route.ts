import { getAllContent } from "@/lib/content";
import { SITE_NAME, SITE_DESCRIPTION, BASE_URL } from "@/lib/constants";

export async function GET() {
  const posts = await getAllContent("blog");

  const items = posts
    .map((post) => {
      const pubDate = post.frontmatter.date
        ? new Date(post.frontmatter.date).toUTCString()
        : new Date().toUTCString();
      const link = `${BASE_URL}/blog/${post.slug}`;

      return `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${post.frontmatter.description || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.frontmatter.category ? `<category>${post.frontmatter.category}</category>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${BASE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
