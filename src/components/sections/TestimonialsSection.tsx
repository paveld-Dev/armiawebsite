"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM, fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

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

// Asymmetric delays: top-left, top-right, bottom-left, bottom-right
const asymmetricDelay = [0, 0.15, 0.28, 0.42];

// Each card gets a distinct entrance direction for asymmetry
const cardVariants = [
  // top-left: from slightly below
  { hidden: { opacity: 0, y: 18, clipPath: "inset(0 0 12% 0)" }, show: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } },
  // top-right: from slightly right
  { hidden: { opacity: 0, x: 16, clipPath: "inset(0 0 12% 0)" }, show: { opacity: 1, x: 0, clipPath: "inset(0 0 0% 0)" } },
  // bottom-left: from slightly below
  { hidden: { opacity: 0, y: 22, clipPath: "inset(8% 0 0 0)" }, show: { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" } },
  // bottom-right: from slightly left+below
  { hidden: { opacity: 0, x: -12, y: 14, clipPath: "inset(8% 0 0 0)" }, show: { opacity: 1, x: 0, y: 0, clipPath: "inset(0 0 0 0)" } },
];

export function TestimonialsSection() {
  return (
    <section className="section-testimonials section-edge-shadow relative w-full bg-[#fcfcfc] text-[#111111] py-8 md:py-12 border-t border-black/[0.08] overflow-hidden select-none snap-section h-[100svh] min-h-[100svh] flex flex-col justify-center">
      <GridLines light />

      <div className="relative z-10 mx-auto max-w-[1920px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 md:px-12 lg:px-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pr-0 lg:pr-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, ease: EASE_CUSTOM }}
              >
                <SectionEyebrow number="06" label="TESTIMONIALS" className="!mb-6" />
              </motion.div>

              {/* Heading — line by line */}
              <div className="font-sans text-[clamp(2.2rem,3.2vw,4.2rem)] font-normal tracking-[-0.04em] leading-[0.94] uppercase mb-6 overflow-hidden">
                {[
                  { text: "TRUSTED BY", cls: "text-[#999999] font-light" },
                  { text: "ENGINEERING", cls: "text-[#111111]" },
                  { text: "LEADERS.", cls: "text-[#111111] font-medium" },
                ].map((line, i) => (
                  <div key={line.text} className="overflow-hidden">
                    <motion.span
                      initial={{ y: "105%" }}
                      whileInView={{ y: "0%" }}
                      viewport={VIEWPORT_ONCE}
                      transition={{ duration: 0.75, ease: EASE_CUSTOM, delay: i * 0.1 }}
                      className={`block ${line.cls}`}
                    >
                      {line.text}
                    </motion.span>
                  </div>
                ))}
              </div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="font-mono text-[10px] md:text-[11px] tracking-wider text-[#666666] uppercase leading-relaxed max-w-md mb-8"
              >
                A FEW WORDS FROM <strong className="text-[#111111] font-bold">ENGINEERING LEADERS</strong> I&apos;VE HELPED.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT_ONCE}
                className="flex items-center gap-4 mb-8"
              >
                <div className="flex items-center -space-x-2">
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-white bg-neutral-200">
                    <Image src="/images/avatar_anna.png" alt="Anna Marek" fill className="object-cover" />
                  </div>
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-white bg-neutral-200">
                    <Image src="/images/avatar_david.png" alt="David Klein" fill className="object-cover" />
                  </div>
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-white bg-neutral-200">
                    <Image src="/images/avatar_jakub.png" alt="Jakub Horák" fill className="object-cover" />
                  </div>
                  <div className="h-9 w-9 rounded-full bg-brand-accent text-white font-mono text-[10px] font-bold flex items-center justify-center border-2 border-white">
                    -32
                  </div>
                </div>

                <div className="font-mono uppercase">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-sm text-[#111111]">4.92</span>
                    <span className="text-[#888888] text-xs">/5</span>
                  </div>
                  <div className="text-[9px] text-[#666666] tracking-wider">
                    TRUSTED BY <strong className="text-[#111111]">122+ FOUNDERS</strong>
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
                className="group inline-flex items-center justify-between bg-[#111111] text-white h-[42px] w-full max-w-[280px] pl-6 transition-colors duration-300 hover:bg-black"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold">START PROJECT</span>
                <div className="flex items-center justify-center h-full w-[42px] bg-brand-accent transition-colors duration-300 group-hover:bg-[#ff4500]">
                  <span className="text-white text-xs font-semibold">›</span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Column: 2x2 Grid with asymmetric reveal */}
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
                  variants={{
                    hidden: cardVariants[index].hidden,
                    show: {
                      ...cardVariants[index].show,
                      transition: { duration: 0.7, ease: EASE_CUSTOM, delay: asymmetricDelay[index] },
                    },
                  }}
                  className="relative group bg-white border border-black/[0.06] p-5 md:p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                >
                  {index < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{ duration: 0.6, ease: EASE_CUSTOM, delay: asymmetricDelay[index] + 0.25 }}
                      className="absolute top-0 left-0 right-0 h-[2.5px] bg-brand-accent origin-left"
                    />
                  )}

                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="img-depth relative h-11 w-11 overflow-hidden rounded-xs bg-neutral-100 border border-black/[0.08] shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                      </div>
                      <div className="font-sans text-xs font-bold tracking-tight text-[#111111] flex items-center gap-1.5 pt-1 opacity-75 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-brand-accent text-sm font-normal">{item.companySymbol}</span>
                        <span>{item.companyLogo}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h3 className="font-mono text-xs font-bold tracking-wider text-[#111111] uppercase">{item.name}</h3>
                      <p className="font-mono text-[8.5px] md:text-[9px] tracking-widest text-[#777777] uppercase mt-0.5">{item.role}</p>
                    </div>

                    <div className="flex gap-1 text-brand-accent mb-3 select-none">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="h-1 w-1 bg-brand-accent inline-block" />
                      ))}
                    </div>

                    {/* Quote — line by line reveal */}
                    <p className="font-sans text-[12px] md:text-[13px] font-semibold leading-[1.45] text-[#222222] tracking-tight">
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
