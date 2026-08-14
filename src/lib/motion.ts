// src/lib/motion.ts
// Shared easing + reusable Framer Motion variants.
// Import EASE_CUSTOM / variants here instead of redefining transitions
// inline in every section — keeps motion consistent and easy to retune.

// Corrected to match the easing curve already used in FAQItem.tsx and
// BlogCard.tsx ([0.22, 1, 0.36, 1]) — that's your project's real custom
// ease, not a guess. (An earlier pass used [0.16, 0.8, 0.24, 1] before
// those files were available; this replaces it everywhere.)
export const EASE_CUSTOM = [0.22, 1, 0.36, 1] as const;

/** Simple fade + rise. Good default for headings / paragraphs. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_CUSTOM },
  },
};

/** Fade + rise, smaller travel distance — for tight list items (FAQ rows, links). */
export const fadeUpSmall = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_CUSTOM },
  },
};

/** Soft scale-in — good for cards (testimonials, blog cards). */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_CUSTOM },
  },
};

/** Horizontal slide from the left — for left-column copy blocks. */
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_CUSTOM },
  },
};

/** Horizontal slide from the right — for right-column/media blocks. */
export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_CUSTOM },
  },
};

/** Clip-path wipe reveal — distinctive "unveil" effect, good for imagery. */
export const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_CUSTOM },
  },
};

/**
 * Parent wrapper — stagger children's entrance.
 * Usage: <motion.div variants={staggerContainer()} initial="hidden" whileInView="show">
 */
export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Standard viewport config so "once" / trigger margin stays consistent site-wide. */
export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px -10% 0px" };

export const maskedLine = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_CUSTOM,
    },
  },
};

export const revealFromBottom = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
  },
  show: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.85,
      ease: EASE_CUSTOM,
    },
  },
};

export const revealFromLeft = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.8,
      ease: EASE_CUSTOM,
    },
  },
};

