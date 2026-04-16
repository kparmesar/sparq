import type { BlogPost } from "@/lib/db/schema";

interface Props {
  action: (formData: FormData) => Promise<void>;
  post?: BlogPost;
}

export default function BlogPostForm({ action, post }: Props) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={post?.title}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-neutral-700 mb-1">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={post?.author || "SPARQ Committee"}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            required
            defaultValue={post?.category || ""}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Select...</option>
            <option value="news">News</option>
            <option value="training">Training</option>
            <option value="insights">Insights</option>
            <option value="events">Events</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-neutral-700 mb-1">Excerpt</label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-1">Content (Markdown)</label>
        <textarea
          id="content"
          name="content"
          rows={12}
          defaultValue={post?.content || ""}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={post?.featured}
          className="rounded border-neutral-300"
        />
        <label htmlFor="featured" className="text-sm text-neutral-700">Featured post</label>
      </div>

      <button
        type="submit"
        className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
      >
        {post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
