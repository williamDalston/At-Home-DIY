import { Container } from "@/components/ui/Container";

export default function ToolsLoading() {
  return (
    <Container className="py-8">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />
      <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mt-3 h-5 w-96 animate-pulse rounded bg-gray-200" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 h-12 w-12 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </Container>
  );
}
