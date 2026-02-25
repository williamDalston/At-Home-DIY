import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_NAME, CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get a free quote from trusted home service professionals. Contact ${SITE_NAME} for plumbing, electrical, roofing, and more.`,
};

export default function ContactPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-3 text-lg text-gray-600">
          Ready to start your project? Fill out the form below and we&apos;ll
          connect you with licensed professionals in your area.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Other Ways to Reach Us
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{CONTACT_PHONE}</p>
                </div>
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
                    <span>We match you with local professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      3
                    </span>
                    <span>Receive free quotes — no obligation</span>
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
