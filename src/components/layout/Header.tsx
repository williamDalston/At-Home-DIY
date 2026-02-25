import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { SITE_NAME, NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            {SITE_NAME}
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Get a Free Quote
            </Link>
          </nav>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
