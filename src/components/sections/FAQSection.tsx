"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FAQS_DATA } from "@/data/faqs";
import { FAQItem } from "@/components/faq/FAQItem";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fadeUp, fadeUpSmall, staggerContainer, VIEWPORT_ONCE, EASE_CUSTOM } from "@/lib/motion";

export function FAQSection() {
  const [openId, setOpenId] = useState<string>("");

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="relative w-full bg-white text-[#111111] py-8 md:py-12 border-t border-black/[0.06] overflow-hidden select-none snap-section h-[1080px] min-h-[1080px] flex flex-col justify-center">
      <GridLines light />

      <div className="relative z-10 mx-auto max-w-[1920px] w-full px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col justify-between pr-0 lg:pr-12">
            <div>
              <SectionEyebrow number="07" label="FAQ" />

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="font-sans text-[clamp(2.8rem,4vw,5.5rem)] font-[450] tracking-[-0.05em] leading-[0.92] text-[#111111] uppercase max-w-[600px] mb-6 md:mb-8"
              >
                FREQUENTLY <br />
                ASKED QUESTIONS.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="font-mono text-xs text-[#7c7c78] tracking-wider uppercase leading-snug max-w-xs"
              >
                COMMON QUESTIONS ABOUT <br />
                <strong className="text-[#111111] font-semibold">ARMIA SYSTEMS</strong> —
              </motion.p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full">
              {/* Accent line grows in left-to-right instead of appearing instantly */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, ease: EASE_CUSTOM }}
                style={{ transformOrigin: "left" }}
                className="h-[2px] w-full bg-[#ff5a00]"
              />

              <motion.div
                initial={{ y: "15%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE_CUSTOM }}
                viewport={VIEWPORT_ONCE}
                className="w-full"
              >
                {FAQS_DATA.map((faq) => (
                  <div key={faq.id}>
                    <FAQItem
                      item={faq}
                      isOpen={openId === faq.id}
                      onToggle={() => handleToggle(faq.id)}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
