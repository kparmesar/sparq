import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { projects } from "@/lib/db/schema";
import { updateProject } from "@/lib/admin/actions-crud";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db.select().from(projects).where(eq(projects.id, Number(id))).limit(1);
  const project = rows[0];
  if (!project) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/projects" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">Edit Project</h1>
      </div>
      <ProjectForm action={updateProject} project={project} />
    </div>
  );
}
