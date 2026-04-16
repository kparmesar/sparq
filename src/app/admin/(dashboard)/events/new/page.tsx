import Link from "next/link";
import { createEvent } from "@/lib/admin/actions-crud";
import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/events" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">New Event</h1>
      </div>
      <EventForm action={createEvent} />
    </div>
  );
}
