"use client";

import React from "react";

export interface RotatorTabItem {
  id: string | number;
  label?: string;
}

interface RotatorTabStripProps {
  items: RotatorTabItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
  dark?: boolean;
}

export function RotatorTabStrip({
  items,
  activeIndex,
  onSelect,
  className = "",
  dark = false,
}: RotatorTabStripProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        const label =
          item.label ||
          (typeof item.id === "number"
            ? `/${String(item.id + 1).padStart(2, "0")}`
            : String(item.id));

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(idx)}
            aria-selected={isActive}
            className={`font-mono text-xs tracking-widest transition-colors duration-300 py-2 cursor-pointer ${isActive
              ? "text-[#ff5a00] font-bold"
              : dark
                ? "text-[#666666] hover:text-[#a0a0a0]"
                : "text-[#b0b5bd] hover:text-[#737b88]"
              }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
