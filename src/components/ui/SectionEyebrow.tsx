// src/components/ui/SectionEyebrow.tsx
"use client";

import { motion } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";

interface SectionEyebrowProps {
  /** Two-digit section index, e.g. "06" */
  number: string;
  /** Section label, e.g. "TESTIMONIALS" */
  label: string;
  /** Use on dark-background sections (footer) */
  dark?: boolean;
  className?: string;
}

/**
 * Every section was rolling its own eyebrow markup with slightly different
 * font sizes, tracking, and number/label formatting:
 *   - Testimonials: "06" and "TESTIMONIALS" as two separate spans, text-[9px]/[10px]
 *   - FAQ:          "07 FAQ" as ONE combined string, text-[8px]/[9px]
 *   - Blog:         "08 BLOG" as ONE combined string, text-[8px]/[9px]
 *   - Footer:       no number at all, despite page.tsx labeling it "Section 09"
 *
 * This component is the single source of truth going forward — same size,
 * same tracking, same dot, same two-span structure, on every section.
 */
export function SectionEyebrow({
  number,
  label,
  dark = false,
  className = "",
}: SectionEyebrowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE_CUSTOM }}
      className={`flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.16em] uppercase mb-8 ${
        dark ? "text-white/60" : "text-[#6f6f6f]"
      } ${className}`}
    >
      <span className="h-[5px] w-[5px] bg-brand-accent inline-block" />
      <span>{number}</span>
      <span>{label}</span>
    </motion.div>
  );
}
