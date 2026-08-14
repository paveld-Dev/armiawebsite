"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";

interface LineRevealProps {
  lines: { text: string; emphasized?: boolean }[];
  className?: string;
  delay?: number;
}

export function LineReveal({ lines, className, delay = 0 }: LineRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <h2 className={`flex flex-col space-y-1 font-sans ${className || ""}`}>
      {lines.map((line, index) => (
        <span key={index} className="overflow-hidden block py-0.5 leading-tight">
          <motion.span
            initial={reducedMotion ? { opacity: 1, y: 0 } : { y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.85,
              ease: EASE_CUSTOM,
              delay: delay + index * 0.07,
            }}
            className={`inline-block ${
              line.emphasized
                ? "text-foreground font-normal"
                : "text-[#77736f] font-normal"
            }`}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
