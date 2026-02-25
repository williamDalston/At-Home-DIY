import { getAllTestimonials, getTestimonialsByService } from "@/lib/testimonials";

interface TestimonialsProps {
  service?: string;
  limit?: number;
}

const accentColors = [
  "border-t-blue-500",
  "border-t-accent-400",
  "border-t-blue-400",
  "border-t-accent-500",
  "border-t-blue-600",
  "border-t-accent-600",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials({ service, limit }: TestimonialsProps) {
  const testimonials = service
    ? getTestimonialsByService(service)
    : getAllTestimonials();
  const displayed = limit ? testimonials.slice(0, limit) : testimonials;

  if (displayed.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayed.map((t, i) => (
        <div
          key={i}
          className={`relative rounded-xl border border-gray-200 border-t-2 bg-white p-6 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] ${accentColors[i % accentColors.length]}`}
        >
          {/* Decorative quote */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-3 text-5xl leading-none text-blue-100/60 select-none"
          >
            &ldquo;
          </span>

          <StarRating rating={t.rating} />
          <p className="relative mt-3 text-sm text-gray-700">
            &ldquo;{t.text}&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3">
            {/* Gradient ring avatar */}
            <div className="rounded-full bg-gradient-to-br from-blue-500 to-accent-400 p-0.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600">
                {t.name.charAt(0)}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">
                {t.city}, {t.state}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
