"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const services = [
  {
    id: "01",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    short: "Custom Software",
    image: "/images/engineering_team.png",
    tag: "CUSTOM // DEV",
    description:
      "Full-cycle custom web and enterprise application engineering. Built with high reliability, modular scalability, and modern stack standards for complex business requirements.",
    points: [
      "Full-stack web & mobile development",
      "Microservices & API architecture",
      "Legacy system modernization",
      "Cloud-native application design",
    ],
  },
  {
    id: "02",
    title: "AI & MACHINE LEARNING",
    short: "AI & Machine Learning",
    image: "/images/service_ai_intelligence.png",
    tag: "AI // ML LABS",
    description:
      "Enterprise AI integration, custom LLM solutions, predictive modeling, and intelligent automation systems engineered for secure production environments.",
    points: [
      "Custom LLM integration & fine-tuning",
      "Predictive analytics & forecasting",
      "Computer vision & NLP solutions",
      "MLOps & model deployment pipelines",
    ],
  },
  {
    id: "03",
    title: "CLOUD INFRASTRUCTURE",
    short: "Cloud Infrastructure",
    image: "/images/service_cloud_devops.png",
    tag: "CLOUD // DEVOPS",
    description:
      "Scalable cloud architecture, DevOps pipelines, containerization, and zero-downtime deployment systems engineered for 99.99% operational uptime.",
    points: [
      "AWS, Azure & GCP architecture",
      "Kubernetes & container orchestration",
      "Infrastructure as Code (Terraform)",
      "Zero-downtime deployment strategies",
    ],
  },
  {
    id: "04",
    title: "UX & INTERFACE DESIGN",
    short: "UX & Interface Design",
    image: "/images/service_brand_identity.png",
    tag: "UI // UX DESIGN",
    description:
      "High-precision design systems, editorial UI/UX architecture, user research, and rapid prototyping for complex enterprise software products.",
    points: [
      "Design systems & component libraries",
      "User research & usability testing",
      "Editorial UI architecture",
      "Rapid interactive prototyping",
    ],
  },
];

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeService = openIndex !== null ? services[openIndex] : null;

  return (
    <section className="relative z-20 w-full bg-[#101010] text-[#f3f3f0] h-[1080px] min-h-[1080px] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section">
      {/* Background / Texture / GridLines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="03" label="SERVICES" dark className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#a4a4a2]">AI-POWERED</span>
              <span className="block text-[#a4a4a2]">ENGINEERING</span>
              <span className="block text-white font-medium">SOLUTIONS.</span>
            </h2>

            <p className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#a4a4a2] mt-4 md:mt-5 uppercase tracking-wide max-w-[280px]">
              END-TO-END ENGINEERING FOR<br />
              ENTERPRISE TEAMS - FROM<br />
              STRATEGY TO PRODUCTION.
            </p>
          </div>

          {/* Right Supporting Copy: 69.3% to 88.8% */}
          <div className="relative w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex flex-col justify-start">
            <div className="flex flex-col gap-4 relative z-10">
              <p className="font-mono text-[10px] md:text-[11px] text-[#FF5C00] tracking-widest uppercase">
                ARMIA SYSTEMS
              </p>
              <p className="font-sans text-[14px] md:text-[16px] leading-tight text-[#a4a4a2] uppercase max-w-xs">
                PLAN YOUR<br />
                NEXT ENGINEERING<br />
                WITH ARMIA.
              </p>
            </div>
          </div>
        </div>

        {/* Lower Row: Left Image Aligned with Accordion (10.8% to 30.3% -> width: 19.5%) + Accordion (30.3% to 88.8% -> width: 58.5%) */}
        <div className="relative w-full flex flex-col md:flex-row items-stretch">
          {/* Left Column Image aligned with Accordion - Only rendered when an accordion item is open */}
          <div className="hidden md:flex w-[19.5%] ml-[10.8%] pr-8 flex-col justify-start min-h-[220px]">
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE_CUSTOM }}
                  className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/20 bg-[#181818] shadow-2xl group"
                >
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    sizes="(max-width: 1920px) 25vw, 380px"
                    className="object-cover object-center brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white font-medium bg-black/80 px-2.5 py-1 backdrop-blur-md border border-white/20">
                      {activeService.tag}
                    </span>
                    <span className="h-2 w-2 bg-[#FF5C00] shadow-[0_0_8px_#FF5C00]" aria-hidden />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion List */}
          <div className="w-full md:w-[58.5%] px-6 md:px-0">
            <div className="border-t border-white/[0.06] flex flex-col">
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={service.id} className="border-b border-white/[0.06] bg-[#161616]">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full py-3.5 md:py-4 px-6 md:px-10 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className="font-mono text-[12px] md:text-[13px] text-[#666] transition-colors group-hover:text-[#FF5C00]">
                        {service.id}
                      </span>
                      <h3 className="font-sans text-[16px] md:text-[18px] font-medium tracking-tight uppercase transition-colors group-hover:text-white">
                        <span className={isOpen ? "text-white" : "text-[#a4a4a2]"}>
                          {service.title}
                        </span>
                      </h3>
                    </div>
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <span className="absolute w-3.5 h-[1px] bg-white transition-transform duration-300" />
                      <span className={`absolute w-3.5 h-[1px] bg-white transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-90"}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_CUSTOM }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-6 md:px-10 md:pl-[5.5rem] max-h-[140px] md:max-h-[170px] overflow-y-auto">
                          <p className="font-mono text-[11px] md:text-[12px] leading-relaxed text-[#a4a4a2] max-w-md">
                            {service.description}
                          </p>
                          <ul className="space-y-2.5">
                            {service.points.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-3 font-sans text-[13px] md:text-[14px] text-[#c8c8c4]"
                              >
                                <span className="text-[#FF5C00] font-mono mt-0.5" aria-hidden>
                                  +
                                </span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}