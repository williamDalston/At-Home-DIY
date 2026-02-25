import { JsonLd } from "./JsonLd";
import { BASE_URL } from "@/lib/constants";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface SchemaBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function SchemaBreadcrumb({ items }: SchemaBreadcrumbProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${BASE_URL}${item.href}`,
        })),
      }}
    />
  );
}
