import { Container } from "@/components/ui/Container";

export default function BlogLoading() {
  return (
    <Container className="py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />

      {/* Title skeleton */}
      <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mt-3 h-5 w-96 animate-pulse rounded bg-gray-200" />

      {/* Cards grid skeleton */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 h-3 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </Container>
  );
}
