"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Event as DbEvent } from "@/lib/db/schema";

export default function EventList({
  upcoming,
  past,
}: {
  upcoming: DbEvent[];
  past: DbEvent[];
}) {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Upcoming Events
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-neutral-500 py-8">
            No upcoming events at the moment. Check back soon!
          </p>
        ) : (
          <div className="space-y-4 mb-12">
            {upcoming.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/events/${event.slug}`}
                  className="group flex gap-5 rounded-2xl bg-white border border-neutral-200 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-light flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-primary leading-none">
                      {new Date(event.date).toLocaleDateString("en-GB", { month: "short" }).toUpperCase()}
                    </span>
                    <span className="text-2xl font-extrabold text-primary leading-none mt-0.5">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors text-lg">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {event.isVirtual ? "🌐 Virtual Event" : `📍 ${event.location}`}
                      {" · "}
                      {formatDate(event.date)}
                    </p>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                      {event.description}
                    </p>
                    {event.registrationUrl && (
                      <span className="inline-block mt-3 text-sm font-medium text-primary">
                        Register →
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Past Events
            </h2>
            <div className="space-y-3">
              {past.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="flex items-center gap-4 rounded-xl bg-neutral-50 border border-neutral-200 p-4 hover:bg-white transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-neutral-200 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-neutral-500 leading-none">
                      {new Date(event.date).toLocaleDateString("en-GB", { month: "short" }).toUpperCase()}
                    </span>
                    <span className="text-lg font-extrabold text-neutral-500 leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-700 text-sm">
                      {event.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {event.isVirtual ? "Virtual" : event.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
