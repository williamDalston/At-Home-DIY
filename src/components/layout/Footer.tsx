import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SchemaOrganization } from "@/components/seo/SchemaOrganization";
import { SITE_NAME, SERVICE_CATEGORIES } from "@/lib/constants";
import { NewsletterSignup } from "@/components/engagement/NewsletterSignup";

export function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300">
      {/* Gradient top border */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-accent-400 to-blue-500"
      />

      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-white">{SITE_NAME}</h3>
            <p className="mt-2 text-sm text-gray-400">
              Expert DIY guides and trusted local home service professionals.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
              Services
            </h4>
            <ul className="mt-3 space-y-2">
              {SERVICE_CATEGORIES.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-sm text-gray-400 transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:text-accent-400 focus-visible:underline"
                  >
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
              Resources
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-400 transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:text-accent-400 focus-visible:underline">
                  Blog &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-gray-400 transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:text-accent-400 focus-visible:underline">
                  Tools &amp; Calculators
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:text-accent-400 focus-visible:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <NewsletterSignup variant="footer" />
        </div>

        <div className="mt-10 border-t border-gray-700/50 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:text-accent-400 focus-visible:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent-400 focus-visible:outline-none focus-visible:text-accent-400 focus-visible:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
      <SchemaOrganization />
    </footer>
  );
}
