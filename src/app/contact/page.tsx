import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_NAME, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Have a question about a home project? Contact ${SITE_NAME} for plumbing, electrical, roofing, HVAC, painting, and landscaping inquiries.`,
  keywords: [
    "contact us",
    "home service questions",
    "home project help",
    "ask a question",
    "hire contractor",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: `Have a question about a home project? Contact ${SITE_NAME} for plumbing, electrical, roofing, and more.`,
    images: [
      {
        url: "/api/og?title=Contact%20Us&subtitle=Get%20a%20free%20quote%20today&category=contact",
        width: 1200,
        height: 630,
        alt: `Contact ${SITE_NAME}`,
      },
    ],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const defaultService = params.service || "";

  return (
    <Container className="py-10 sm:py-12">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Have a question about a home project? Fill out the form below
          and our team will get back to you.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm defaultService={defaultService} />
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200/80 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Other Ways to Reach Us
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{CONTACT_EMAIL}</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900">What to Expect</h4>
                <ol className="mt-3 space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      1
                    </span>
                    <span>Submit your request with project details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      2
                    </span>
                    <span>We review your request and respond</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      3
                    </span>
                    <span>Receive helpful guidance — no obligation</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
