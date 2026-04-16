import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { events } from "@/lib/db/schema";
import { updateEvent } from "@/lib/admin/actions-crud";
import EventForm from "@/components/admin/EventForm";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(events).where(eq(events.id, Number(id))).limit(1);
  const event = rows[0];
  if (!event) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/events" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">Edit Event</h1>
      </div>
      <EventForm action={updateEvent} event={event} />
    </div>
  );
}
