"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";

const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b3d] via-[#1a2f6e] to-[#1D4ED8] animate-gradient" />

      {/* Interactive particle field */}
      <div className="absolute inset-0">
        <ParticleField />
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-green-400/10 blur-3xl pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
        >
          {SITE_TAGLINE.split("collaboration").map((part, i) =>
            i === 0 ? (
              <span key={i}>
                {part}
                <span className="bg-gradient-to-r from-accent-yellow via-green-300 to-blue-300 bg-clip-text text-transparent">
                  collaboration
                </span>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto"
        >
          We bring together paediatric trainees across the Severn region to lead
          and collaborate on research, quality improvement, and audit projects
          that make a difference to child health.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary-dark bg-white rounded-xl shadow-lg shadow-black/20 hover:shadow-xl hover:scale-105 transition-all"
          >
            Explore Projects
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white border-2 border-white/30 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            Get Involved
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
