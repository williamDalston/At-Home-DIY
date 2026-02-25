import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SchemaOrganization } from "@/components/seo/SchemaOrganization";
import { SITE_NAME, SERVICE_CATEGORIES } from "@/lib/constants";
import { NewsletterSignup } from "@/components/engagement/NewsletterSignup";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{SITE_NAME}</h3>
            <p className="mt-2 text-sm text-gray-600">
              Expert DIY guides and trusted local home service professionals.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Services
            </h4>
            <ul className="mt-3 space-y-2">
              {SERVICE_CATEGORIES.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Resources
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600">
                  Blog &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-gray-600 hover:text-blue-600">
                  Tools &amp; Calculators
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <NewsletterSignup variant="footer" />
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
      <SchemaOrganization />
    </footer>
  );
}
