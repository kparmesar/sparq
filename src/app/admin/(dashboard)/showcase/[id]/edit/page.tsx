import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { showcase } from "@/lib/db/schema";
import { updateShowcaseItem } from "@/lib/admin/actions-crud";
import ShowcaseForm from "@/components/admin/ShowcaseForm";

export default async function EditShowcaseItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(showcase).where(eq(showcase.id, Number(id))).limit(1);
  const item = rows[0];
  if (!item) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/showcase" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">Edit Showcase Item</h1>
      </div>
      <ShowcaseForm action={updateShowcaseItem} item={item} />
    </div>
  );
}
