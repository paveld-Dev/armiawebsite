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
    <section
      data-theme="dark"
      className="relative z-20 w-full bg-black text-[#f3f3f0] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section h-[100svh] min-h-[100svh] select-none"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/Noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching ServicesSection Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="08" label="FAQ" dark className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left uppercase"
            >
              <span className="block text-[#a4a4a2]">FREQUENTLY</span>
              <span className="block text-white font-medium">ASKED QUESTIONS.</span>
            </motion.h2>

            <p className="font-mono text-[12px] md:text-[14px] leading-relaxed text-[#a4a4a2] mt-4 md:mt-5 uppercase tracking-wide max-w-[300px]">
              COMMON QUESTIONS ABOUT <br />
              <strong className="text-white font-semibold">ARMIA SYSTEMS</strong> &amp; ENGAGEMENTS.
            </p>
          </div>

          {/* Right Supporting Copy / Link: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-4">
              <a
                href="#contact"
                className="font-mono text-[12px] md:text-[14px] text-[#ff5a00] tracking-widest uppercase hover:text-white transition-colors"
              >
                HAVE QUESTIONS? TALK TO US →
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List (30.3% to 88.8% width: 58.5%) */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <div className="relative w-full">
            {/* Accent line grows in left-to-right */}
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
    </section>
  );
}
