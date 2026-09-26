"use client";

import { MotionConfig } from "framer-motion";

/** Makes every Framer Motion transform respect the visitor's reduced-motion preference. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
