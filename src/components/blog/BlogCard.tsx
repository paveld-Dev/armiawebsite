"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogArticle } from "@/data/blog";
import { EASE_CUSTOM } from "@/lib/motion";

interface BlogCardProps {
  article: BlogArticle;
  index: number;
}

export function BlogCard({ article, index }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, clipPath: "inset(0 0 20% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE_CUSTOM,
      }}
      className="group relative flex flex-col w-full h-full border-b border-black/[0.05]"
    >
      {/* Date Bar Header */}
      <div className="flex items-center justify-between h-[44px] px-4 md:px-6 border-t border-b border-black/[0.055] font-mono text-[8px] tracking-[0.04em] uppercase text-[#666666] select-none bg-white">
        <span>{article.date}</span>
        <span className="text-[#cccccc] tracking-tighter text-[9px] font-bold">▪▪▪</span>
      </div>

      {/* Image Container with Staggered Aspect Ratio */}
      <div className={`relative w-full overflow-hidden bg-[#f4f4f4] ${article.aspectRatioClass}`}>
        {!imageError ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Placeholder Container when user hasn't added custom image yet */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-neutral-100 text-neutral-400 font-mono text-[9px] uppercase tracking-widest text-center border border-dashed border-neutral-300">
            <div className="h-6 w-6 rounded-full border border-neutral-300 flex items-center justify-center mb-2 text-[10px] text-neutral-500">
              {index + 1}
            </div>
            <span>IMAGE CONTAINER</span>
            <span className="text-[7.5px] text-neutral-400 mt-1">({article.image})</span>
          </div>
        )}
      </div>

      {/* Article Content Area */}
      <div className="p-6 md:p-7 flex flex-col justify-between flex-1 bg-white">
        <div>
          {/* Category Marker */}
          <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.04em] uppercase text-[#686864] mb-3">
            <span className="h-[4px] w-[4px] bg-brand-accent inline-block shrink-0" />
            <span>{article.category}</span>
          </div>

          {/* Article Title */}
          <h3 className="font-sans text-[clamp(1.05rem,1.25vw,1.4rem)] font-medium tracking-[-0.025em] leading-[1.08] text-[#111111] uppercase mb-3 transition-colors duration-200 group-hover:text-black">
            <Link href={article.href} className="focus:outline-none focus-visible:underline">
              {article.title}
            </Link>
          </h3>

          {/* Article Description */}
          <p className="font-sans text-[11px] md:text-[12px] leading-[1.5] text-[#777777] max-w-[92%] mb-6">
            {article.description}
          </p>
        </div>

        {/* Read Article Link */}
        <div className="pt-2">
          <Link
            href={article.href}
            className="inline-flex items-center gap-1.5 font-mono text-[8px] md:text-[9px] font-medium tracking-widest uppercase text-[#111111] transition-colors duration-200 group-hover:text-brand-accent focus:outline-none"
          >
            <span>READ ARTICLE</span>
            <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">
              ›
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
