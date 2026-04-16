import Link from "next/link";
import { createBlogPost } from "@/lib/admin/actions-crud";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">New Blog Post</h1>
      </div>
      <BlogPostForm action={createBlogPost} />
    </div>
  );
}
