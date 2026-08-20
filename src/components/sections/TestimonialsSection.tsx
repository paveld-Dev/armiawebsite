"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM, fadeUp, VIEWPORT_ONCE } from "@/lib/motion";

const testimonialsData = [
  {
    id: "01",
    name: "Mark Henderson",
    role: "DIRECTOR OF ENGINEERING, ACTIVE NETWORK",
    quote:
      "Armia Systems delivered our mission-critical enterprise registration and payment infrastructure with zero downtime. Their architectural depth and adherence to high scalability standards made them an indispensable engineering partner.",
    image: "/images/avatar_jakub.png",
    companyLogo: "ACTIVE NETWORK",
    companySymbol: "▲",
  },
  {
    id: "02",
    name: "Sarah Jenkins",
    role: "VP OF TECHNOLOGY, JUMPFORWARD",
    quote:
      "Armia transformed our collegiate athletics compliance platform. Their engineers built high-concurrency microservices and real-time data sync that scaled effortlessly to hundreds of universities nationwide.",
    image: "/images/avatar_anna.png",
    companyLogo: "JUMPFORWARD",
    companySymbol: "◆",
  },
  {
    id: "03",
    name: "David Rosenthal",
    role: "HEAD OF PRODUCT, 8TO18 MEDIA",
    quote:
      "Working with Armia accelerated our product roadmap by months. From mobile app engineering to cloud backend modernization, their engineering quality and accountability are consistently top-tier.",
    image: "/images/avatar_david.png",
    companyLogo: "8TO18",
    companySymbol: "■",
  },
  {
    id: "04",
    name: "Diane Miller",
    role: "FOUNDER & CEO, COLLEGIATEPARENT",
    quote:
      "Armia is our trusted technology partner for over 8 years. They have architected our content syndication engines and custom digital platforms with unmatched reliability and strategic foresight.",
    image: "/images/avatar_anna.png",
    companyLogo: "COLLEGIATEPARENT",
    companySymbol: "●",
  },
];

const getTestimonialDelay = (index: number) => {
  const delays = [0, 0.08, 0.17, 0.25];
  return delays[index] || 0;
};

const testimonialReveal = (index: number) => ({
  hidden: { opacity: 0, clipPath: "inset(0 0 10% 0)", y: 8 },
  show: {
    opacity: 1,
    clipPath: "inset(0)",
    y: 0,
    transition: { duration: 0.7, ease: EASE_CUSTOM, delay: getTestimonialDelay(index) }
  }
});

export function TestimonialsSection() {
  return (
    <section className="relative z-20 w-full bg-white text-[#111111] py-10 md:py-14 border-t border-black/[0.08] overflow-hidden select-none snap-section h-[100svh] min-h-[100svh] flex flex-col justify-center">
      <GridLines light />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching ServicesSection Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="06" label="TESTIMONIALS" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left uppercase text-[#111111]"
            >
              <span className="block text-[#111111]">TRUSTED BY</span>
              <span className="block text-[#6b6b6b] font-medium">ENGINEERING LEADERS.</span>
            </motion.h2>

            <p className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#6b6b6b] mt-4 md:mt-5 uppercase tracking-wide max-w-[280px]">
              A FEW WORDS FROM <strong className="text-[#111111] font-bold">ENGINEERING LEADERS</strong> WE&apos;VE HELPED.
            </p>
          </div>

          {/* Right Supporting Copy / Trust Rating: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white bg-neutral-200 shadow-sm">
                    <Image src="/images/avatar_anna.png" alt="Anna Marek" fill className="object-cover" />
                  </div>
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white bg-neutral-200 shadow-sm">
                    <Image src="/images/avatar_david.png" alt="David Klein" fill className="object-cover" />
                  </div>
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white bg-neutral-200 shadow-sm">
                    <Image src="/images/avatar_jakub.png" alt="Jakub Horák" fill className="object-cover" />
                  </div>
                </div>
                <div className="font-mono uppercase">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-xs text-[#111111]">4.92</span>
                    <span className="text-[#6b6b6b] text-[10px]">/5</span>
                  </div>
                  <div className="text-[8.5px] text-[#6b6b6b] tracking-wider">
                    <strong className="text-[#111111]">122+ FOUNDERS</strong>
                  </div>
                </div>
              </div>

              <a
                href="#contact"
                className="font-mono text-[10px] md:text-[11px] text-[#FF5C00] tracking-widest uppercase hover:text-[#111111] transition-colors"
              >
                START PROJECT →
              </a>
            </div>
          </div>
        </div>

        {/* 2x2 Testimonials Grid (30.3% to 88.8% width: 58.5%) */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          >
            {testimonialsData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={testimonialReveal(index)}
                className="relative group bg-white border border-black/[0.08] p-5 md:p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-colors duration-300 hover:border-black/[0.18]"
              >
                {index < 2 && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent origin-left scale-x-[0.92] transition-transform duration-500 group-hover:scale-x-100" />
                )}

                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xs bg-neutral-100 border border-black/[0.08] shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                    </div>
                    <div className="font-sans text-xs font-bold tracking-tight text-[#111111] flex items-center gap-1.5 pt-1 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-brand-accent text-sm font-normal">{item.companySymbol}</span>
                      <span>{item.companyLogo}</span>
                    </div>
                  </div>

                  <div className="mb-2.5">
                    <h3 className="font-mono text-xs font-bold tracking-wider text-[#111111] uppercase">{item.name}</h3>
                    <p className="font-mono text-[8.5px] md:text-[9px] tracking-widest text-[#6b6b6b] uppercase mt-0.5">{item.role}</p>
                  </div>

                  <div className="flex gap-1 text-brand-accent mb-2.5 select-none">
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                    <span className="h-1 w-1 bg-brand-accent inline-block" />
                  </div>

                  <p className="font-sans text-[12px] md:text-[13px] font-normal leading-[1.55] text-[#444444] tracking-tight">
                    {item.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
