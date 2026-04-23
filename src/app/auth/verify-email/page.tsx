"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resent, setResent] = useState(false);
  const [sending, setSending] = useState(false);

  async function resendVerification() {
    if (!email || sending) return;
    setSending(true);
    try {
      await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setResent(true);
    } catch {
      // ignore
    }
    setSending(false);
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Check Your Email
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            One last step to activate your account.
          </p>
        </div>
      </section>

      <section className="py-12 bg-neutral-50">
        <div className="mx-auto max-w-md px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 text-center">
            <div className="mx-auto w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-neutral-900 mb-2">
              Verification link sent
            </h2>

            {email ? (
              <p className="text-sm text-neutral-500 mb-6">
                We&apos;ve sent a verification link to{" "}
                <span className="font-medium text-neutral-700">{email}</span>.
                Click the link in the email to verify your account, then come
                back to sign in.
              </p>
            ) : (
              <p className="text-sm text-neutral-500 mb-6">
                We&apos;ve sent a verification link to your email address.
                Click the link to verify your account, then come back to sign in.
              </p>
            )}

            <div className="space-y-3">
              <Link
                href="/auth/sign-in"
                className="block w-full px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors text-center"
              >
                Go to Sign In
              </Link>

              {email && (
                <button
                  type="button"
                  onClick={resendVerification}
                  disabled={sending || resent}
                  className="block w-full px-4 py-2.5 border border-neutral-200 text-neutral-700 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-colors disabled:opacity-50"
                >
                  {resent
                    ? "Verification email resent!"
                    : sending
                      ? "Sending..."
                      : "Resend verification email"}
                </button>
              )}
            </div>

            <p className="text-xs text-neutral-400 mt-6">
              Didn&apos;t receive it? Check your spam folder.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
