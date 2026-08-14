"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HighlightWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  emphasized?: boolean;
}

export function HighlightWord({ word, progress, range, emphasized }: HighlightWordProps) {
  const reducedMotion = useReducedMotion();

  // Fine-tuned smooth color transition: #999999 -> #666666 -> #111111
  const color = useTransform(
    progress,
    [range[0], (range[0] + range[1]) / 2, range[1]],
    reducedMotion ? ["#111111", "#111111", "#111111"] : ["#999999", "#666666", "#111111"]
  );

  return (
    <motion.span
      style={{ color }}
      className={`inline-block mr-[0.26em] ${emphasized ? "font-semibold text-foreground" : "font-normal"}`}
    >
      {word}
    </motion.span>
  );
}
