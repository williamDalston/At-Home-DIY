"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "blog" | "service";
  category?: string;
}

const categoryBadge: Record<string, "blue" | "green" | "yellow" | "orange" | "default"> = {
  plumbing: "blue",
  electrical: "yellow",
  roofing: "green",
  hvac: "blue",
  painting: "orange",
  landscaping: "green",
};

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/search")
      .then((res) => res.json())
      .then((data: SearchItem[]) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      const text = `${item.title} ${item.description} ${item.category || ""}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [query, items]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Search guides, services, tips..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-lg text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Search"
        />
      </div>

      {loading && (
        <p className="mt-6 text-center text-gray-400">Loading search index...</p>
      )}

      {!loading && query.trim() && (
        <div className="mt-6">
          {results.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-gray-500">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Try different keywords or browse our{" "}
                <Link href="/blog" className="text-blue-600 hover:underline">
                  blog
                </Link>{" "}
                or{" "}
                <Link href="/services" className="text-blue-600 hover:underline">
                  services
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-gray-400">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
              <ul className="space-y-3">
                {results.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                          {item.type === "blog" ? (
                            <BookOpen className="h-4 w-4" />
                          ) : (
                            <Wrench className="h-4 w-4" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                              {item.title}
                            </h3>
                            {item.category && (
                              <Badge
                                variant={categoryBadge[item.category] || "default"}
                              >
                                {item.category}
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {!loading && !query.trim() && (
        <div className="mt-8 text-center text-gray-400">
          <Search className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p>Start typing to search across all guides and services.</p>
        </div>
      )}
    </div>
  );
}
