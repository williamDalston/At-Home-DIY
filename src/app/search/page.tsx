import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SearchClient } from "@/components/search/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search our blog guides and home service listings.",
};

export default function SearchPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Search", href: "/search" },
        ]}
      />
      <h1 className="text-4xl font-bold text-gray-900">Search</h1>
      <p className="mt-3 text-lg text-gray-600">
        Find DIY guides, home service information, and more.
      </p>
      <div className="mt-8">
        <SearchClient />
      </div>
    </Container>
  );
}
