import { SkeletonBanner, SkeletonCard } from "@/components/ui/Skeleton";

export default function ShowcaseLoading() {
  return (
    <div>
      <SkeletonBanner />
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category tabs skeleton */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-24 rounded-full bg-neutral-100 animate-pulse flex-shrink-0"
              />
            ))}
          </div>
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
