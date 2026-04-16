import Link from "next/link";
import { logoutAction } from "@/lib/admin/actions-auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-extrabold text-neutral-900">
              SPARQ Admin
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              <Link href="/admin/blog" className="px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">
                Blog
              </Link>
              <Link href="/admin/projects" className="px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">
                Projects
              </Link>
              <Link href="/admin/showcase" className="px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">
                Showcase
              </Link>
              <Link href="/admin/events" className="px-3 py-1.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">
                Events
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700">
              View Site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
