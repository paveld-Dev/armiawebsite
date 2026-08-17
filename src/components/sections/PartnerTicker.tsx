"use client";

import React from "react";
import { motion } from "framer-motion";

const PARTNERS = [
  "ACTIVE NETWORK",
  "VERA BRADLEY",
  "ALICE",
  "AVANT",
  "FERRARA CANDY COMPANY",
  "8TO18",
  "AROUNDCAMPUS GROUP",
  "JUMPFORWARD",
  "COLLEGIATEPARENT"
];

export function PartnerTicker() {
  // Duplicate for seamless infinite loop
  const marqueeList = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div className="relative w-full bg-white border-y border-black/[0.08] overflow-hidden select-none z-20">
      <div className="flex w-full">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45,
          }}
          className="flex shrink-0 items-center divide-x divide-black/[0.08]"
        >
          {marqueeList.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-10 md:px-16 py-5 md:py-6"
            >
              <span className="font-mono text-[11px] md:text-[13px] font-bold tracking-[0.2em] text-[#111111] uppercase whitespace-nowrap hover:text-brand-accent transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
