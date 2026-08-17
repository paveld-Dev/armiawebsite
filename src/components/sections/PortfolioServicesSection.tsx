"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_CUSTOM } from "@/lib/motion";
import { GridLines } from "@/components/ui/GridLines";
import { useRotator } from "@/hooks/useRotator";
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
    caption:
      "The foundation of every product - how your brand looks, feels, and communicates.",
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
    caption:
      "End-to-end product engineering from concept to deployment - built for scale, security, and speed.",
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
    caption:
      "Intelligent systems that transform raw data into actionable business advantage and automated workflows.",
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
    caption:
      "Scalable, resilient cloud architecture designed for zero downtime and enterprise-grade performance.",
    capabilities: [
      "AWS, Azure, and GCP architecture",
      "Kubernetes and container orchestration",
      "Infrastructure as Code (Terraform)",
      "Zero-downtime deployment strategies",
      "24/7 monitoring and incident response",
    ],
  },
];

// Removed useWindowWidth and useReducedMotion as they were only used for the wheel interceptor.

// ─────────────────────────────────────────────────────────────────────────────
// Content entrance variants
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.08 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: EASE_CUSTOM },
  },
};

const maskVariants = {
  hidden: { y: "108%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.78, ease: EASE_CUSTOM },
  },
};

const imageVariants = {
  hidden: { scale: 1.03, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_CUSTOM },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PortfolioServicesSection
// ─────────────────────────────────────────────────────────────────────────────

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function PortfolioServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeIndex, setActiveIndex, activeItem: service } = useRotator(servicesData);

  const renderContent = (service: typeof servicesData[0]) => (
    <>
      <GridLines light />
      <div className="relative z-10 mx-auto max-w-[1920px] w-full px-6 md:px-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full flex flex-col justify-between"
        >
          {/* Top Category & Number Header Row */}
          <div className="w-full md:pl-[30.3%] md:pr-[11.2%] flex items-center justify-between mb-3 md:mb-5">
            <motion.div variants={fadeUpVariants} className="flex items-center gap-2">
              <span className="h-[1px] w-[18px] bg-[#ff5a00] inline-block" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-[#5a6270] uppercase">
                {service.category}
              </span>
            </motion.div>
            <motion.span
              variants={fadeUpVariants}
              className="font-mono text-[16px] md:text-[20px] text-[#737b88]"
            >
              {service.num}
            </motion.span>
          </div>

          {/* Main 2-Column Split Layout */}
          <div className="w-full md:pl-[30.3%] md:pr-[11.2%] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Column: Title + Compact Image + Caption */}
            <div className="md:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="overflow-hidden py-1 mb-4 md:mb-6">
                  <motion.h3
                    variants={maskVariants}
                    className="font-sans text-[clamp(2.4rem,3.4vw,4.4rem)] leading-[1.0] letter-spacing-[-0.04em] font-medium text-[#111111]"
                  >
                    {service.title}
                  </motion.h3>
                </div>

                <motion.div
                  variants={imageVariants}
                  className="relative overflow-hidden aspect-[16/10] w-full max-w-[clamp(230px,22vw,340px)] bg-neutral-100 shadow-sm group"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </motion.div>

                <motion.p
                  variants={fadeUpVariants}
                  className="font-sans text-[11px] md:text-[12px] text-[#7c8491] max-w-[320px] mt-3 leading-[1.4]"
                >
                  {service.caption}
                </motion.p>
              </div>
            </div>

            {/* Right Column: Capability List */}
            <div className="md:col-span-7 pt-2 md:pt-10">
              <ul className="space-y-2.5">
                {service.capabilities.map((capability, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUpVariants}
                    className="font-sans text-[15px] md:text-[17px] leading-[1.7] text-[#555d6b] flex items-start"
                  >
                    <span className="text-[#ff5a00] font-mono mr-3 text-sm select-none">
                      +
                    </span>
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
    <section ref={containerRef} className="relative w-full h-[100svh] bg-white select-none flex flex-col snap-section overflow-hidden">
      {/* ── 2. White Services Header Bar (Compact) */}
      <div className="relative w-full bg-white text-[#111111] pt-[12vh] pb-6 shrink-0 z-20">
        <GridLines light />
        <div className="relative z-10 mx-auto max-w-[1920px] w-full flex flex-col md:flex-row items-start">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-10 md:mb-0">
            <SectionEyebrow number="05" label="PORTFOLIO" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-10 md:mb-0 font-medium">
            <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#111111]">CORE</span>
              <span className="block text-[#6b6b6b] font-medium">SERVICES</span>
            </h2>

            <p className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#6b6b6b] mt-8 uppercase tracking-wide max-w-[280px]">
              REAL OUTCOMES FROM REAL ENGAGEMENTS.
            </p>
          </div>

          {/* Right Supporting Copy: 69.3% to 88.8% */}
          <div className="w-full md:w-[19.5%] px-6 md:px-0 pt-1 flex justify-start">
            <div className="flex flex-col gap-4">
              <a
                href="#portfolio"
                className="font-mono text-[10px] md:text-[11px] text-[#ff5a00] tracking-widest uppercase hover:text-[#111111] transition-colors"
              >
                ALL WORK →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Slider Container with AnimatePresence */}
      <div className="relative w-full flex-1 flex flex-col bg-white">

        {/* Tab Strip */}
        <RotatorTabStrip
          items={servicesData.map((s) => ({ id: s.id, label: s.num }))}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          className="absolute left-6 md:left-[10.8%] top-0 z-30"
        />

        <div className="relative w-full h-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE_CUSTOM }}
              className="absolute inset-0 w-full pt-12 pb-10 flex flex-col justify-center"
            >
              {renderContent(servicesData[activeIndex])}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
