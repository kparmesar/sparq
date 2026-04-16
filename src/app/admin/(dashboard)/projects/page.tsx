import Link from "next/link";
import { getProjects } from "@/lib/db/queries";
import { deleteProject } from "@/lib/admin/actions-crud";
import DeleteButton from "@/components/admin/DeleteButton";

const STATUS_COLORS: Record<string, string> = {
  active: "text-green-700 bg-green-50",
  completed: "text-neutral-600 bg-neutral-100",
  recruiting: "text-yellow-700 bg-yellow-50",
  planned: "text-blue-700 bg-blue-50",
};

export default async function AdminProjectsPage() {
  const projectsList = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-neutral-900">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          + New Project
        </Link>
      </div>

      {projectsList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
          <p className="text-neutral-500">No projects yet.</p>
          <Link href="/admin/projects/new" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">
            Create your first project →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100">
          {projectsList.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-neutral-900 text-sm truncate">{project.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {project.type.toUpperCase()}
                  <span className={`ml-2 px-1.5 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[project.status]}`}>
                    {project.status}
                  </span>
                  {project.leadAuthors.length > 0 && (
                    <span className="ml-2">{project.leadAuthors.join(", ")}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteProject} id={project.id} confirmMessage="Delete this project?" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
