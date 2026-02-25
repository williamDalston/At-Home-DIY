interface SectionDividerProps {
  variant?: "wave" | "angle" | "curve";
  flip?: boolean;
  color?: string;
  className?: string;
}

export function SectionDivider({
  variant = "wave",
  flip = false,
  color = "#f9fafb",
  className = "",
}: SectionDividerProps) {
  const transform = flip ? "scale(1, -1)" : undefined;

  const paths: Record<string, string> = {
    wave: "M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,120 L0,120 Z",
    angle: "M0,80 L1440,0 L1440,120 L0,120 Z",
    curve: "M0,96 Q720,0 1440,96 L1440,120 L0,120 Z",
  };

  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} style={{ transform }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-12 w-full sm:h-16 lg:h-20"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
}
