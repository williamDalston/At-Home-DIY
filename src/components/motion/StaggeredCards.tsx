"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface StaggeredCardsProps {
  children: React.ReactNode;
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const containerReduced: Variants = {
  hidden: {},
  show: {},
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const itemReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

export function StaggeredCards({ children, className = "" }: StaggeredCardsProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduce ? containerReduced : container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div variants={shouldReduce ? itemReduced : item} className={className}>
      {children}
    </motion.div>
  );
}
