"use client";

import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface StickyTableOfContentsProps {
  headings: Heading[];
}

export function StickyTableOfContents({ headings }: StickyTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        On this page
      </h2>
      <ul className="space-y-1.5 border-l-2 border-gray-100">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-2" : ""}>
            <a
              href={`#${heading.id}`}
              className={`block border-l-2 -ml-[2px] py-1 pl-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-r-sm ${
                activeId === heading.id
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
