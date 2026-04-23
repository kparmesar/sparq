import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/lib/admin/actions-auth";

const ADMIN_NAV_LINKS = [
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/showcase", label: "Showcase" },
  { href: "/admin/events", label: "Events" },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-2">
                <Image
                  src="/sparq-logo.png"
                  alt="SPARQ Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-neutral-900">SPARQ</span>
                <span className="text-xs font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden sm:flex items-center gap-1">
                {ADMIN_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-neutral-600 rounded-lg transition-colors hover:text-primary hover:bg-primary-light"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-neutral-600 rounded-lg transition-colors hover:text-primary hover:bg-primary-light"
              >
                View Site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-accent-coral rounded-lg transition-all hover:bg-accent-coral/90 hover:scale-105"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {children}
      </main>
    </div>
  );
}
