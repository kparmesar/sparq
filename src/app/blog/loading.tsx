import { SkeletonBanner, SkeletonCard } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div>
      <SkeletonBanner />
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Featured skeleton */}
          <div className="mb-12 rounded-2xl border border-neutral-200 p-8 animate-pulse">
            <div className="h-5 w-20 rounded-full bg-neutral-200 mb-4" />
            <div className="h-8 w-3/4 rounded bg-neutral-200 mb-3" />
            <div className="h-4 w-full rounded bg-neutral-200 mb-2" />
            <div className="h-4 w-2/3 rounded bg-neutral-200 mb-4" />
            <div className="h-3 w-40 rounded bg-neutral-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
