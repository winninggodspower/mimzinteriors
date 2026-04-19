"use client"

import { Loader2, Trash2 } from "lucide-react"
import { useFormStatus } from "react-dom"

function DeleteSubmitButton({ entityLabel, entityTitle }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(`Delete ${entityTitle}? This will remove the ${entityLabel.toLowerCase()} and all of its images.`)) {
          event.preventDefault()
        }
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      {pending ? "Deleting..." : `Delete ${entityLabel}`}
    </button>
  )
}

export default function CatalogDeleteButton({
  action,
  entityId,
  entityIdField = "projectId",
  entityLabel = "Project",
  entityTitle,
}) {
  return (
    <form action={action}>
      <input type="hidden" name={entityIdField} value={entityId} />
      <DeleteSubmitButton entityLabel={entityLabel} entityTitle={entityTitle} />
    </form>
  )
}
