"use client";

import Link from "next/link";
import { useState } from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signUpWithEmail } from "./actions";

const ALLOWED_DOMAINS = ["nhs.net", "bristol.ac.uk"];

function isEmailDomainValid(email: string) {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return null; // not yet typed
  return ALLOWED_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
}

function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpWithEmail, null);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const [email, setEmail] = useState("");

  const domainCheck = email.includes("@") ? isEmailDomainValid(email) : null;

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Join SPARQ
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Create an account to receive updates on projects, events, and
            opportunities.
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
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    domainCheck === false
                      ? "border-red-300 focus:border-red-400"
                      : domainCheck === true
                        ? "border-green-300 focus:border-green-400"
                        : "border-neutral-200 focus:border-primary"
                  }`}
                />
                {domainCheck === false && (
                  <p className="text-xs text-red-500 mt-1">
                    Only @nhs.net and @bristol.ac.uk emails are allowed.
                  </p>
                )}
                {domainCheck === true && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Valid email domain
                  </p>
                )}
                {domainCheck === null && email === "" && (
                  <p className="text-xs text-neutral-400 mt-1">
                    Use your @nhs.net or @bristol.ac.uk email
                  </p>
                )}
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
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <p className="text-xs text-neutral-400 mt-1">
                  At least 8 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={pending || domainCheck === false}
                className="w-full px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {pending ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-neutral-500 mt-6">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
