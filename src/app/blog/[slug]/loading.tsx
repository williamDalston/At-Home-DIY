import { Container } from "@/components/ui/Container";

export default function BlogPostLoading() {
  return (
    <Container className="py-8">
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200" />

      <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
        <div>
          {/* Meta row */}
          <div className="flex gap-3">
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          </div>
          {/* Title */}
          <div className="mt-4 h-10 w-full animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-10 w-3/4 animate-pulse rounded bg-gray-200" />
          {/* Author */}
          <div className="mt-3 h-4 w-40 animate-pulse rounded bg-gray-200" />

          {/* Content lines */}
          <div className="mt-8 space-y-3">
            {[95, 82, 100, 78, 90, 85, 100, 76, 92, 88, 100, 80].map((w, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-gray-200"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>

        {/* Sidebar TOC skeleton */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-2">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            {[80, 65, 90, 72, 85].map((w, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-gray-200"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
