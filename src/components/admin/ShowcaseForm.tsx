import type { ShowcaseItem } from "@/lib/db/schema";

interface Props {
  action: (formData: FormData) => Promise<void>;
  item?: ShowcaseItem;
}

export default function ShowcaseForm({ action, item }: Props) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={item?.title}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
        <select
          id="category"
          name="category"
          required
          defaultValue={item?.category || ""}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="">Select...</option>
          <option value="publication">Publication</option>
          <option value="poster">Poster</option>
          <option value="presentation">Presentation</option>
          <option value="qi">QI</option>
          <option value="audit">Audit</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="authors" className="block text-sm font-medium text-neutral-700 mb-1">
          Authors <span className="text-neutral-400 font-normal">(comma-separated)</span>
        </label>
        <input
          type="text"
          id="authors"
          name="authors"
          required
          defaultValue={item?.authors.join(", ")}
          placeholder="Dr Jane Smith, Dr John Doe"
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={item?.description}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="doi" className="block text-sm font-medium text-neutral-700 mb-1">
            DOI <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="doi"
            name="doi"
            defaultValue={item?.doi || ""}
            placeholder="10.1234/example"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="documentUrl" className="block text-sm font-medium text-neutral-700 mb-1">
            Document URL <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            id="documentUrl"
            name="documentUrl"
            defaultValue={item?.documentUrl || ""}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
      >
        {item ? "Update Item" : "Create Item"}
      </button>
    </form>
  );
}
