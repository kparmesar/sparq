"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MOCK_SHOWCASE } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "publication", label: "Publications" },
  { value: "poster", label: "Posters" },
  { value: "presentation", label: "Presentations" },
  { value: "qi", label: "QI Projects" },
  { value: "audit", label: "Audits" },
  { value: "other", label: "Other" },
];

const CATEGORY_COLORS: Record<string, string> = {
  publication: "bg-primary-light text-primary",
  poster: "bg-purple-50 text-purple-700",
  presentation: "bg-amber-50 text-amber-700",
  qi: "bg-green-50 text-secondary",
  audit: "bg-red-50 text-accent-coral",
  other: "bg-neutral-100 text-neutral-600",
};

export default function ShowcasePage() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return MOCK_SHOWCASE;
    return MOCK_SHOWCASE.filter((item) => item.category === category);
  }, [category]);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-28 pb-16 overflow-hidden relative">
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

      {/* Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 -mx-4 px-4 scrollbar-hide">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCategory(opt.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === opt.value
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-neutral-50 min-h-[50vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-neutral-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${CATEGORY_COLORS[item.category]}`}
                >
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                <h3 className="font-bold text-neutral-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {item.authors.join(", ")} · {formatDate(item.date)}
                </p>
                <p className="mt-3 text-sm text-neutral-600 line-clamp-3">
                  {item.description}
                </p>
                {item.doi && (
                  <a
                    href={`https://doi.org/${item.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:text-primary-dark"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    View Publication
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
