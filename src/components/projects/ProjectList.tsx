"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { SITE_OPTIONS } from "@/lib/constants";
import type { Project } from "@/lib/db/schema";

const TYPE_OPTIONS = ["all", "research", "qi", "audit"] as const;
const STATUS_OPTIONS = ["all", "active", "completed", "recruiting", "planned"] as const;

const TYPE_LABELS: Record<string, string> = {
  all: "All Types",
  research: "Research",
  qi: "Quality Improvement",
  audit: "Audit",
};

const TYPE_COLORS: Record<string, string> = {
  research: "bg-primary-light text-primary",
  qi: "bg-green-50 text-secondary",
  audit: "bg-red-50 text-accent-coral",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  completed: "bg-neutral-100 text-neutral-600",
  recruiting: "bg-yellow-100 text-yellow-800",
  planned: "bg-blue-100 text-blue-800",
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const typeFilter = searchParams.get("type") ?? "all";
  const statusFilter = searchParams.get("status") ?? "all";
  const siteFilter = searchParams.get("site") ?? "all";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
  }

  // Client-side filter for instant response
  const filtered = projects.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesSite = siteFilter === "all" || (p.site ?? []).includes(siteFilter);
    return matchesSearch && matchesType && matchesStatus && matchesSite;
  });

  return (
    <>
      {/* Search & Filters */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search projects, authors, tags..."
                defaultValue={search}
                onChange={(e) => updateParams("q", e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => updateParams("type", e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABELS[t]}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => updateParams("status", e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={siteFilter}
              onChange={(e) => updateParams("site", e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">All Sites</option>
              {SITE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10 bg-neutral-50 min-h-[50vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-neutral-500 mb-6">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">
                No projects match your filters.
              </p>
              <button
                onClick={() => router.push("/projects")}
                className="mt-3 text-primary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block h-full rounded-2xl bg-white border border-neutral-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${TYPE_COLORS[project.type]}`}
                      >
                        {project.type === "qi" ? "QI" : project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[project.status]}`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                      <span>{(project.leadAuthors ?? []).join(", ")}</span>
                      <span>{formatDate(project.startDate ?? "")}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(project.site ?? []).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-xs bg-primary-light text-primary rounded-md font-medium"
                        >
                          {s}
                        </span>
                      ))}
                      {(project.specialty ?? []).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded-md"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
