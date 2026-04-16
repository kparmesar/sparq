import {
  SkeletonBanner,
  SkeletonCard,
} from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <div>
      <SkeletonBanner />
      {/* Filter bar skeleton */}
      <section className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-10 rounded-xl bg-neutral-100 animate-pulse" />
            <div className="h-10 w-36 rounded-xl bg-neutral-100 animate-pulse" />
            <div className="h-10 w-36 rounded-xl bg-neutral-100 animate-pulse" />
          </div>
        </div>
      </section>
      <section className="py-10 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-24 rounded bg-neutral-200 animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
