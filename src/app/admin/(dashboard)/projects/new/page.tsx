import Link from "next/link";
import { createProject } from "@/lib/admin/actions-crud";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/projects" className="text-neutral-400 hover:text-neutral-600">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-neutral-900">New Project</h1>
      </div>
      <ProjectForm action={createProject} />
    </div>
  );
}
