import Link from "next/link";
import { getEvents } from "@/lib/db/queries";
import { deleteEvent } from "@/lib/admin/actions-crud";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/utils";

export default async function AdminEventsPage() {
  const eventsList = await getEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-neutral-900">Events</h1>
        <Link
          href="/admin/events/new"
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          + New Event
        </Link>
      </div>

      <div className="mb-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Paste a Luma URL (e.g. https://lu.ma/your-event) in the Registration URL field to let visitors RSVP via Luma.
        </p>
      </div>

      {eventsList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
          <p className="text-neutral-500">No events yet.</p>
          <Link href="/admin/events/new" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">
            Create your first event →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100">
          {eventsList.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-900 text-sm truncate">{event.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {formatDate(event.date)} · {event.isVirtual ? "Virtual" : event.location}
                  {event.registrationUrl?.includes("lu.ma") && (
                    <span className="ml-2 text-purple-600 font-medium">🔗 Luma</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/admin/events/${event.id}/edit`}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteEvent} id={event.id} confirmMessage="Delete this event?" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
