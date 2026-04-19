"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { ChevronDown, ChevronUp, ImagePlus, Loader2 } from "lucide-react"

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
      className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-[#1A1205] px-5 py-3 font-medium text-[#F4D891] transition hover:bg-[#2A1B08] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? pendingLabel : idleLabel}
    </button>
  )
}

export default function CatalogItemUploadForm({
  action,
  entityLabel = "Project",
  heading,
  description,
  toggleCreateLabel,
  toggleCloseLabel,
  titlePlaceholder,
  descriptionPlaceholder,
  submitLabel,
  submittingLabel,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef(null)
  const formRef = useRef(null)
  const [state, formAction] = useActionState(action, initialState)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
    if (state?.status !== "success") {
      return
    }

    formRef.current?.reset()

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setPreviewUrl("")
    setFileName("")
  }, [previewUrl, state?.resetToken, state?.status])

  function handleFileChange(event) {
    const file = event.target.files?.[0]

    if (!file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }

      setPreviewUrl("")
      setFileName("")
      return
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    setFileName(file.name)
  }

  const resolvedHeading = heading || `${entityLabel} Upload`
  const resolvedDescription = description || `Create ${entityLabel.toLowerCase()} items and control whether they are visible on the catalogue page.`
  const resolvedToggleCreateLabel = toggleCreateLabel || `Create ${entityLabel}`
  const resolvedToggleCloseLabel = toggleCloseLabel || "Close Form"
  const resolvedTitlePlaceholder = titlePlaceholder || `${entityLabel} Ivory`
  const resolvedDescriptionPlaceholder = descriptionPlaceholder || `Write a short ${entityLabel.toLowerCase()} description`
  const resolvedSubmitLabel = submitLabel || `Upload ${entityLabel}`
  const resolvedSubmittingLabel = submittingLabel || "Uploading..."

  return (
    <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{resolvedHeading}</h1>
          <p className="mt-2 text-slate-600">{resolvedDescription}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1A1205] px-5 py-3 text-sm font-medium text-[#F4D891] transition hover:bg-[#2A1B08]"
        >
          {isOpen ? resolvedToggleCloseLabel : resolvedToggleCreateLabel}
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isOpen ? (
        <form ref={formRef} action={formAction} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor={`${entityLabel.toLowerCase()}-title`} className="text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              id={`${entityLabel.toLowerCase()}-title`}
              name="title"
              type="text"
              required
              placeholder={resolvedTitlePlaceholder}
              className="rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-[#B58A2A]"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor={`${entityLabel.toLowerCase()}-description`} className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id={`${entityLabel.toLowerCase()}-description`}
              name="description"
              required
              rows={4}
              placeholder={resolvedDescriptionPlaceholder}
              className="rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-[#B58A2A]"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor={`${entityLabel.toLowerCase()}-image`} className="text-sm font-medium text-slate-700">
              Profile Image
            </label>

            <input
              id={`${entityLabel.toLowerCase()}-image`}
              ref={fileInputRef}
              name="image"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative overflow-hidden rounded-2xl border border-dashed border-[#B58A2A]/60 bg-[#F7F4EE] p-3 text-left transition hover:bg-[#F3ECDD]"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`Selected ${entityLabel.toLowerCase()} preview`}
                  className="h-48 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl bg-white text-slate-600">
                  <ImagePlus className="h-7 w-7 text-[#B58A2A]" />
                  <p className="mt-2 text-sm font-medium">Click to upload {entityLabel.toLowerCase()} image</p>
                  <p className="mt-1 text-xs text-slate-500">PNG, JPG or WEBP</p>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                <p className="truncate text-xs text-slate-600">{fileName || "No file selected"}</p>
                <span className="rounded-lg bg-[#1A1205] px-3 py-1 text-xs font-medium text-[#F4D891]">
                  {previewUrl ? "Change" : "Choose"}
                </span>
              </div>
            </button>
          </div>

          {state?.message ? (
            <p className={`text-sm ${state.status === "error" ? "text-red-600" : "text-emerald-600"}`}>{state.message}</p>
          ) : null}

          <SubmitButton idleLabel={resolvedSubmitLabel} pendingLabel={resolvedSubmittingLabel} />
        </form>
      ) : null}
    </section>
  )
}
