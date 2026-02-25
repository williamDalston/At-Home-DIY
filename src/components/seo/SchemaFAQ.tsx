import { JsonLd } from "./JsonLd";
import type { FAQ } from "@/lib/content";

interface SchemaFAQProps {
  faqs: FAQ[];
}

export function SchemaFAQ({ faqs }: SchemaFAQProps) {
  if (faqs.length === 0) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
