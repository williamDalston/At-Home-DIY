import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function Card({ children, href, className = "" }: CardProps) {
  const classes = `group relative rounded-xl border border-gray-200 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 overflow-hidden ${className}`;

  const accentBar = (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-accent-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
  );

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {accentBar}
        {children}
      </Link>
    );
  }

  return (
    <div className={classes}>
      {accentBar}
      {children}
    </div>
  );
}
