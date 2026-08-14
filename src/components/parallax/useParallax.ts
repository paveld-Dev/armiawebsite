"use client";

import { useState, useEffect } from "react";
import { MotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useParallax(
  progress: MotionValue<number>,
  distance: number,
  reverse: boolean = false
) {
  const reducedMotion = useReducedMotion();
  
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const actualDistance = isMobile ? distance * 0.15 : distance;

  // Using y-values mapped from progress
  const start = reverse ? actualDistance : -actualDistance;
  const end = reverse ? -actualDistance : actualDistance;
  
  // Create standard transform
  const transform = useTransform(progress, [0, 1], [start, end]);
  const staticTransform = useTransform(progress, [0, 1], [0, 0]);

  return reducedMotion ? staticTransform : transform;
}
