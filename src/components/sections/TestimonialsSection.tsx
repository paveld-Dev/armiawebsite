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
    name: "Jakub Horák",
    role: "VP OF ENGINEERING, FINFLOW",
    quote: "Armia Systems delivered our core platform architecture three weeks ahead of schedule. The engineering quality and attention to scalability was exceptional.",
    image: "/images/avatar_jakub.png",
    companyLogo: "FINFLOW",
    companySymbol: "▲",
  },
  {
    id: "02",
    name: "Anna Marek",
    role: "CTO, HEALTHSCALE",
    quote: "Working with Armia transformed our product velocity. They didn't just write code; they helped us think through the distributed systems trade-offs.",
    image: "/images/avatar_anna.png",
    companyLogo: "HEALTHSCALE",
    companySymbol: "◆",
  },
  {
    id: "03",
    name: "David Klein",
    role: "HEAD OF PRODUCT, NEXUSAERO",
    quote: "The team's deep knowledge of cloud-native infrastructure and modern frontend architecture made a huge difference in our Series B launch.",
    image: "/images/avatar_david.png",
    companyLogo: "NEXUSAERO",
    companySymbol: "■",
  },
  {
    id: "04",
    name: "Elena Vance",
    role: "FOUNDER & CEO, VOLTIS DATA",
    quote: "Armia is our go-to engineering partner. Reliable, transparent, and consistently producing top-tier software architecture under tight deadlines.",
    image: "/images/avatar_anna.png",
    companyLogo: "VOLTIS",
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
    <section className="relative z-20 w-full bg-[#101010] text-[#f3f3f0] py-8 md:py-12 border-t border-white/[0.06] overflow-hidden select-none snap-section h-[100svh] min-h-[100svh] flex flex-col justify-center">
      {/* Background / Texture / GridLines matching Services Section */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/noise.png')]" />
      <GridLines />

      <div className="relative z-10 mx-auto max-w-[1920px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 md:px-12 lg:px-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pr-0 lg:pr-8">
            <div>
              <SectionEyebrow number="06" label="TESTIMONIALS" dark className="!mb-6" />

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="font-sans text-[clamp(2.2rem,3.2vw,4.2rem)] font-normal tracking-[-0.04em] leading-[0.94] uppercase mb-6"
              >
                <span className="block text-[#a4a4a2] font-light">TRUSTED BY</span>
                <span className="block text-[#a4a4a2]">ENGINEERING</span>
                <span className="block text-white font-medium">LEADERS.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="font-mono text-[10px] md:text-[11px] tracking-wider text-[#a4a4a2] uppercase leading-relaxed max-w-md mb-8"
              >
                A FEW WORDS FROM <strong className="text-white font-bold">ENGINEERING LEADERS</strong> I&apos;VE HELPED.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="flex items-center gap-4 mb-8"
              >
                <div className="flex items-center -space-x-2">
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-[#161616] bg-neutral-800">
                    <Image src="/images/avatar_anna.png" alt="Anna Marek" fill className="object-cover" />
                  </div>
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-[#161616] bg-neutral-800">
                    <Image src="/images/avatar_david.png" alt="David Klein" fill className="object-cover" />
                  </div>
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-[#161616] bg-neutral-800">
                    <Image src="/images/avatar_jakub.png" alt="Jakub Horák" fill className="object-cover" />
                  </div>
                  <div className="h-9 w-9 rounded-full bg-brand-accent text-white font-mono text-[10px] font-bold flex items-center justify-center border-2 border-[#161616]">
                    -32
                  </div>
                </div>

                <div className="font-mono uppercase">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-sm text-white">4.92</span>
                    <span className="text-[#a4a4a2] text-xs">/5</span>
                  </div>
                  <div className="text-[9px] text-[#a4a4a2] tracking-wider">
                    TRUSTED BY <strong className="text-white">122+ FOUNDERS</strong>
                  </div>
                </div>
              </motion.div>

              <motion.a
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                href="#contact"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                className="cta-sweep group inline-flex items-center justify-between bg-[#161616] border border-white/10 text-white h-[42px] w-full max-w-[280px] pl-6 transition-colors duration-300 hover:bg-black"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold">START PROJECT</span>
                <div className="flex items-center justify-center h-full w-[42px] bg-brand-accent transition-colors duration-300 group-hover:bg-[#ff4500]">
                  <span className="text-white text-xs font-semibold">›</span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Column: 2x2 Grid */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {testimonialsData.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={testimonialReveal(index)}
                  className="relative group bg-[#161616] border border-white/[0.06] p-5 md:p-6 flex flex-col justify-between shadow-[0_2px_16px_rgba(0,0,0,0.4)] transition-colors duration-300 hover:border-white/[0.14]"
                >
                  {index < 2 && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent origin-left scale-x-[0.92] transition-transform duration-500 group-hover:scale-x-100" />
                  )}

                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-xs bg-neutral-800 border border-white/[0.08] shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                      </div>
                      <div className="font-sans text-xs font-bold tracking-tight text-white flex items-center gap-1.5 pt-1 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-brand-accent text-sm font-normal">{item.companySymbol}</span>
                        <span>{item.companyLogo}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h3 className="font-mono text-xs font-bold tracking-wider text-white uppercase">{item.name}</h3>
                      <p className="font-mono text-[8.5px] md:text-[9px] tracking-widest text-[#a4a4a2] uppercase mt-0.5">{item.role}</p>
                    </div>

                    <div className="flex gap-1 text-brand-accent mb-3 select-none">
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                    </div>

                    <p className="font-sans text-[12px] md:text-[13px] font-normal leading-[1.5] text-[#d4d4d0] tracking-tight">
                      {item.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
