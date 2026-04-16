import Link from "next/link";
import { getBlogPosts } from "@/lib/db/queries";
import { deleteBlogPost } from "@/lib/admin/actions-crud";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-neutral-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
          <p className="text-neutral-500">No blog posts yet.</p>
          <Link href="/admin/blog/new" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-900 text-sm truncate">{post.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {post.category} · {post.author} · {new Date(post.publishedAt).toLocaleDateString("en-GB")}
                  {post.featured && <span className="ml-2 text-amber-600 font-medium">★ Featured</span>}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteBlogPost} id={post.id} confirmMessage="Delete this post?" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
