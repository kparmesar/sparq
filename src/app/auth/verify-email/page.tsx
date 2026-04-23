"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [resent, setResent] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    const next = [...otp];
    for (let i = 0; i < 6; i++) {
      next[i] = text[i] || "";
    }
    setOtp(next);
    const focusIndex = Math.min(text.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    setError("");
    setPending(true);

    try {
      const res = await fetch("/api/auth/email-otp/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message || "Invalid code. Please try again.");
        setPending(false);
        return;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setPending(false);
      return;
    }

    router.push("/auth/sign-in?message=" + encodeURIComponent("Email verified! You can now sign in."));
  }

  async function resendVerification() {
    if (!email || sending) return;
    setSending(true);
    try {
      await fetch("/api/auth/email-otp/send-verification-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "email-verification" }),
      });
      setResent(true);
      setTimeout(() => setResent(false), 5000);
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
            Verify Your Email
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Enter the 6-digit code we sent to your inbox.
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
              Enter verification code
            </h2>

            {email && (
              <p className="text-sm text-neutral-500 mb-6">
                We&apos;ve sent a 6-digit code to{" "}
                <span className="font-medium text-neutral-700">{email}</span>.
              </p>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-bold border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={pending || otp.join("").length !== 6}
                className="w-full px-4 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {pending ? "Verifying..." : "Verify Email"}
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {email && (
                <button
                  type="button"
                  onClick={resendVerification}
                  disabled={sending || resent}
                  className="text-sm text-primary font-medium hover:underline disabled:opacity-50"
                >
                  {resent
                    ? "Code resent! Check your inbox."
                    : sending
                      ? "Sending..."
                      : "Didn\u2019t receive a code? Resend"}
                </button>
              )}

              <p className="text-xs text-neutral-400">
                The code expires in 10 minutes.{" "}
                <Link href="/auth/sign-in" className="text-primary hover:underline">
                  Back to sign in
                </Link>
              </p>
            </div>
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
