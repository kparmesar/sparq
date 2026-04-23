import type { Metadata } from "next";
import { getEvents } from "@/lib/db/queries";
import EventList from "@/components/events/EventList";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Study days, workshops, journal clubs, and research symposia from the SPARQ network.",
};

export default async function EventsPage() {
  const allEvents = await getEvents();
  const now = new Date();
  const upcoming = allEvents
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = allEvents
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16 overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Events
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Study days, workshops, journal clubs, and research symposia.
          </p>
        </div>
      </section>

      <EventList upcoming={upcoming} past={past} />
    </div>
  );
}
