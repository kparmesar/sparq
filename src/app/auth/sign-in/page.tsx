"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function SignInForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get("message");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setVerifyEmail("");
    setVerificationSent(false);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Email and password are required.");
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.code === "EMAIL_NOT_VERIFIED") {
          router.push("/auth/verify-email?email=" + encodeURIComponent(email));
          return;
        }
        setError(data?.message || "Invalid credentials.");
        setPending(false);
        return;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setPending(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  async function resendVerification() {
    if (!verifyEmail) return;
    try {
      await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verifyEmail }),
      });
      setVerificationSent(true);
    } catch {
      // ignore
    }
  }

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
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium">
                {error}
                {verifyEmail && !verificationSent && (
                  <button
                    type="button"
                    onClick={resendVerification}
                    className="block mt-2 text-primary font-medium hover:underline"
                  >
                    Resend verification email
                  </button>
                )}
                {verificationSent && (
                  <p className="mt-2 text-green-700">
                    Verification email sent! Check your inbox.
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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

            <p className="text-center text-sm text-neutral-500 mt-4">
              <Link
                href="/auth/forgot-password"
                className="text-primary font-medium hover:underline"
              >
                Forgot your password?
              </Link>
            </p>

            <p className="text-center text-sm text-neutral-500 mt-3">
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
