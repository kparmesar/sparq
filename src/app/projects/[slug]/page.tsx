import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  research: "bg-primary-light text-primary",
  qi: "bg-green-50 text-secondary",
  audit: "bg-red-50 text-accent-coral",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  completed: "bg-neutral-100 text-neutral-600",
  recruiting: "bg-yellow-100 text-yellow-800",
  planned: "bg-blue-100 text-blue-800",
};

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Projects
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${TYPE_COLORS[project.type]}`}>
              {project.type === "qi" ? "QI" : project.type.charAt(0).toUpperCase() + project.type.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[project.status]}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {project.title}
          </h1>
          <p className="mt-3 text-blue-200">
            {(project.leadAuthors ?? []).join(", ")} · Started {formatDate(project.startDate ?? "")}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Description</h2>
            <p className="text-neutral-600 leading-relaxed text-lg whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.site.length > 0 && (
              <div className="rounded-xl border border-neutral-200 p-5">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  Site(s)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.site.map((s) => (
                    <span key={s} className="px-3 py-1 text-sm bg-primary-light text-primary rounded-lg font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.specialty.map((s) => (
                  <span key={s} className="px-3 py-1 text-sm bg-primary-light text-primary rounded-lg font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-5">
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-primary-light/50 border border-primary/20 p-6">
            <h3 className="font-bold text-neutral-900 mb-2">Interested in collaborating?</h3>
            <p className="text-neutral-600 text-sm mb-4">
              Get in touch with the project lead to discuss involvement opportunities.
            </p>
            <a
              href={`mailto:${project.contactEmail}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Contact Project Lead
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
