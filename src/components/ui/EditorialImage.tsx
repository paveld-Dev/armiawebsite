"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CUSTOM } from "@/lib/motion";

interface EditorialImageProps {
  src: string;
  alt: string;
  categoryTag?: string;
  metaRows?: { label: string; value: string }[];
  className?: string;
}

export function EditorialImage({
  src,
  alt,
  categoryTag = "ENGINEERING / 01",
  metaRows = [
    { label: "DIGITAL ENGINEERING", value: "24 YEARS" },
    { label: "ENTERPRISE SOFTWARE", value: "GLOBAL" },
  ],
  className,
}: EditorialImageProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`group flex flex-col select-none ${className || ""}`}>
      {/* Top thin orange rule */}
      <div className="h-[2px] w-full bg-brand-accent mb-1 transition-all duration-500 group-hover:h-[3px]" />

      {/* Image container with overflow mask reveal */}
      <div className="relative overflow-hidden aspect-[3/4] w-full bg-neutral-100">
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease: EASE_CUSTOM }}
          className="relative h-full w-full"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 75vw, 320px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </motion.div>

        {/* Compact bottom overlay strip inside card */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between bg-surface-dark/90 px-3 py-2 text-[9px] md:text-[10px] font-mono tracking-widest text-white uppercase backdrop-blur-sm">
          <span>{categoryTag}</span>
          <span className="h-1.5 w-1.5 bg-brand-accent transition-transform duration-300 group-hover:scale-125" />
        </div>
      </div>

      {/* Editorial metadata rows under card */}
      <div className="mt-3 space-y-1 font-mono text-[9px] md:text-[10px] tracking-wider uppercase text-foreground-muted">
        {metaRows.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between border-b border-border-light/40 pb-1">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 bg-brand-accent/60" />
              <span>{row.label}</span>
            </span>
            <span className="text-foreground font-medium">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
