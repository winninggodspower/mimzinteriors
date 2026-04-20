"use client"

import { useActionState, useEffect, useMemo, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { ImagePlus, Loader2 } from "lucide-react"

const initialState = {
  status: "idle",
  message: "",
  resetToken: 0,
}

function SubmitButton({ idleLabel, pendingLabel }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg bg-[#1A1205] px-4 py-2 text-sm font-medium text-[#F4D891] transition hover:bg-[#2A1B08] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? pendingLabel : idleLabel}
    </button>
  )
}

export default function CatalogMediaUploadForm({
  action,
  entityId,
  entityIdField = "projectId",
  entityLabel = "Project",
  showLayoutFields = true,
  allowedSlots = ["row", "column"],
}) {
  const [state, formAction] = useActionState(action, initialState)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const formRef = useRef(null)
  const fileInputRef = useRef(null)
  const previewUrlsRef = useRef([])

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  useEffect(() => {
    if (state?.status !== "success") {
      return
    }

    formRef.current?.reset()
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    previewUrlsRef.current = []
    setPreviewUrls([])
    setSelectedFiles([])
  }, [state?.resetToken, state?.status])

  const selectedCountText = useMemo(() => {
    if (selectedFiles.length === 0) {
      return "No images selected"
    }

    if (selectedFiles.length === 1) {
      return selectedFiles[0].name
    }

    return `${selectedFiles.length} images selected`
  }, [selectedFiles])

  function handleFileChange(event) {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))

    const files = Array.from(event.target.files || [])
    setSelectedFiles(files)

    const nextPreviewUrls = files.slice(0, 4).map((file) => URL.createObjectURL(file))
    previewUrlsRef.current = nextPreviewUrls
    setPreviewUrls(nextPreviewUrls)
  }

  return (
    <form ref={formRef} action={formAction} className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <input type="hidden" name={entityIdField} value={entityId} />

      {showLayoutFields ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="grid gap-1">
            <label htmlFor={`slot-${entityId}`} className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Slot
            </label>
            <select
              id={`slot-${entityId}`}
              name="slot"
              defaultValue={allowedSlots.includes("column") ? "column" : allowedSlots[0]}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            >
              {allowedSlots.includes("row") ? <option value="row">Row</option> : null}
              {allowedSlots.includes("column") ? <option value="column">Column</option> : null}
            </select>
          </div>

          <div className="grid gap-1">
            <label htmlFor={`orderStart-${entityId}`} className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Start Order
            </label>
            <input
              id={`orderStart-${entityId}`}
              name="orderStart"
              type="number"
              min={1}
              defaultValue={1}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
          </div>
        </div>
      ) : null}

      <div className="grid gap-2">
        <label htmlFor={`images-${entityId}`} className="text-xs font-semibold uppercase tracking-wide text-slate-600">
          Images
        </label>

        <input
          id={`images-${entityId}`}
          ref={fileInputRef}
          name="images"
          type="file"
          accept="image/*"
          multiple
          required
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-dashed border-[#B58A2A]/70 bg-white p-3 text-left hover:bg-[#FDF9EF]"
        >
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <ImagePlus className="h-4 w-4 text-[#B58A2A]" />
            <span>{selectedCountText}</span>
          </div>

          {previewUrls.length > 0 ? (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {previewUrls.map((url, index) => (
                <img key={`${url}-${index}`} src={url} alt="Selected upload preview" className="h-20 w-full rounded-md object-cover" />
              ))}
            </div>
          ) : null}
        </button>
      </div>

      {state?.message ? (
        <p className={`text-sm ${state.status === "error" ? "text-red-600" : "text-emerald-600"}`}>{state.message}</p>
      ) : null}

      <div>
        <SubmitButton idleLabel={`Upload ${entityLabel} Images`} pendingLabel="Uploading..." />
      </div>
    </form>
  )
}
