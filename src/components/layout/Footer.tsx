import Link from "next/link";
import { NAV_LINKS, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2">{SITE_NAME}</h3>
            <p className="text-neutral-400 text-sm max-w-md">
              {SITE_DESCRIPTION}. Promoting collaboration across disciplines and
              specialties to improve the care of children and young people in the
              Severn region and beyond.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Partners
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>RCPCH</li>
              <li>Severn Deanery</li>
              <li>Health Education England</li>
              <li>PENTRAIN</li>
              <li>NHS Trusts — Severn Region</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} SPARQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
