import { JsonLd } from "./JsonLd";
import { SITE_NAME, BASE_URL } from "@/lib/constants";

interface SchemaServiceProps {
  serviceType: string;
  description: string;
  areaServed?: string;
}

export function SchemaService({
  serviceType,
  description,
  areaServed,
}: SchemaServiceProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `${serviceType} Guide`,
        description,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE_URL,
        },
        about: {
          "@type": "Service",
          serviceType,
          ...(areaServed && {
            areaServed: {
              "@type": "City",
              name: areaServed,
            },
          }),
        },
      }}
    />
  );
}
