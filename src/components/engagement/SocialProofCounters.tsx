"use client";

import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

export function SocialProofCounters() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <div className="text-center">
        <AnimatedCounter target={500} suffix="+" className="text-3xl font-bold text-white" />
        <p className="mt-1 text-sm text-blue-200">Local Contractors</p>
      </div>
      <div className="text-center">
        <AnimatedCounter target={10000} suffix="+" className="text-3xl font-bold text-white" />
        <p className="mt-1 text-sm text-blue-200">Homeowners Helped</p>
      </div>
      <div className="text-center">
        <AnimatedCounter target={9} suffix="" className="text-3xl font-bold text-white" />
        <p className="mt-1 text-sm text-blue-200">In-Depth Guides</p>
      </div>
      <div className="text-center">
        <AnimatedCounter target={10} suffix="" className="text-3xl font-bold text-white" />
        <p className="mt-1 text-sm text-blue-200">Cities Covered</p>
      </div>
    </div>
  );
}
