import { getImageUploadError } from "@/lib/upload-limits"

export async function uploadImagesDirectly(files, folder) {
  const errorMessage = getImageUploadError(files)

  if (errorMessage) {
    throw new Error(errorMessage)
  }

  const signatureResponse = await fetch("/api/admin/cloudinary-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  })

  const signatureData = await signatureResponse.json()

  if (!signatureResponse.ok) {
    throw new Error(signatureData.message || "Could not prepare image upload.")
  }

  return Promise.all(
    files.map(async (file) => {
      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("api_key", signatureData.apiKey)
      uploadData.append("folder", signatureData.folder)
      uploadData.append("signature", signatureData.signature)
      uploadData.append("timestamp", String(signatureData.timestamp))

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        { method: "POST", body: uploadData },
      )
      const result = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(result.error?.message || `Failed to upload "${file.name}".`)
      }

      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      }
    }),
  )
}
