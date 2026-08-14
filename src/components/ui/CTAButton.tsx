"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  label: string;
  /** "dark" = black bg white text (default), "accent" = orange bg */
  variant?: "dark" | "accent";
  /** Width of the square arrow box */
  arrowSize?: number;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

/**
 * Shared CTA button used site-wide.
 * - Orange border sweep on hover (via .cta-sweep CSS class)
 * - Arrow box shifts 3px right on hover
 * - Background transition is fast (200ms)
 */
export function CTAButton({
  href,
  onClick,
  label,
  variant = "dark",
  arrowSize = 42,
  className = "",
  type = "button",
  disabled = false,
}: CTAButtonProps) {
  const baseClass = `
    cta-sweep group inline-flex items-center justify-between
    h-[42px] pl-5 font-mono text-[10px] tracking-[0.18em] uppercase font-semibold
    transition-colors duration-200 select-none
    ${variant === "dark"
      ? "bg-[#111111] text-white hover:bg-black"
      : "bg-brand-accent text-white hover:bg-[#ff4500]"
    }
    ${disabled ? "opacity-50 pointer-events-none" : ""}
    ${className}
  `.trim().replace(/\s+/g, " ");

  const arrowBox = (
    <motion.div
      className={`flex items-center justify-center shrink-0 transition-colors duration-200 ${
        variant === "dark"
          ? "bg-brand-accent group-hover:bg-[#ff4500]"
          : "bg-[#111111] group-hover:bg-black"
      }`}
      style={{ width: arrowSize, height: "100%" }}
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2, ease: EASE_CUSTOM }}
    >
      <span className="text-white text-xs font-bold">›</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={baseClass}>
        <span className="mr-4">{label}</span>
        {arrowBox}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      <span className="mr-4">{label}</span>
      {arrowBox}
    </button>
  );
}
