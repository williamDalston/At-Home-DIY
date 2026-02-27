"use client";

import { Users, Home, BookOpen, MapPin } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

const counters = [
  { target: 6, suffix: "", label: "Service Categories", Icon: Users },
  { target: 14, suffix: "", label: "In-Depth Guides", Icon: BookOpen },
  { target: 5, suffix: "", label: "Free Tools", Icon: Home },
  { target: 10, suffix: "", label: "Cities Covered", Icon: MapPin },
];

export function SocialProofCounters() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
      {counters.map(({ target, suffix, label, Icon }, i) => (
        <div
          key={label}
          className={`flex flex-col items-center rounded-xl bg-white/10 p-4 backdrop-blur-sm sm:rounded-none sm:bg-transparent sm:backdrop-blur-none ${
            i < counters.length - 1
              ? "sm:border-r sm:border-white/20"
              : ""
          }`}
        >
          <Icon className="mb-2 h-6 w-6 text-white/80" />
          <AnimatedCounter
            target={target}
            suffix={suffix}
            className="text-3xl font-bold text-white"
          />
          <p className="mt-1 text-sm text-blue-200">{label}</p>
        </div>
      ))}
    </div>
  );
}
