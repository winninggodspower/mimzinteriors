export const MAX_IMAGE_UPLOAD_BYTES = 10 * 1024 * 1024
export const MAX_IMAGE_UPLOAD_LABEL = "10 MB"

export function getImageUploadError(files) {
  const oversizedFile = files.find((file) => file.size > MAX_IMAGE_UPLOAD_BYTES)

  if (oversizedFile) {
    return `"${oversizedFile.name}" is too large. Each image must be ${MAX_IMAGE_UPLOAD_LABEL} or smaller.`
  }

  return null
}
