import { SkeletonBanner, SkeletonPulse } from "@/components/ui/Skeleton";

export default function EventsLoading() {
  return (
    <div>
      <SkeletonBanner />
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SkeletonPulse className="h-6 w-40 mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 flex gap-4"
              >
                <div className="w-16 h-16 rounded-lg bg-neutral-100 animate-pulse flex-shrink-0" />
                <div className="flex-1">
                  <SkeletonPulse className="h-5 w-3/4 mb-2" />
                  <SkeletonPulse className="h-4 w-full mb-1" />
                  <SkeletonPulse className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
