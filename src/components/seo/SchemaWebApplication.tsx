import { JsonLd } from "./JsonLd";
import { SITE_NAME, BASE_URL } from "@/lib/constants";

interface SchemaWebApplicationProps {
  name: string;
  description: string;
  url: string;
  category: string;
}

export function SchemaWebApplication({
  name,
  description,
  url,
  category,
}: SchemaWebApplicationProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url: `${BASE_URL}${url}`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE_URL,
        },
        about: {
          "@type": "Thing",
          name: category,
        },
      }}
    />
  );
}
