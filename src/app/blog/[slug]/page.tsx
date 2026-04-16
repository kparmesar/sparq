import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-blue-200">
            {post.author} · {formatDate(post.publishedAt)}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none text-lg leading-relaxed">
            <p>{post.excerpt}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
