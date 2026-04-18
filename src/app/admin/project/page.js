import {
  createProjectFormAction,
  getAdminProjects,
  publishProjectAction,
  unpublishProjectAction,
} from "./actions"
import ProjectUploadForm from "@features/admin/projects/components/project-upload-form"
import Link from "next/link"

export default async function AdminProjectPage() {
  const projects = await getAdminProjects()

  return (
    <div className="space-y-6">
      <ProjectUploadForm action={createProjectFormAction} />

      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Existing Projects</h2>

        {projects.length === 0 ? (
          <p className="mt-4 text-slate-600">No projects yet. Upload your first project.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {projects.map((project) => (
              <article key={project.id} className="grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                <img
                  src={project.profileImage}
                  alt={project.title}
                  className="h-24 w-30 rounded-lg object-cover"
                />

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{project.description}</p>
                  <p className="mt-2 text-xs text-slate-500">Detail images: {project.mediaCount}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {project.isPublished ? "Published" : "Unpublished"}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <Link
                    href={`/admin/project/${project.id}/images`}
                    className="rounded-lg border border-[#B58A2A]/40 bg-[#FFF7E5] px-4 py-2 text-sm font-medium text-[#7A5B1B] hover:bg-[#F9ECCF]"
                  >
                    View Images
                  </Link>

                  <form action={project.isPublished ? unpublishProjectAction : publishProjectAction}>
                    <input type="hidden" name="projectId" value={project.id} />
                    <button
                      type="submit"
                      className={`rounded-lg px-4 py-2 text-sm font-medium ${
                        project.isPublished
                          ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {project.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
