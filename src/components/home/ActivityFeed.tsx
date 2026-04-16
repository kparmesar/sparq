"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_EVENTS, MOCK_SHOWCASE } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const TYPE_COLORS = {
  research: "bg-primary-light text-primary",
  qi: "bg-green-50 text-secondary",
  audit: "bg-red-50 text-accent-coral",
};

const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  completed: "bg-neutral-100 text-neutral-600",
  recruiting: "bg-yellow-100 text-yellow-800",
  planned: "bg-blue-100 text-blue-800",
};

export default function ActivityFeed() {
  const latestProjects = MOCK_PROJECTS.slice(0, 3);
  const latestEvents = MOCK_EVENTS.slice(0, 2);
  const latestShowcase = MOCK_SHOWCASE.slice(0, 2);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
            Latest Activity
          </h2>
          <p className="mt-3 text-lg text-neutral-600">
            Recent projects, events, and academic output from our network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Projects</h3>
              <Link
                href="/projects"
                className="text-sm font-medium text-primary hover:text-primary-dark"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {latestProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block rounded-xl bg-white p-4 border border-neutral-200 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${TYPE_COLORS[project.type]}`}
                      >
                        {project.type.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[project.status]}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-neutral-900 text-sm leading-snug">
                      {project.title}
                    </h4>
                    <p className="mt-1 text-xs text-neutral-500">
                      {project.leadAuthors.join(", ")}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">
                Upcoming Events
              </h3>
              <Link
                href="/events"
                className="text-sm font-medium text-primary hover:text-primary-dark"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {latestEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/events/${event.slug}`}
                    className="block rounded-xl bg-white p-4 border border-neutral-200 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-light flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-primary leading-none">
                          {new Date(event.date).toLocaleDateString("en-GB", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-lg font-extrabold text-primary leading-none">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-neutral-900 text-sm leading-snug">
                          {event.title}
                        </h4>
                        <p className="mt-1 text-xs text-neutral-500">
                          {event.isVirtual ? "🌐 Virtual" : `📍 ${event.location}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Showcase */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Showcase</h3>
              <Link
                href="/showcase"
                className="text-sm font-medium text-primary hover:text-primary-dark"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {latestShowcase.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/showcase/${item.slug}`}
                    className="block rounded-xl bg-white p-4 border border-neutral-200 hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 mb-2">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-neutral-500">
                      {item.authors.join(", ")} · {formatDate(item.date)}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
