"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE_CUSTOM, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { useRef } from "react";

const services = [
  {
    id: "01",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    short: "Custom Software",
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

// Heading line reveal variant
const headingLine = {
  hidden: { y: "105%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: EASE_CUSTOM, delay: i * 0.1 },
  }),
};

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const headingLines = ["AI-POWERED", "ENGINEERING", "SOLUTIONS."];
  const headingColors = ["text-[#a4a4a2]", "text-[#a4a4a2]", "text-white font-medium"];

  return (
    <section
      ref={sectionRef}
      className="section-services section-edge-shadow relative z-20 w-full bg-[#101010] text-[#f3f3f0] h-[100svh] min-h-[100svh] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section"
    >
      {/* Background / Texture / GridLines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/noise.png')]" />
      <GridLines />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-8 md:mb-10">
          {/* Far Left Section Marker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_CUSTOM, delay: 0.1 }}
            className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0"
          >
            <div className="flex items-center gap-2 font-mono text-[7.5px] md:text-[8px] tracking-[0.04em] uppercase text-[#b0b0ad]">
              <span className="h-[4px] w-[4px] bg-[#FF5C00] inline-block" />
              <span>03</span>
              <span>SERVICES</span>
            </div>
          </motion.div>

          {/* Heading Block — each line reveals from a mask */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              {headingLines.map((line, i) => (
                <div key={line} className="overflow-hidden">
                  <motion.span
                    custom={i}
                    variants={headingLine}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                    className={`block ${headingColors[i]}`}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_CUSTOM, delay: 0.45 }}
              className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#a4a4a2] mt-4 md:mt-5 uppercase tracking-wide max-w-[280px]"
            >
              END-TO-END ENGINEERING FOR<br />
              ENTERPRISE TEAMS - FROM<br />
              STRATEGY TO PRODUCTION.
            </motion.p>
          </div>

          {/* Right Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_CUSTOM, delay: 0.55 }}
            className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start"
          >
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[10px] md:text-[11px] text-[#FF5C00] tracking-widest uppercase">
                ARMIA SYSTEMS
              </p>
              <p className="font-sans text-[14px] md:text-[16px] leading-tight text-[#a4a4a2] uppercase max-w-xs">
                PLAN YOUR<br />
                NEXT ENGINEERING<br />
                WITH ARMIA.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Accordion List — rows appear sequentially */}
        <div className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0">
          <motion.div
            variants={staggerContainer(0.09, 0.3)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="border-t border-white/[0.06] flex flex-col"
          >
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_CUSTOM } },
                  }}
                  className="border-b border-white/[0.06] bg-[#161616]"
                >
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
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                        className="absolute w-3.5 h-[1px] bg-white"
                      />
                    </div>
                  </button>

                  {/* Animated divider line when open */}
                  {isOpen && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: EASE_CUSTOM }}
                      className="h-[1px] bg-[#FF5C00]/40 origin-left mx-6 md:mx-10"
                    />
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EASE_CUSTOM }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-6 md:px-10 md:pl-[5.5rem] max-h-[140px] md:max-h-[170px] overflow-y-auto">
                          <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: EASE_CUSTOM, delay: 0.06 }}
                            className="font-mono text-[11px] md:text-[12px] leading-relaxed text-[#a4a4a2] max-w-md"
                          >
                            {service.description}
                          </motion.p>
                          <motion.ul
                            variants={staggerContainer(0.06, 0.1)}
                            initial="hidden"
                            animate="show"
                            className="space-y-2.5"
                          >
                            {service.points.map((point) => (
                              <motion.li
                                key={point}
                                variants={{
                                  hidden: { opacity: 0, x: -6 },
                                  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_CUSTOM } },
                                }}
                                className="flex items-start gap-3 font-sans text-[13px] md:text-[14px] text-[#c8c8c4]"
                              >
                                <span className="text-[#FF5C00] font-mono mt-0.5" aria-hidden>
                                  +
                                </span>
                                <span>{point}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}