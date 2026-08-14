"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_ARTICLES } from "@/data/blog";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";
import { useRotator } from "@/hooks/useRotator";
import { RotatorTabStrip } from "@/components/ui/RotatorTabStrip";

export function BlogSection() {
  const { activeIndex, setActiveIndex, activeItem: article } = useRotator(BLOG_ARTICLES);

  return (
    <section className="relative w-full bg-white text-[#111111] h-[100svh] min-h-[100svh] py-10 md:py-14 border-t border-black/[0.06] overflow-hidden select-none snap-section flex flex-col justify-center">
      <GridLines light />

      <div className="relative z-10 mx-auto max-w-[1920px] w-full px-6 md:px-12 lg:px-16">
        {/* Upper Header Row */}
        <div className="pb-6 md:pb-8">
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

        {/* Tab Strip */}
        <div className="border-t border-black/[0.06] pt-3 pb-4">
          <RotatorTabStrip
            items={BLOG_ARTICLES.map((a, i) => ({
              id: a.id,
              label: `/${String(i + 1).padStart(2, "0")}`,
            }))}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>

        {/* Spotlight Article Container */}
        <div className="relative w-full min-h-[320px] md:min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: EASE_CUSTOM }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center bg-[#fafafa] p-6 md:p-10 border border-black/[0.06]"
            >
              {/* Left Column: Cover Image */}
              <div className="md:col-span-5">
                <Link href={article.href} className="group block relative overflow-hidden aspect-[16/10] bg-neutral-200">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white font-mono text-[9px] px-2.5 py-1 uppercase tracking-widest">
                    {article.category}
                  </div>
                </Link>
              </div>

              {/* Right Column: Article Details */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] md:text-[11px] text-[#777777] tracking-widest uppercase mb-3">
                    {article.date}
                  </div>

                  <Link href={article.href} className="group">
                    <h3 className="font-sans text-[clamp(1.6rem,2.2vw,2.6rem)] font-medium text-[#111111] tracking-tight leading-[1.15] mb-4 group-hover:text-brand-accent transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="font-sans text-[14px] md:text-[15px] text-[#555d6b] leading-[1.6] max-w-xl mb-6">
                    {article.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={article.href}
                    className="group inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-[#111111] font-semibold hover:text-brand-accent transition-colors"
                  >
                    <span>READ ARTICLE</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
            </AnimatePresence >
          </div >
        </div >
      </div >
    </section >
  );
}
