"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_ARTICLES } from "@/data/blog";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";
import { useRotator, rotatorSectionHeight } from "@/hooks/useRotator";
import { RotatorTabStrip } from "@/components/ui/RotatorTabStrip";

// Height = 100 + (articles.length - 1) × 45 vh
// e.g. 4 articles → 235vh
const SECTION_HEIGHT = rotatorSectionHeight(BLOG_ARTICLES.length);

export function BlogSection() {
  const { containerRef, activeIndex, setActiveIndex, scrollYProgress, activeItem: article } = useRotator(BLOG_ARTICLES);

  return (
    <section
      ref={containerRef}
      className="scroll-scene section-blog relative w-full bg-white select-none"
      style={{ height: SECTION_HEIGHT }}
    >
      {/* Sticky visual — always fills viewport for the full scroll distance */}
      <div className="sticky top-0 w-full h-[100svh] bg-white text-[#111111] border-t border-black/[0.06] overflow-hidden flex flex-col justify-center">
        <GridLines light />

        <div className="relative z-10 mx-auto max-w-[1920px] w-full px-6 md:px-12 lg:px-16">
          {/* Header Row */}
          <div className="pb-4 md:pb-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-3">
                <SectionEyebrow number="08" label="BLOG" className="!mb-0" />
              </div>

              <div className="lg:col-span-4">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT_ONCE}
                  className="font-sans text-[clamp(2.4rem,3.4vw,4.4rem)] font-[450] tracking-[-0.045em] leading-[1.0] uppercase"
                >
                  <span className="block text-[#777777]">INSIGHTS</span>
                  <span className="block text-[#111111]">&amp; ENGINEERING BLOG</span>
                </motion.h2>
              </div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="lg:col-span-3 flex justify-start lg:justify-end"
              >
                <p className="font-mono text-[10px] md:text-[11px] leading-[1.25] tracking-wider uppercase text-[#666666] max-w-[280px]">
                  WE SHARE IDEAS, LESSONS, AND PRACTICAL INSIGHTS FROM OUR WORK.
                </p>
              </motion.div>

              <div className="lg:col-span-2 flex justify-start lg:justify-end items-end h-full">
                <Link
                  href="#all-articles"
                  className="group inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] font-medium tracking-widest uppercase text-[#111111] hover:text-brand-accent transition-colors"
                >
                  <span>ALL ARTICLES</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Square Tab Strip */}
          <div className="border-t border-black/[0.06] pt-3 pb-4">
            <RotatorTabStrip
              items={BLOG_ARTICLES.map((a, i) => ({
                id: a.id,
                label: `/${String(i + 1).padStart(2, "0")}`,
              }))}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              scrollYProgress={scrollYProgress}
              layoutIdPrefix="blog-tab"
            />
          </div>

          {/* Article Spotlight */}
          <div className="relative w-full min-h-[280px] md:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_CUSTOM }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center bg-[#fafafa] p-6 md:p-8 border border-black/[0.06]"
              >
                {/* Image — wipe from left + img-depth hover */}
                <div className="md:col-span-5">
                  <Link href={article.href} className="img-depth block relative aspect-[16/10] bg-neutral-200">
                    <motion.div
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{ duration: 0.6, ease: EASE_CUSTOM, delay: 0.05 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white font-mono text-[9px] px-2.5 py-1 uppercase tracking-widest z-10">
                      {article.category}
                    </div>
                  </Link>
                </div>

                {/* Text — date first, then title mask, then description (desynchronized) */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, ease: EASE_CUSTOM, delay: 0.1 }}
                      className="font-mono text-[10px] md:text-[11px] text-[#777777] tracking-widest uppercase mb-3"
                    >
                      {article.date}
                    </motion.div>

                    <div className="overflow-hidden mb-4">
                      <Link href={article.href} className="group">
                        <motion.h3
                          initial={{ y: "102%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.65, ease: EASE_CUSTOM, delay: 0.18 }}
                          className="font-sans text-[clamp(1.6rem,2.2vw,2.6rem)] font-medium text-[#111111] tracking-tight leading-[1.15] group-hover:text-brand-accent transition-colors"
                        >
                          {article.title}
                        </motion.h3>
                      </Link>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_CUSTOM, delay: 0.3 }}
                      className="font-sans text-[14px] md:text-[15px] text-[#555d6b] leading-[1.6] max-w-xl mb-6"
                    >
                      {article.description}
                    </motion.p>
                  </div>

                  <Link
                    href={article.href}
                    className="group inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-[#111111] font-semibold hover:text-brand-accent transition-colors"
                  >
                    <span>READ ARTICLE</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
