"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { useRotator, rotatorSectionHeight } from "@/hooks/useRotator";
import { RotatorTabStrip } from "@/components/ui/RotatorTabStrip";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const servicesData = [
  {
    id: "01",
    num: "/01",
    category: "FOUNDATION",
    title: "Brand Identity",
    image: "/images/service_brand_identity.png",
    caption: "The foundation of every product — how your brand looks, feels, and communicates.",
    capabilities: [
      "Positioning and messaging frameworks",
      "Visual identity systems",
      "Brand guidelines for consistent use",
      "Digital-first brand systems",
      "Branded assets across campaigns and touchpoints",
    ],
  },
  {
    id: "02",
    num: "/02",
    category: "ENGINEERING",
    title: "Custom Software",
    image: "/images/engineering_team.png",
    caption: "End-to-end product engineering from concept to deployment — built for scale, security, and speed.",
    capabilities: [
      "Full-stack web and mobile development",
      "Microservices and API architecture",
      "Legacy system modernization",
      "Cloud-native application design",
      "DevOps and CI/CD pipeline setup",
    ],
  },
  {
    id: "03",
    num: "/03",
    category: "INTELLIGENCE",
    title: "AI & Machine Learning",
    image: "/images/service_ai_intelligence.png",
    caption: "Intelligent systems that transform raw data into actionable business advantage.",
    capabilities: [
      "Custom LLM integration and fine-tuning",
      "Predictive analytics and forecasting",
      "Computer vision and NLP solutions",
      "MLOps and model deployment pipelines",
      "AI-powered automation workflows",
    ],
  },
  {
    id: "04",
    num: "/04",
    category: "INFRASTRUCTURE",
    title: "Cloud & DevOps",
    image: "/images/service_cloud_devops.png",
    caption: "Scalable, resilient cloud architecture designed for zero downtime and enterprise-grade performance.",
    capabilities: [
      "AWS, Azure, and GCP architecture",
      "Kubernetes and container orchestration",
      "Infrastructure as Code (Terraform)",
      "Zero-downtime deployment strategies",
      "24/7 monitoring and incident response",
    ],
  },
];

// 4 items → 100 + (4-1) × 45 = 235vh
const SECTION_HEIGHT = rotatorSectionHeight(servicesData.length);

// ─────────────────────────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.065, delayChildren: 0.08 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE_CUSTOM } },
};

const maskVariants = {
  hidden: { y: "108%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.78, ease: EASE_CUSTOM } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function PortfolioServicesSection() {
  const { containerRef, activeIndex, setActiveIndex, scrollYProgress, activeItem: service } = useRotator(servicesData);

  const renderContent = (svc: typeof servicesData[0]) => (
    <>
      <GridLines light />
      <div className="relative z-10 mx-auto max-w-[1920px] w-full px-6 md:px-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full flex flex-col justify-between"
        >
          {/* Category & Number */}
          <div className="w-full md:pl-[30.3%] md:pr-[11.2%] flex items-center justify-between mb-3 md:mb-5">
            <motion.div variants={fadeUpVariants} className="flex items-center gap-2">
              <span className="h-[1px] w-[18px] bg-[#ff5a00] inline-block" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-[#5a6270] uppercase">{svc.category}</span>
            </motion.div>
            <motion.span variants={fadeUpVariants} className="font-mono text-[16px] md:text-[20px] text-[#737b88]">
              {svc.num}
            </motion.span>
          </div>

          {/* 2-Column Split */}
          <div className="w-full md:pl-[30.3%] md:pr-[11.2%] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left: Title + Image + Caption */}
            <div className="md:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="overflow-hidden py-1 mb-4 md:mb-6">
                  <motion.h3
                    variants={maskVariants}
                    className="font-sans text-[clamp(2.4rem,3.4vw,4.4rem)] leading-[1.0] tracking-[-0.04em] font-medium text-[#111111]"
                  >
                    {svc.title}
                  </motion.h3>
                </div>

                {/* Image: clip-path wipe + img-depth hover */}
                <motion.div
                  variants={{ hidden: { clipPath: "inset(0 100% 0 0)", scale: 1.05 }, visible: { clipPath: "inset(0 0% 0 0)", scale: 1, transition: { duration: 0.85, ease: EASE_CUSTOM } } }}
                  className="img-depth relative aspect-[16/10] w-full max-w-[clamp(230px,22vw,340px)] bg-neutral-100 shadow-sm"
                >
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover object-center"
                  />
                </motion.div>

                <motion.p variants={fadeUpVariants} className="font-sans text-[11px] md:text-[12px] text-[#7c8491] max-w-[320px] mt-3 leading-[1.4]">
                  {svc.caption}
                </motion.p>
              </div>
            </div>

            {/* Right: Capabilities */}
            <div className="md:col-span-7 pt-2 md:pt-10">
              <ul className="space-y-2.5">
                {svc.capabilities.map((capability, i) => (
                  <motion.li key={i} variants={fadeUpVariants} className="font-sans text-[15px] md:text-[17px] leading-[1.7] text-[#555d6b] flex items-start">
                    <span className="text-[#ff5a00] font-mono mr-3 text-sm select-none">+</span>
                    <span>{capability}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );

  return (
    <section
      ref={containerRef}
      className="scroll-scene section-portfolio relative w-full bg-white select-none"
      style={{ height: SECTION_HEIGHT }}
    >
      {/* Sticky visual — always fills viewport for all 235vh */}
      <div className="sticky top-0 w-full h-[100svh] bg-white flex flex-col overflow-hidden">

        {/* Header Bar */}
        <div className="relative w-full bg-white text-[#111111] pt-[10vh] md:pt-[12vh] pb-4 shrink-0 z-20">
          <GridLines light />
          <div className="relative z-10 mx-auto max-w-[1920px] w-full flex flex-col md:flex-row items-start">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: EASE_CUSTOM }}
              className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0"
            >
              <div className="flex items-center gap-2 font-mono text-[7.5px] md:text-[8px] tracking-[0.04em] uppercase text-[#6b6b6b]">
                <span className="h-[4px] w-[4px] bg-[#ff5a00] inline-block" />
                <span>05</span>
                <span>PORTFOLIO</span>
              </div>
            </motion.div>

            <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
              <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
                <span className="block text-[#111111]">CORE</span>
                <span className="block text-[#6b6b6b] font-medium">SERVICES</span>
              </h2>
              <p className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#6b6b6b] mt-4 uppercase tracking-wide max-w-[280px]">
                REAL OUTCOMES FROM REAL ENGAGEMENTS.
              </p>
            </div>

            <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1">
              <a href="#portfolio" className="font-mono text-[10px] md:text-[11px] text-[#ff5a00] tracking-widest uppercase hover:text-[#111111] transition-colors">
                ALL WORK →
              </a>
            </div>
          </div>
        </div>

        {/* Rotator Area */}
        <div className="relative w-full flex-1 flex flex-col bg-white">
          {/* Tab Strip */}
          <div className="absolute left-6 md:left-[10.8%] top-0 z-30">
            <RotatorTabStrip
              items={servicesData.map((s) => ({ id: s.id, label: s.num }))}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              scrollYProgress={scrollYProgress}
              layoutIdPrefix="portfolio-tab"
            />
          </div>

          <div className="relative w-full h-full flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_CUSTOM }}
                className="absolute inset-0 w-full pt-16 pb-8 flex flex-col justify-center"
              >
                {renderContent(servicesData[activeIndex])}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
