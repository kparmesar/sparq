import type { Project } from "@/lib/db/schema";
import { SITE_OPTIONS } from "@/lib/constants";

interface Props {
  action: (formData: FormData) => Promise<void>;
  project?: Project;
}

export default function ProjectForm({ action, project }: Props) {
  const selectedSites = project?.site ?? [];

  return (
    <form action={action} className="space-y-5 max-w-2xl">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={project?.title}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
          <select
            id="type"
            name="type"
            required
            defaultValue={project?.type || ""}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="">Select...</option>
            <option value="research">Research</option>
            <option value="qi">QI</option>
            <option value="audit">Audit</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
          <select
            id="status"
            name="status"
            required
            defaultValue={project?.status || "planned"}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="planned">Planned</option>
            <option value="recruiting">Recruiting</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Site(s) <span className="text-neutral-400 font-normal">(select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl border border-neutral-200 bg-white max-h-52 overflow-y-auto">
          {SITE_OPTIONS.map((site) => (
            <label key={site} className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer hover:bg-neutral-50 rounded-lg px-2 py-1.5">
              <input
                type="checkbox"
                name="site"
                value={site}
                defaultChecked={selectedSites.includes(site)}
                className="rounded border-neutral-300 text-primary focus:ring-primary/30"
              />
              {site}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="leadAuthors" className="block text-sm font-medium text-neutral-700 mb-1">
          Lead Authors <span className="text-neutral-400 font-normal">(comma-separated)</span>
        </label>
        <input
          type="text"
          id="leadAuthors"
          name="leadAuthors"
          required
          defaultValue={project?.leadAuthors.join(", ")}
          placeholder="Dr Jane Smith, Dr John Doe"
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-1">
          Tags <span className="text-neutral-400 font-normal">(comma-separated, optional)</span>
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          defaultValue={project?.tags.join(", ")}
          placeholder="neonatal, sepsis, prescribing"
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-neutral-700 mb-1">
          Contact Email <span className="text-neutral-400 font-normal">(optional)</span>
        </label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          defaultValue={project?.contactEmail || ""}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
      >
        {project ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
