import Link from "next/link";
import { SchemaBreadcrumb } from "@/components/seo/SchemaBreadcrumb";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span className="text-gray-900">{item.name}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:text-blue-600 focus-visible:underline">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <SchemaBreadcrumb items={items} />
    </>
  );
}
