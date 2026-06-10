"use client"

import { useFormStatus } from "react-dom"

const TAG_OPTIONS = [
  { value: "home", label: "🏠 Home" },
  { value: "office", label: "🏢 Office" },
  { value: "hotel", label: "🏨 Hotel" },
]

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-[#1A1205] px-3 py-1 text-xs font-medium text-[#F4D891] transition hover:bg-[#2A1B08] disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  )
}

export default function TagEditForm({ projectId, currentTag, action }) {
  return (
    <form action={action} className="flex items-center gap-1.5">
      <input type="hidden" name="projectId" value={projectId} />
      <select
        name="tag"
        defaultValue={currentTag}
        className="rounded-lg border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700 outline-none focus:border-[#B58A2A]"
      >
        {TAG_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <SubmitButton />
    </form>
  )
}