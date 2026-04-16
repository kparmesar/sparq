"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { STATS } from "@/lib/constants";

function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.span className="text-4xl sm:text-5xl font-extrabold text-white">
        {rounded}
      </motion.span>
      <p className="mt-1 text-sm text-blue-200">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-primary-dark via-primary to-blue-500 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <Counter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
