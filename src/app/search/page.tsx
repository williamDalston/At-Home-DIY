import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SearchClient } from "@/components/search/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search our DIY guides, home service information, and cost calculators.",
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <Container className="py-10 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Search", href: "/search" },
        ]}
      />
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Search</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Find DIY guides, home service information, and more.
      </p>
      <div className="mt-10">
        <SearchClient />
      </div>
    </Container>
  );
}
