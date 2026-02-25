"use client";

import { useState } from "react";
import { SchemaFAQ } from "@/components/seo/SchemaFAQ";
import type { FAQ } from "@/lib/content";

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span>{faq.question}</span>
              <span
                className={`ml-4 shrink-0 text-gray-400 transition-transform duration-200 motion-safe:transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 motion-reduce:duration-0 ${
                openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SchemaFAQ faqs={faqs} />
    </section>
  );
}
