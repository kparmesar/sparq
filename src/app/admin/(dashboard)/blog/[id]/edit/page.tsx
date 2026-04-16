import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { blogPosts } from "@/lib/db/schema";
import { updateBlogPost } from "@/lib/admin/actions-crud";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id))).limit(1);
  const post = rows[0];
  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">Edit Post</h1>
      </div>
      <BlogPostForm action={updateBlogPost} post={post} />
    </div>
  );
}
