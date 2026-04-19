import { Trash2 } from "lucide-react"

const slotLabelMap = {
  hero: "Hero",
  row: "Row",
  column: "Column",
}

export default function CatalogMediaGrid({
  media,
  entityId,
  entityIdField = "projectId",
  deleteAction,
  emptyText = "No detail images uploaded yet.",
}) {
  if (media.length === 0) {
    return <p className="text-sm text-slate-600">{emptyText}</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {media.map((item) => (
        <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <img src={item.imageUrl} alt={`${slotLabelMap[item.slot] || "Image"} ${item.order}`} className="h-44 w-full object-cover" />

          <div className="space-y-3 p-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {slotLabelMap[item.slot] || item.slot}
              </span>
              <span className="text-xs text-slate-500">Order {item.order}</span>
            </div>

            <form action={deleteAction}>
              <input type="hidden" name={entityIdField} value={entityId} />
              <input type="hidden" name="mediaId" value={item.id} />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete Image
              </button>
            </form>
          </div>
        </article>
      ))}
    </div>
  )
}
