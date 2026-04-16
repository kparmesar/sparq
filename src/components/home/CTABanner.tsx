"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-blue-500 animate-gradient" />
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/5 animate-float" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white/5 animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white/5 animate-float-slow" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-white"
        >
          Join the SPARQ Network
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto"
        >
          Whether you&apos;re looking to lead your first audit, collaborate on a
          multi-centre study, or develop your QI skills — SPARQ connects you
          with the support and opportunities you need.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Get Involved
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition-all"
          >
            Browse Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
