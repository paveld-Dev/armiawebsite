"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_CUSTOM } from "@/lib/motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

export function RevealText({
  text,
  className,
  delay = 0,
  as: Component = "h1",
}: RevealTextProps) {
  return (
    <Component className={cn("overflow-hidden leading-none", className)}>
      <motion.span
        className="inline-block transform-gpu"
        initial={{ y: "115%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 1.1,
          ease: EASE_CUSTOM,
          delay: delay,
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
}
