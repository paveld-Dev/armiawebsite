"use client";

import React from "react";
import { MotionValue } from "framer-motion";
import { useGlobalScroll } from "./ScrollProgressProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PinnedStageProps {
  scrollHeight: string; // e.g. "160vh" or "400vh"
  className?: string;
  children: (progress: MotionValue<number>) => React.ReactNode;
}

export function PinnedStage({ scrollHeight, className = "", children }: PinnedStageProps) {
  const { globalProgress } = useGlobalScroll();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <section className={`relative w-full overflow-hidden ${className}`}>
        {children(globalProgress)}
      </section>
    );
  }

  return (
    <section style={{ height: scrollHeight }} className={`relative w-full ${className}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {children(globalProgress)}
      </div>
    </section>
  );
}
