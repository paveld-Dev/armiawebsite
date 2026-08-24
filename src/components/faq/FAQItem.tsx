"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQItemData } from "@/data/faqs";
import { EASE_CUSTOM } from "@/lib/motion";

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="relative z-10 bg-[#161616] border-b border-white/[0.08]">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.id}`}
          id={`faq-button-${item.id}`}
          className="group flex items-center justify-between w-full py-4 md:py-5 px-4 md:px-6 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent min-h-[56px] md:min-h-[68px] bg-[#161616] hover:bg-[#1a1a1a] transition-colors"
        >
          <div className="flex items-center gap-3 md:gap-4 pr-4">
            {/* Active Orange Square Marker */}
            <div className="relative w-[14px] h-[4px] flex items-center justify-center shrink-0">
              <span className="absolute h-[4px] w-[4px] bg-transparent inline-block group-hover:bg-brand-accent/40 transition-colors" />
              <motion.span
                animate={{ scale: isOpen ? 1 : 0 }}
                transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                className="absolute h-[4px] w-[4px] bg-brand-accent inline-block"
              />
            </div>

            {/* Question Number */}
            <span className="font-mono text-xs text-[#777777] font-normal w-[30px] shrink-0 group-hover:text-brand-accent transition-colors">
              {item.number}
            </span>

            {/* Question Text */}
            <span className={`font-sans text-[clamp(0.95rem,1vw,1.15rem)] font-medium tracking-[-0.015em] uppercase leading-[1.25] transition-colors ${
              isOpen ? "text-white" : "text-[#d0d0cc] group-hover:text-white"
            }`}>
              {item.question}
            </span>
          </div>

          {/* Toggle icon */}
          <div className="relative w-11 h-11 flex items-center justify-center shrink-0 text-[#888888] group-hover:text-white transition-colors">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease: EASE_CUSTOM }}
              className="relative block w-[13px] h-[13px]"
            >
              <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-current" />
              <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-current rotate-90" />
            </motion.span>
          </div>
        </button>
      </h3>

      {/* Expandable Answer Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-button-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE_CUSTOM }}
            className="overflow-hidden bg-[#161616]"
          >
            <div className="pb-6 pt-1 pl-[64px] md:pl-[78px] pr-6 md:pr-12 max-w-[680px] max-h-[140px] md:max-h-[160px] overflow-y-auto">
              {item.answer.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="font-sans text-[14px] md:text-[15px] leading-[1.55] text-[#a4a4a2] mb-2.5 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
