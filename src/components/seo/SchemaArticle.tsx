import { JsonLd } from "./JsonLd";
import { SITE_NAME, BASE_URL } from "@/lib/constants";

interface SchemaArticleProps {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
  slug: string;
}

export function SchemaArticle({
  title,
  description,
  datePublished,
  dateModified,
  author = "Editorial Team",
  image,
  slug,
}: SchemaArticleProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Person",
          name: author,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE_URL,
        },
        mainEntityOfPage: `${BASE_URL}/blog/${slug}`,
        ...(image && { image: `${BASE_URL}${image}` }),
      }}
    />
  );
}
