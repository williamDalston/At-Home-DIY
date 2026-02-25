import { Container } from "@/components/ui/Container";

export default function ServicesLoading() {
  return (
    <Container className="py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />

      {/* Title skeleton */}
      <div className="h-10 w-72 animate-pulse rounded bg-gray-200" />
      <div className="mt-3 h-5 w-96 animate-pulse rounded bg-gray-200" />

      {/* Service cards skeleton */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6 text-center"
          >
            <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-gray-200" />
            <div className="mx-auto mt-4 h-5 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mx-auto mt-2 h-4 w-40 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </Container>
  );
}
