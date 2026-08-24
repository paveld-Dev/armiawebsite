"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GridLines } from "@/components/ui/GridLines";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { EASE_CUSTOM, fadeUp, fadeUpSmall, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import { TypewriterText } from "@/components/effects/TypewriterText";

export function FooterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Thank you! Your message has been submitted.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <footer
      id="contact"
      data-theme="dark"
      className="relative w-full bg-black text-white pt-0 pb-12 overflow-hidden select-none border-t-[3px] border-brand-accent"
    >
      <GridLines />

      <div className="relative z-10 mx-auto max-w-[1920px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

          {/* Left Column — Engineer Card, Info & Brand Logo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="lg:col-span-4 p-6 md:p-10 lg:p-12 flex flex-col justify-between h-full bg-black"
          >
            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="relative w-full mb-10 overflow-hidden bg-neutral-900 border-t-[3px] border-brand-accent shadow-2xl group">
                  <div className="relative w-full aspect-[4/5] bg-neutral-800 overflow-hidden">
                    <Image
                      src="/images/engineering_team.png"
                      alt="Armia Leadership & Engineering"
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <a
                    href="mailto:hello@armiasystems.com"
                    className="flex items-center justify-between bg-[#111111] text-white h-[46px] px-5 font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-black group-hover:bg-[#151515]"
                  >
                    <span className="font-medium text-white/90">
                      GET IN TOUCH <span className="text-white/40 font-light">\ ARMIA</span>
                    </span>
                    <div className="flex items-center justify-center h-full w-[46px] -mr-5 bg-brand-accent transition-colors duration-300 group-hover:bg-[#ff4500]">
                      <span className="text-white text-xs font-semibold">›</span>
                    </div>
                  </a>
                </div>

                <div className="border-t border-b border-white/10 py-6">
                  <div className="flex items-center justify-between mb-4 font-mono text-[9px] tracking-widest uppercase text-white/60">
                    <div className="flex items-center gap-1.5">
                      <span className="h-[4px] w-[4px] bg-brand-accent inline-block" />
                      <span>ARMIA</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/50 text-xs font-serif">
                      <span>𝕏</span>
                      <span>in</span>
                      <span>🌐</span>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-[9px] md:text-[10px] uppercase">
                    <div className="grid grid-cols-12 gap-2 text-white/60">
                      <span className="col-span-4 text-white/40">PROFESSION</span>
                      <span className="col-span-8 text-white font-medium">ENTERPRISE-GRADE ENGINEERING SINCE 2001.</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 text-white/60">
                      <span className="col-span-4 text-white/40">LOCATION</span>
                      <span className="col-span-8 text-white font-medium">KOCHI, INDIA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Brand Logo */}
              <div className="pt-8 mt-auto border-t border-white/10">
                <div className="relative h-14 md:h-20 w-60 md:w-80 mb-6 flex items-center">
                  <Image
                    src="/images/armialogo.svg"
                    alt="Armia Systems Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest leading-relaxed">
                  <div>© {new Date().getFullYear()} ARMIA SYSTEMS INC. ALL RIGHTS RESERVED.</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Contact Form & Links */}
          <div className="lg:col-span-8 p-6 md:p-12 lg:p-16 flex flex-col justify-between bg-[#0a0a0a]">
            <div>
              {/* Section number 10 */}
              <SectionEyebrow number="10" label="CONTACT" dark />

              <div className="mb-8">
                <h2 className="font-sans text-[clamp(2.8rem,4.8vw,5.6rem)] font-bold tracking-[-0.04em] leading-[0.92] text-[#e5e5e5] uppercase max-w-3xl">
                  <span className="block">BUILD YOUR</span>
                  <span className="block">NEXT PROJECT</span>
                  <span className="block">WITH ARMIA.</span>
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: "15%" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, ease: EASE_CUSTOM, delay: 0.2 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 border-b border-white/10 pb-6"
              >
                <p className="font-mono text-[10px] md:text-[11px] tracking-wider text-white/60 uppercase leading-relaxed max-w-lg">
                  FROM FIRST CONCEPT TO FINAL BUILD, WE CREATE ENTERPRISE SOFTWARE WITH CLEAR ARCHITECTURE &amp; RELIABLE DELIVERY.
                </p>
                <div className="flex gap-1 text-brand-accent select-none">
                  <span className="h-1.5 w-1.5 bg-brand-accent inline-block" />
                  <span className="h-1.5 w-1.5 bg-brand-accent inline-block" />
                  <span className="h-1.5 w-1.5 bg-brand-accent inline-block" />
                  <span className="h-1.5 w-1.5 bg-white/20 inline-block" />
                </div>
              </motion.div>

              {/* Form fields reveal one after another instead of all at once */}
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE_CUSTOM, delay: 1.0 }}
                viewport={VIEWPORT_ONCE}
                className="space-y-6 mb-12 max-w-4xl"
              >
                <div className="space-y-6 mb-10 max-w-4xl">
                  <div className="pt-2">
                    <label className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-widest text-[#888888] uppercase mb-2">
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span>YOUR NAME</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#121212]/70 text-white font-mono text-xs px-5 py-3.5 border border-white/[0.07] rounded-none focus:outline-none focus:border-brand-accent placeholder:text-white/20 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-widest text-[#888888] uppercase mb-2">
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span>EMAIL ADDRESS</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hello@armiasystems.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121212]/70 text-white font-mono text-xs px-5 py-3.5 border border-white/[0.07] rounded-none focus:outline-none focus:border-brand-accent placeholder:text-white/20 transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] tracking-widest text-[#888888] uppercase mb-2">
                      <span className="h-1 w-1 bg-brand-accent inline-block" />
                      <span>HOW CAN I HELP?</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your project ..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#121212]/70 text-white font-mono text-xs px-5 py-3.5 border border-white/[0.07] rounded-none focus:outline-none focus:border-brand-accent placeholder:text-white/20 resize-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <motion.button
                    type="submit"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                    className="group/btn inline-flex items-center justify-between bg-brand-accent hover:bg-[#ff4500] text-white h-[48px] w-full md:w-auto min-w-[280px] pl-6 transition-colors duration-300"
                  >
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase font-bold">
                      {isFormValid ? "SEND MESSAGE" : "FORM INCOMPLETE"}
                    </span>
                    <div className="flex items-center justify-center h-full w-[48px] bg-white text-black transition-colors duration-300 group-hover/btn:bg-neutral-100">
                      <span className="text-black text-xs font-bold">›</span>
                    </div>
                  </motion.button>

                  <div className="font-mono text-[9px] text-white/40 tracking-wider">
                    By submitting, you agree to our <br className="hidden md:inline" />
                    <Link href="#terms" className="text-white/70 underline hover:text-white">Terms</Link> and{" "}
                    <Link href="#privacy" className="text-white/70 underline hover:text-white">Privacy Policy</Link>.
                  </div>
                </div>
              </motion.form>
            </div>

            <div className="pt-12 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12 font-mono text-[10px] tracking-wider uppercase">
                <div className="md:col-span-5 space-y-2.5">
                  <div><Link href="#products" className="text-white/70 hover:text-brand-accent transition-colors">PRODUCTS</Link></div>
                  <div><Link href="#services" className="text-white/70 hover:text-brand-accent transition-colors">SERVICES</Link></div>
                  <div><Link href="#solutions" className="text-white/70 hover:text-brand-accent transition-colors">SOLUTIONS</Link></div>
                  <div><Link href="#careers" className="text-white/70 hover:text-brand-accent transition-colors">CAREERS</Link></div>
                  <div><Link href="#contact" className="text-white/70 hover:text-brand-accent transition-colors">CONTACT</Link></div>
                  <div><Link href="#404" className="text-white/40 hover:text-brand-accent transition-colors">404</Link></div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="text-white/50 leading-relaxed font-sans normal-case text-xs">
                    3rd Floor, Jyothirmaya Building, <br />
                    Wing 1, Infopark Phase 2, Kochi, <br />
                    Kerala 682303
                  </div>

                  <div>
                    <a href="mailto:hello@armiasystems.com" className="font-mono font-bold text-sm text-white hover:text-brand-accent transition-colors tracking-widest">
                      HELLO@ARMIASYSTEMS.COM
                    </a>
                  </div>

                  <div>
                    <a href="#contact" className="group inline-flex items-center justify-between bg-[#181818] text-white h-[38px] px-4 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-neutral-800">
                      <span className="mr-3 font-medium">CONTACT ME</span>
                      <div className="flex items-center justify-center h-[26px] w-[26px] bg-brand-accent">
                        <span className="text-white text-xs font-semibold">›</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-[9px] text-white/40 tracking-widest uppercase">
                <Link href="#terms" className="hover:text-white transition-colors">TERMS</Link>
                <Link href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
