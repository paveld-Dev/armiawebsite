"use client";

import { motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

interface GridLinesProps {
  light?: boolean;
  animate?: boolean;
  animationMode?: "all" | "center" | "none";
  className?: string;
}

const POSITIONS = [
  { left: "10.8%", hideOnMobile: false },
  { left: "30.3%", hideOnMobile: true },
  { left: "49.8%", hideOnMobile: false },
  { left: "69.3%", hideOnMobile: true },
  { left: "88.8%", hideOnMobile: false },
];

export function GridLines({
  light = false,
  animate = false,
  animationMode = "none",
  className = ""
}: GridLinesProps) {
  const color = light ? "bg-black/[0.05]" : "bg-white/[0.035]";

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <div className="relative h-full w-full max-w-[1920px] mx-auto">
        {POSITIONS.map((pos, i) => {
          let shouldAnimate = false;
          if (animate) {
            if (animationMode === "all") shouldAnimate = true;
            else if (animationMode === "center" && i > 0 && i < 4) shouldAnimate = true;
          }

          return (
            <motion.div
              key={pos.left}
              initial={shouldAnimate ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
              whileInView={shouldAnimate ? { scaleY: 1, opacity: 1 } : undefined}
              viewport={shouldAnimate ? { once: true } : undefined}
              transition={shouldAnimate ? { duration: 0.8, delay: i * 0.05, ease: EASE_CUSTOM } : undefined}
              style={{ left: pos.left, transformOrigin: "top" }}
              className={`absolute top-0 bottom-0 w-px ${color} ${pos.hideOnMobile ? "hidden md:block" : ""
                }`}
            />
          );
        })}
      </div>
    </div>
  );
}
