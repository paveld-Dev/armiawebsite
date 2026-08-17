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
    category: "LOGISTICS & SAAS PLATFORM",
    title: "Flexshft",
    image: "/images/Flexshft.png",
    caption:
      "Enterprise shift-scheduling and dynamic on-demand workforce management platform built for scale.",
    capabilities: [
      "Real-time shift dispatching & automated matching",
      "Multi-tenant cloud architecture on AWS",
      "High-concurrency mobile app for workers & admins",
      "Automated payroll & compliance tracking engines",
      "Instant push notifications & live GPS check-ins",
    ],
  },
  {
    id: "02",
    num: "/02",
    category: "ENTERPRISE COLLABORATION",
    title: "Ucollabit",
    image: "/images/Ucollabit.png",
    caption:
      "Unified workspace and collaborative project intelligence system for distributed enterprise teams.",
    capabilities: [
      "Real-time document sync & interactive whiteboards",
      "Role-based access control & enterprise security",
      "Automated sprint planning & workflow triggers",
      "Custom integrations with Slack, Jira & GitHub",
      "Sub-100ms WebSocket messaging infrastructure",
    ],
  },
  {
    id: "03",
    num: "/03",
    category: "TELECOM & NETWORKING",
    title: "Askonnect",
    image: "/images/Askonnect.png",
    caption:
      "Intelligent B2B communication and omni-channel customer engagement platform with automated CRM routing.",
    capabilities: [
      "VoIP telephony & unified inbox architecture",
      "AI-driven lead qualification & conversation triage",
      "Predictive dialer and agent monitoring console",
      "Omni-channel API gateway (SMS, WhatsApp, Voice)",
      "Zero-downtime microservices with 99.99% SLA",
    ],
  },
  {
    id: "04",
    num: "/04",
    category: "HEALTHCARE PLATFORM",
    title: "BCMCH",
    image: "/images/BCMCH.png",
    caption:
      "Comprehensive hospital management system, telehealth portal, and electronic medical records ecosystem.",
    capabilities: [
      "HIPAA-compliant patient portal & EHR integration",
      "Automated OPD booking & doctor schedule management",
      "Secure lab report generation & telemetry sync",
      "In-hospital pharmacy & billing automation",
      "High-availability disaster recovery architecture",
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
  const {
    activeIndex,
    setActiveIndex,
    activeItem: service,
    setIsPaused,
    autoAdvance,
    intervalMs,
    timerKey,
    isPaused,
  } = useRotator(servicesData, { autoAdvance: true, intervalMs: 4500 });

  const renderContent = (service: typeof servicesData[0]) => (
    <div className="relative z-10 w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full flex flex-col justify-between"
      >
        {/* Top Category & Number Header Row */}
        <div className="w-full flex items-center justify-between mb-3 md:mb-5">
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
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch">
          {/* Left Column: Image + Caption (Flex column filling height) */}
          <div className="md:col-span-5 flex flex-col justify-between h-full">
            <div className="flex-1 flex flex-col">
              <motion.div
                variants={imageVariants}
                className="relative overflow-hidden w-full h-[220px] md:h-[250px] lg:h-[270px] bg-neutral-100 shadow-sm group"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain md:object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </motion.div>

              <motion.p
                variants={fadeUpVariants}
                className="font-sans text-[11.5px] md:text-[12px] text-[#7c8491] max-w-[360px] mt-2.5 leading-[1.4]"
              >
                {service.caption}
              </motion.p>
            </div>
          </div>

          {/* Right Column: Title + Capability List Aligned */}
          <div className="md:col-span-7 flex flex-col justify-start">
            {/* Title placed directly on top of the bullet points */}
            <div className="overflow-hidden pb-3 mb-3 border-b border-black/[0.06]">
              <motion.h3
                variants={maskVariants}
                className="font-sans text-[clamp(2.0rem,2.8vw,3.6rem)] leading-[1.05] tracking-[-0.035em] font-medium text-[#111111]"
              >
                {service.title}
              </motion.h3>
            </div>

            <ul className="space-y-2.5 pt-1">
              {service.capabilities.map((capability, i) => (
                <motion.li
                  key={i}
                  variants={fadeUpVariants}
                  className="font-sans text-[14.5px] md:text-[16px] leading-[1.65] text-[#555d6b] flex items-start"
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
  );

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full bg-white text-[#111111] h-[1080px] min-h-[1080px] py-10 md:py-14 flex flex-col justify-center overflow-hidden snap-section select-none"
    >
      {/* Background GridLines */}
      <GridLines light />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-0 relative z-10">
        {/* Upper Header Row matching ServicesSection Grid Columns */}
        <div className="relative w-full flex flex-col md:flex-row items-start mb-6 md:mb-8">
          {/* Far Left Section Marker: 10.8% to 30.3% */}
          <div className="w-full md:w-[19.5%] md:ml-[10.8%] px-6 md:px-0 pt-1 mb-6 md:mb-0">
            <SectionEyebrow number="05" label="PORTFOLIO" className="!mb-0" />
          </div>

          {/* Heading Block: 30.3% to 69.3% */}
          <div className="w-full md:w-[39.0%] px-6 md:px-0 pt-0.5 mb-6 md:mb-0">
            <h2 className="font-sans text-[clamp(2.3rem,3.2vw,4.1rem)] font-normal tracking-[-0.04em] leading-[0.94] text-left">
              <span className="block text-[#111111]">CASE</span>
              <span className="block text-[#6b6b6b] font-medium">STUDIES.</span>
            </h2>

            <p className="font-mono text-[10px] md:text-[11px] leading-relaxed text-[#6b6b6b] mt-4 md:mt-5 uppercase tracking-wide max-w-[280px]">
              REAL OUTCOMES FROM REAL ENGAGEMENTS — BUILT FOR ENTERPRISE SCALE.
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

        {/* Tab Strip + Slider Container (30.3% to 88.8% width: 58.5%) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full md:w-[58.5%] md:ml-[30.3%] px-6 md:px-0"
        >
          <div className="mb-4">
            <RotatorTabStrip
              items={servicesData.map((s) => ({ id: s.id, label: s.num }))}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              autoAdvance={autoAdvance}
              intervalMs={intervalMs}
              timerKey={timerKey}
              isPaused={isPaused}
            />
          </div>

          <div className="relative min-h-[300px] md:min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: EASE_CUSTOM }}
                className="w-full"
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
