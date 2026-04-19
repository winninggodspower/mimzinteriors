import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const VALID_MEDIA_SLOTS = new Set(["hero", "row", "column"])

export function ensureCloudinaryEnv() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary environment variables")
  }
}

export async function uploadImageToCloudinary(file, folder) {
  ensureCloudinaryEnv()

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }

        resolve(result)
      },
    )

    uploadStream.end(buffer)
  })
}

export function getValidImageFiles(formData, fieldName = "images") {
  return formData
    .getAll(fieldName)
    .filter((file) => file instanceof File && file.size > 0)
}

export function getSafeOrderStart(value) {
  const parsedValue = Number(value || 1)

  return Number.isFinite(parsedValue) ? Math.max(1, Math.trunc(parsedValue)) : 1
}

export async function destroyCloudinaryImage(publicId, logLabel) {
  if (!publicId) {
    return
  }

  ensureCloudinaryEnv()

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
  } catch (error) {
    console.error(`Failed to delete ${logLabel} from Cloudinary:`, error)
  }
}

export default cloudinary
