"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);

    if (!email) {
      setError("Please enter your email address.");
      setPending(false);
      return;
    }

    try {
      await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }),
      });
      // Always show success to prevent email enumeration
      setSent(true);
    } catch {
      setSent(true);
    }

    setPending(false);
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Reset Password
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Enter your email to receive a password reset link.
          </p>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="mx-auto max-w-md px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8">
            {sent ? (
              <div>
                <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
                  If an account exists with that email, a reset link has been
                  sent. Please check your inbox.
                </div>
                <Link
                  href="/auth/sign-in"
                  className="block text-center text-sm text-primary font-medium hover:underline"
                >
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium">
                    {error}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {pending ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>

                <p className="text-center text-sm text-neutral-500 mt-6">
                  <Link
                    href="/auth/sign-in"
                    className="text-primary font-medium hover:underline"
                  >
                    Back to Sign In
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
