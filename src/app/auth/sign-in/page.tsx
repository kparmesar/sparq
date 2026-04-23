"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signInWithEmail } from "./actions";

function SignInForm() {
  const [state, formAction, pending] = useActionState(signInWithEmail, null);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Sign In
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Access your SPARQ account and notification preferences.
          </p>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="mx-auto max-w-md px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
            {message && (
              <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
                {message}
              </div>
            )}
            {state?.error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium">
                {state.error}
              </div>
            )}

            <form action={formAction} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {pending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-sm text-neutral-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href={`/auth/sign-up${message ? `?message=${encodeURIComponent(message)}` : ""}`}
                className="text-primary font-medium hover:underline"
              >
                Join SPARQ
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
