"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 mb-8">
          <svg
            className="w-12 h-12 text-accent-coral"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-extrabold text-neutral-900 mb-2">500</h1>
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">
          Something went wrong
        </h2>
        <p className="text-neutral-500 max-w-md mx-auto mb-8">
          An unexpected error occurred. Please try again, and if the problem
          persists, contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary bg-primary-light rounded-xl hover:bg-primary-light/80 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
