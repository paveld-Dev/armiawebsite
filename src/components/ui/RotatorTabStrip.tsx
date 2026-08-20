"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

export interface RotatorTabItem {
  id: string | number;
  label?: string;
}

interface RotatorTabStripProps {
  items: RotatorTabItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  scrollYProgress?: MotionValue<number>;
  layoutIdPrefix?: string;
  className?: string;
  dark?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  timerKey?: number;
  isPaused?: boolean;
}

export function RotatorTabStrip({
  items,
  activeIndex,
  onSelect,
  scrollYProgress,
  layoutIdPrefix = "rotator-tab",
  className = "",
  dark = false,
  autoAdvance = false,
  intervalMs = 4500,
  timerKey = 0,
  isPaused = false,
}: RotatorTabStripProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Square 48×48 Stroke Buttons */}
      <div className="flex items-center gap-2 md:gap-3" role="tablist">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          const label =
            item.label ||
            (typeof item.id === "number"
              ? `/${String(item.id + 1).padStart(2, "0")}`
              : String(item.id).startsWith("/")
              ? String(item.id)
              : `/${String(item.id).padStart(2, "0")}`);

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(idx)}
              className={`relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center font-mono text-[11px] md:text-xs tracking-wider border transition-colors duration-200 cursor-pointer select-none rounded-none overflow-hidden ${
                dark
                  ? isActive
                    ? "border-[#FF5C00] text-[#FF5C00] font-bold"
                    : "border-white/16 text-white/45 hover:border-[#FF5C00]/60 hover:text-white"
                  : isActive
                  ? "border-[#FF5C00] text-[#111111] font-bold"
                  : "border-black/16 text-black/45 hover:border-[#FF5C00]/60 hover:text-[#111111]"
              }`}
            >
              {/* Active-tab timed progress fill at bottom of button */}
              {isActive && autoAdvance && (
                <motion.div
                  key={`${activeIndex}-${timerKey}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPaused ? undefined : 1 }}
                  transition={{
                    duration: intervalMs / 1000,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] md:h-[3px] bg-[#FF5C00] z-20 pointer-events-none"
                />
              )}

              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {/* 1px Scroll / Overall Tab Indicator Line */}
      <div
        className={`relative w-full max-w-[240px] md:max-w-[280px] h-[1px] ${
          dark ? "bg-white/15" : "bg-black/15"
        } overflow-hidden`}
      >
        {scrollYProgress ? (
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full w-full bg-[#FF5C00]"
          />
        ) : (
          <motion.div
            animate={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
            transition={{ duration: 0.35, ease: EASE_CUSTOM }}
            className="h-full bg-[#FF5C00]"
          />
        )}
      </div>
    </div>
  );
}
