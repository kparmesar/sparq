import Link from "next/link";
import { getBlogPosts, getProjects, getShowcaseItems, getEvents } from "@/lib/db/queries";

export default async function AdminDashboard() {
  const [posts, projectsList, showcaseList, eventsList] = await Promise.all([
    getBlogPosts(),
    getProjects(),
    getShowcaseItems(),
    getEvents(),
  ]);

  const sections = [
    { label: "Blog Posts", count: posts.length, href: "/admin/blog", color: "bg-blue-500" },
    { label: "Projects", count: projectsList.length, href: "/admin/projects", color: "bg-green-500" },
    { label: "Showcase", count: showcaseList.length, href: "/admin/showcase", color: "bg-purple-500" },
    { label: "Events", count: eventsList.length, href: "/admin/events", color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-neutral-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl bg-white border border-neutral-200 p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${s.color}`} />
              <h2 className="font-bold text-neutral-900">{s.label}</h2>
            </div>
            <p className="text-3xl font-extrabold text-neutral-900">{s.count}</p>
            <p className="text-sm text-neutral-500 mt-1">Manage →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
