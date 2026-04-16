import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjects } from "@/lib/db/queries";
import ProjectList from "@/components/projects/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse research, quality improvement, and audit projects across the Severn region paediatric network.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;
  const status = typeof params.status === "string" ? params.status : undefined;
  const search = typeof params.q === "string" ? params.q : undefined;

  const projects = await getProjects({ type, status, search });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary pt-36 pb-16 overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Projects
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Browse research, QI, and audit projects across the Severn region.
          </p>
        </div>
      </section>

      <Suspense>
        <ProjectList projects={projects} />
      </Suspense>
    </div>
  );
}
