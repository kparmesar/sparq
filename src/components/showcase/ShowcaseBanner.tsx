"use client";

import { motion } from "framer-motion";

export default function ShowcaseBanner() {
  return (
    <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16 overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-white"
        >
          Showcase
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-lg text-blue-200"
        >
          Publications, posters, presentations, and project highlights from our network.
        </motion.p>
      </div>
    </section>
  );
}
