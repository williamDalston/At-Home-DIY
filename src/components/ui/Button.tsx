import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-600/30",
  secondary:
    "bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 hover:border-gray-300",
  outline:
    "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700",
};

const sizes = {
  sm: "px-3 py-2 text-sm min-h-[36px]",
  md: "px-5 py-2.5 text-base min-h-[44px]",
  lg: "px-7 py-3.5 text-lg min-h-[48px]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
