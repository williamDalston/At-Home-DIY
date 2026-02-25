import { JsonLd } from "./JsonLd";
import { SITE_NAME, BASE_URL, CONTACT_PHONE } from "@/lib/constants";

export function SchemaOrganization() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: CONTACT_PHONE,
          contactType: "Customer Service",
        },
      }}
    />
  );
}
