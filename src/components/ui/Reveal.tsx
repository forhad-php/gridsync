"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Kept small (8–20) so movement reads as settling, not entertainment. */
  y?: number;
  as?: "div" | "li" | "section" | "figure";
};

/** Slow fade + short vertical settle when the element enters the viewport. No-op for reduced motion. */
export function Reveal({ children, className, delay = 0, y = 12, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </Tag>
  );
}
