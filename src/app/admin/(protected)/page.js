import dbConnect from "@/lib/mongoose"
import Project from "@/models/project"

async function getDashboardStats() {
  await dbConnect()

  const [projectTotal, projectPublished, residentialCount, commercialCount] =
    await Promise.all([
      Project.countDocuments({}),
      Project.countDocuments({ isPublished: true }),
      Project.countDocuments({ tag: "residential" }),
      Project.countDocuments({ tag: "commercial" }),
      Project.countDocuments({ tag: "hotel" }),
    ])

  return {
    projects: {
      total: projectTotal,
      published: projectPublished,
      unpublished: Math.max(projectTotal - projectPublished, 0),
      tracksPublishing: true,
    },
    byTag: {
      residential: residentialCount,
      commercial: commercialCount,
      hotel: hotelCount,
    },
  }
}

const tagLabels = {
  residential: "Residential",
  commercial: "Commercial",
}

export default async function AdminPage() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Welcome to your Mimz Interiors admin dashboard.</p>
      </section>

      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Content Analytics</h2>
        <p className="mt-1 text-sm text-slate-600">
          Overview of all projects currently in your admin.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {/* Total projects card */}
          <article className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Total Projects
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {stats.projects.total}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">
                Published: {stats.projects.published}
              </span>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">
                Unpublished: {stats.projects.unpublished}
              </span>
            </div>
          </article>

          {/* Per-tag cards */}
          {Object.entries(stats.byTag).map(([tag, count]) => (
            <article
              key={tag}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                {tagLabels[tag]}
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {count}
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Projects tagged with &ldquo;{tagLabels[tag]}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}