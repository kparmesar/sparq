import type { Event as DbEvent } from "@/lib/db/schema";

interface Props {
  action: (formData: FormData) => Promise<void>;
  event?: DbEvent;
}

function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function EventForm({ action, event }: Props) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      {event && <input type="hidden" name="id" value={event.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={event?.title}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            required
            defaultValue={event?.date ? toDatetimeLocal(event.date) : ""}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
            End Date & Time <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            defaultValue={event?.endDate ? toDatetimeLocal(event.endDate) : ""}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isVirtual"
          name="isVirtual"
          defaultChecked={event?.isVirtual}
          className="rounded border-neutral-300"
        />
        <label htmlFor="isVirtual" className="text-sm text-neutral-700">Virtual event</label>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
          Location <span className="text-neutral-400 font-normal">(leave blank for virtual)</span>
        </label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={event?.location}
          placeholder="Bristol Royal Hospital for Children"
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
          defaultValue={event?.description}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
        />
      </div>

      <div>
        <label htmlFor="registrationUrl" className="block text-sm font-medium text-neutral-700 mb-1">
          Registration / Luma URL <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <input
          type="url"
          id="registrationUrl"
          name="registrationUrl"
          defaultValue={event?.registrationUrl || ""}
          placeholder="https://lu.ma/your-event"
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Paste a Luma event URL to enable RSVP via Luma. Any registration link works.
        </p>
      </div>

      <button
        type="submit"
        className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
      >
        {event ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
}
