"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-1">
        <Link
          href="/search"
          className="flex h-11 w-11 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Link>
        <button
          ref={menuButtonRef}
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center text-gray-600 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <>
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          aria-hidden="true"
          onClick={close}
        />
        <div id="mobile-menu" className="absolute left-0 right-0 top-full z-50 border-b border-gray-200 bg-white shadow-lg">
          <nav aria-label="Mobile navigation" className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <div className="px-6 pt-3">
              <Link
                href="/contact"
                className="block rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-center font-semibold text-white shadow-md shadow-blue-600/20 hover:from-blue-700 hover:to-blue-800"
                onClick={() => setOpen(false)}
              >
                Get a Free Quote
              </Link>
            </div>
          </nav>
        </div>
        </>
      )}
    </div>
  );
}
