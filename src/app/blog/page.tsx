import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/db/queries";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, training tips, and insights from the SPARQ network.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16 overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Blog
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            News, training tips, and insights from the SPARQ network.
          </p>
        </div>
      </section>

      <BlogList posts={posts} />
    </div>
  );
}
