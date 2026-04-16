"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/db/schema";

const CATEGORY_COLORS: Record<string, string> = {
  news: "bg-primary-light text-primary",
  training: "bg-green-50 text-secondary",
  insights: "bg-purple-50 text-purple-700",
  events: "bg-amber-50 text-amber-700",
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl bg-gradient-to-br from-primary-light/50 to-white border border-primary/20 p-8 hover:shadow-lg transition-all"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white mb-4">
                Featured
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="mt-3 text-neutral-600 text-lg leading-relaxed">
                {featured.excerpt}
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                {featured.author} · {formatDate(featured.publishedAt ?? "")}
              </p>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl bg-white border border-neutral-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category]} mb-3`}
                >
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </span>
                <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-neutral-500">
                  {post.author} · {formatDate(post.publishedAt ?? "")}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
