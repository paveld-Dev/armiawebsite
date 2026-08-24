"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BLOG_ARTICLES } from "@/data/blog";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";

export function BlogSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-white text-[#111111] h-[100svh] min-h-[100svh] border-t border-black/[0.08] select-none snap-section flex flex-col justify-between overflow-hidden py-10 md:py-14">
      <GridLines light />
      
      {/* ── Top Header Area (Matching 10.8% / 30.3% / 69.3% Grid) ── */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-0 shrink-0 mb-6 md:mb-8">
        <div className="relative w-full flex flex-col md:flex-row items-start">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="09" label="BLOG" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-4 md:mb-0">
            <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#111111]">LATEST</span>
              <span className="block text-[#6b6b6b] font-medium">INSIGHTS.</span>
            </h2>

            <p className="font-mono text-[12px] md:text-[14px] leading-relaxed text-[#666666] mt-4 md:mt-5 uppercase tracking-wide max-w-[300px]">
              ENGINEERING ARCHITECTURE, AI SYSTEMS &amp; TECH STRATEGY.
            </p>
          </div>

          {/* Right Supporting Copy / Link: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-4">
              <a
                href="#blog"
                className="font-mono text-[12px] md:text-[14px] text-[#ff5a00] tracking-widest uppercase hover:text-[#111111] transition-colors"
              >
                VIEW ALL ARTICLES →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Seamless 4-Column Editorial Magazine Grid (Aligns Top Meta & Flush Image Top) ── */}
      <div 
        className="relative z-10 w-full border-t border-b border-black/[0.08] flex-1 flex flex-col justify-start overflow-hidden"
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.08] h-full items-start">
          {BLOG_ARTICLES.map((article, idx) => {
            // Default pattern in design:
            // 01: square/landscape (shorter)
            // 02: tall portrait (extends lower)
            // 03: square/landscape (shorter)
            // 04: tall portrait (extends lower)
            const isDefaultTall = idx === 1 || idx === 3;
            const hasHover = hoveredIdx !== null;
            const isSelfHovered = hoveredIdx === idx;

            // Reciprocal logic:
            // When hovering:
            // - If hovering item 02 (tall) -> it shrinks to square, while 01 and 03 expand to tall!
            // - If hovering item 01 (short) -> it expands to tall, while 02 and 04 shrink to square!
            let isTall = isDefaultTall;
            if (hasHover) {
              const hoveredIsTall = hoveredIdx === 1 || hoveredIdx === 3;
              if (hoveredIsTall) {
                // Invert the layout!
                isTall = !isDefaultTall;
              } else {
                // Invert the layout!
                isTall = !isDefaultTall;
              }
            }

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_CUSTOM }}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="group flex flex-col justify-start bg-white h-full relative"
              >
                {/* Meta Top Line: Date & Dots Icon (Aligned seamlessly at the top) */}
                <div className="flex items-center justify-between px-4 sm:px-5 lg:px-6 py-2.5 border-b border-black/[0.06] shrink-0 bg-white">
                  <span className="font-mono text-[9px] md:text-[9.5px] tracking-widest uppercase text-[#666666]">
                    {article.date}
                  </span>
                  <span className="font-mono text-xs text-[#999999] tracking-tighter select-none">
                    ▪▪▪
                  </span>
                </div>

                {/* Seamless Edge-to-Edge Cover Image starting immediately below Date line */}
                <Link
                  href={article.href}
                  className="block relative w-full overflow-hidden bg-neutral-100 shrink-0"
                >
                  <div
                    className={`relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isTall ? "h-[38vh] md:h-[42vh]" : "h-[22vh] md:h-[25vh]"
                    }`}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isSelfHovered ? "scale-105" : "scale-100"
                      }`}
                    />
                  </div>
                </Link>

                {/* Content Block strictly below each respective image */}
                <div className="px-4 sm:px-5 lg:px-6 pt-4 pb-5 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Category Label with Square marker */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="h-1.5 w-1.5 bg-brand-accent inline-block shrink-0" />
                      <span className="font-mono text-[8.5px] md:text-[9px] tracking-widest uppercase text-[#555555]">
                        {article.category}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={article.href} className="block group/title">
                      <h3 className="font-sans font-medium text-[15px] md:text-[16px] leading-[1.3] tracking-tight text-[#111111] mb-1.5 group-hover/title:text-brand-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="font-sans text-[11px] md:text-[11.5px] leading-[1.38] text-[#666666] mb-3 line-clamp-2">
                      {article.description}
                    </p>
                  </div>

                  {/* Read Article link */}
                  <div>
                    <Link
                      href={article.href}
                      className="inline-flex items-center gap-1 font-mono text-[8.5px] md:text-[9px] font-semibold tracking-widest uppercase text-[#111111] hover:text-brand-accent transition-colors"
                    >
                      <span>READ ARTICLE</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
