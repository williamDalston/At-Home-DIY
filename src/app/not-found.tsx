import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_NAME, SERVICE_CATEGORIES } from "@/lib/constants";
import { Search, Home, BookOpen, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="py-16 text-center">
      {/* Decorative gradient number */}
      <div className="relative mx-auto mb-6 w-fit">
        <span
          aria-hidden="true"
          className="text-[10rem] font-black leading-none tracking-tighter bg-gradient-to-br from-blue-600 via-accent-400 to-blue-600 bg-clip-text text-transparent select-none"
        >
          404
        </span>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"
        />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try one of the links below to get back on track.
      </p>

      {/* Primary actions */}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href="/">
          <Home className="mr-2 h-4 w-4" />
          Go Home
        </Button>
        <Button href="/blog" variant="outline">
          <BookOpen className="mr-2 h-4 w-4" />
          Browse Guides
        </Button>
        <Button href="/search" variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Search Site
        </Button>
      </div>

      {/* Quick service links */}
      <div className="mx-auto mt-14 max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Popular Services
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {SERVICE_CATEGORIES.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <Wrench className="mr-1.5 inline-block h-3.5 w-3.5" />
              {svc.label}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
