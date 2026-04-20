
import dbConnect from "@/lib/mongoose"
import Project from "@/models/project"
import Apartment from "@/models/apartment"
import AccessoryMedia from "@/models/accessoryMedia"

async function getDashboardStats() {
  await dbConnect()

  const [
    projectTotal,
    projectPublished,
    apartmentTotal,
    apartmentPublished,
    accessoryTotal,
  ] = await Promise.all([
    Project.countDocuments({}),
    Project.countDocuments({ isPublished: true }),
    Apartment.countDocuments({}),
    Apartment.countDocuments({ isPublished: true }),
    AccessoryMedia.countDocuments({}),
  ])

  return {
    projects: {
      total: projectTotal,
      published: projectPublished,
      unpublished: Math.max(projectTotal - projectPublished, 0),
      tracksPublishing: true,
    },
    apartments: {
      total: apartmentTotal,
      published: apartmentPublished,
      unpublished: Math.max(apartmentTotal - apartmentPublished, 0),
      tracksPublishing: true,
    },
    accessories: {
      total: accessoryTotal,
      published: null,
      unpublished: null,
      tracksPublishing: false,
    },
  }
}

export default async function AdminPage() {
  const stats = await getDashboardStats()

  const cards = [
    {
      label: "Projects",
      values: stats.projects,
    },
    {
      label: "Apartments",
      values: stats.apartments,
    },
    {
      label: "Accessories",
      values: stats.accessories,
    },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Welcome to your Mimz Interiors admin dashboard.</p>
      </section>

      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Content Analytics</h2>
        <p className="mt-1 text-sm text-slate-600">
          Snapshot of projects, apartments, and accessories currently in your admin.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.label} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{card.values.total}</p>

              {card.values.tracksPublishing ? (
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">
                    Published: {card.values.published}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">
                    Unpublished: {card.values.unpublished}
                  </span>
                </div>
              ) : (
                <p className="mt-3 text-xs text-slate-500">
                  Publish status is not tracked for accessories.
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}