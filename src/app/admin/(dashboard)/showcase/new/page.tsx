import Link from "next/link";
import { createShowcaseItem } from "@/lib/admin/actions-crud";
import ShowcaseForm from "@/components/admin/ShowcaseForm";

export default function NewShowcaseItemPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/showcase" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">New Showcase Item</h1>
      </div>
      <ShowcaseForm action={createShowcaseItem} />
    </div>
  );
}
