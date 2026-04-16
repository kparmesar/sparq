import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-light mb-8">
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-extrabold text-neutral-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">
          Page not found
        </h2>
        <p className="text-neutral-500 max-w-md mx-auto mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary bg-primary-light rounded-xl hover:bg-primary-light/80 transition-colors"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
