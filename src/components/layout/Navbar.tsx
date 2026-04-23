"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { authClient } from "@/lib/auth/client";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoaded(true);
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/sparq-logo.png"
              alt="SPARQ Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-neutral-900">SPARQ</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-neutral-600 rounded-lg transition-colors hover:text-primary hover:bg-primary-light"
              >
                {link.label}
              </Link>
            ))}
            {loaded && user ? (
              <Link
                href="/account"
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg transition-all hover:bg-primary-dark hover:scale-105"
              >
                My Account
              </Link>
            ) : (
              <Link
                href="/auth/sign-up"
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg transition-all hover:bg-primary-dark hover:scale-105"
              >
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-neutral-600 hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-neutral-600 rounded-lg hover:text-primary hover:bg-primary-light"
                  >
                    {link.label}
                  </Link>
                ))}
                {loaded && user ? (
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-primary rounded-lg hover:bg-primary-light"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/auth/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-primary rounded-lg hover:bg-primary-light"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
