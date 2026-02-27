import { JsonLd } from "./JsonLd";
import { SITE_NAME, BASE_URL, CONTACT_EMAIL } from "@/lib/constants";

export function SchemaOrganization() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          contactType: "Customer Service",
        },
      }}
    />
  );
}
