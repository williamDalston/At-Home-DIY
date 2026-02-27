import { Container } from "@/components/ui/Container";

export default function LocationServiceLoading() {
  return (
    <Container className="py-8">
      <div className="mb-6 h-4 w-72 animate-pulse rounded bg-gray-200" />

      <div className="mx-auto max-w-4xl">
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Content lines */}
        <div className="mt-8 space-y-3">
          {[92, 85, 100, 78, 95, 82, 100, 88].map((w, i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-gray-200"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* Benefits skeleton */}
        <div className="mt-10">
          <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
