export function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-200 ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex gap-2 mb-3">
        <SkeletonPulse className="h-5 w-16 rounded-full" />
        <SkeletonPulse className="h-5 w-20 rounded-full" />
      </div>
      <SkeletonPulse className="h-5 w-3/4 mb-2" />
      <SkeletonPulse className="h-4 w-full mb-1" />
      <SkeletonPulse className="h-4 w-5/6 mb-4" />
      <div className="flex justify-between">
        <SkeletonPulse className="h-3 w-32" />
        <SkeletonPulse className="h-3 w-20" />
      </div>
    </div>
  );
}

export function SkeletonBanner() {
  return (
    <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <SkeletonPulse className="h-10 w-48 mx-auto mb-4 !bg-white/20" />
        <SkeletonPulse className="h-5 w-80 mx-auto !bg-white/10" />
      </div>
    </section>
  );
}
