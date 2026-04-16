import Link from "next/link";
import { getShowcaseItems } from "@/lib/db/queries";
import { deleteShowcaseItem } from "@/lib/admin/actions-crud";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminShowcasePage() {
  const items = await getShowcaseItems();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-neutral-900">Showcase</h1>
        <Link
          href="/admin/showcase/new"
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          + New Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
          <p className="text-neutral-500">No showcase items yet.</p>
          <Link href="/admin/showcase/new" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">
            Add your first item →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-900 text-sm truncate">{item.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {item.category} · {item.authors.join(", ")} · {new Date(item.date).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/admin/showcase/${item.id}/edit`}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteShowcaseItem} id={item.id} confirmMessage="Delete this item?" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
