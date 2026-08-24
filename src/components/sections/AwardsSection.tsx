"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";

const AWARDS_LIST = [
  { id: "1", name: "Clutch Global", image: "/images/awards/logo.png" },
  { id: "2", name: "Top Developers", image: "/images/awards/logo-1.png" },
  { id: "3", name: "GoodFirms", image: "/images/awards/logo-2.png" },
  { id: "4", name: "TechBehemoths", image: "/images/awards/logo-3.png" },
  { id: "5", name: "The Manifest", image: "/images/awards/logo-4.png" },
  { id: "6", name: "DesignRush", image: "/images/awards/logo-5.png" },
  { id: "7", name: "UpCity Excellence", image: "/images/awards/logo-6.png" },
  { id: "8", name: "Top App Firms", image: "/images/awards/logo-7.png" },
  { id: "9", name: "Software World", image: "/images/awards/logo-8.png" },
  { id: "10", name: "Selected Firm", image: "/images/awards/logo-9.png" },
  { id: "11", name: "Enterprise Leaders", image: "/images/awards/logo-10.png" },
];

export function AwardsSection() {
  return (
    <section className="relative z-20 w-full bg-white text-[#111111] py-10 md:py-14 border-t border-black/[0.08] select-none snap-section flex flex-col justify-center overflow-hidden h-[100svh] min-h-[100svh]">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="07" label="RECOGNITION" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="font-sans text-[clamp(2.1rem,2.9vw,3.6rem)] font-normal tracking-[-0.04em] leading-[0.96] text-left uppercase text-[#111111]"
            >
              <span className="block text-[#111111]">AWARDS &amp;</span>
              <span className="block text-[#6b6b6b] font-medium">RECOGNITION.</span>
            </motion.h2>

            <p className="font-mono text-[12px] md:text-[14px] leading-relaxed text-[#6b6b6b] mt-3 md:mt-4 uppercase tracking-wide max-w-[300px]">
              RECOGNIZED GLOBALLY BY LEADING RESEARCH AND ANALYST PLATFORMS.
            </p>
          </div>

          {/* Right Supporting Copy: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[12px] md:text-[13.5px] text-[#ff5a00] tracking-widest uppercase font-semibold">
                20+ YEARS OF EXCELLENCE
              </p>
              <p className="font-sans text-[15px] md:text-[16px] leading-relaxed text-[#555555] uppercase max-w-xs">
                GLOBAL RECOGNITION FOR ENGINEERING EXCELLENCE, PRODUCT DESIGN &amp; INNOVATION.
              </p>
            </div>
          </div>
        </div>

        {/* Compact Logo Grid (30.3% to 88.8% width: 58.5%) */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <div className="border-t border-l border-black/[0.08] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 bg-white">
            {AWARDS_LIST.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.4, delay: i * 0.04, ease: EASE_CUSTOM }}
                className="group relative flex flex-col items-center justify-center p-5 md:p-6 border-r border-b border-black/[0.08] hover:bg-black/[0.02] transition-all duration-300 min-h-[120px] md:min-h-[140px]"
              >
                {/* Logo Image */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                  <Image
                    src={award.image}
                    alt={award.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-contain object-center drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}

            {/* Final Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.4, delay: AWARDS_LIST.length * 0.04, ease: EASE_CUSTOM }}
              className="flex flex-col items-center justify-center p-5 md:p-6 border-r border-b border-black/[0.08] bg-[#f8f8f8] min-h-[120px] md:min-h-[140px] text-center"
            >
              <span className="font-mono text-xl md:text-2xl font-bold text-[#ff5a00]">20+</span>
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-[#666666] mt-1 font-semibold">
                YEARS LEGACY
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
