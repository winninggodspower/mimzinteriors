"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongoose"
import AccessoryMedia from "@/models/accessoryMedia"
import {
  destroyCloudinaryImage,
  getValidImageFiles,
  uploadImageToCloudinary,
} from "@/lib/cloudinary"

const ACCESSORIES_CLOUDINARY_FOLDER = "mimzinteriors/accessories"

export async function getAdminAccessoryImages() {
  await dbConnect()

  const media = await AccessoryMedia.find({}).sort({ createdAt: -1 }).lean()

  return media.map((item) => ({
    id: String(item._id),
    imageUrl: item.imageUrl,
    imagePublicId: item.imagePublicId,
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
  }))
}

export async function uploadAccessoryMediaAction(formData) {
  const files = getValidImageFiles(formData)

  if (files.length === 0) {
    throw new Error("Select at least one image")
  }

  await dbConnect()

  const uploadedResults = await Promise.all(
    files.map((file) => uploadImageToCloudinary(file, ACCESSORIES_CLOUDINARY_FOLDER)),
  )

  const mediaDocuments = uploadedResults.map((uploaded) => ({
    imageUrl: uploaded.secure_url,
    imagePublicId: uploaded.public_id,
  }))

  await AccessoryMedia.insertMany(mediaDocuments)

  revalidatePath("/admin/accesories")
  revalidatePath("/projects/accessories")

  return uploadedResults.length
}

export async function uploadAccessoryMediaFormAction(previousState, formData) {
  try {
    const uploadedCount = await uploadAccessoryMediaAction(formData)

    return {
      status: "success",
      message: `${uploadedCount} image${uploadedCount > 1 ? "s" : ""} uploaded successfully.`,
      resetToken: Date.now(),
    }
  } catch (error) {
    return {
      status: "error",
      message: error?.message || "Failed to upload accessory images.",
      resetToken: previousState?.resetToken || 0,
    }
  }
}

export async function deleteAccessoryMediaAction(formData) {
  const mediaId = String(formData.get("mediaId") || "").trim()

  if (!mediaId) {
    throw new Error("Media id is required")
  }

  await dbConnect()
  const media = await AccessoryMedia.findById(mediaId)

  if (!media) {
    throw new Error("Media not found")
  }

  await destroyCloudinaryImage(media.imagePublicId, "accessory image")
  await AccessoryMedia.deleteOne({ _id: mediaId })

  revalidatePath("/admin/accesories")
  revalidatePath("/projects/accessories")

  redirect("/admin/accesories")
}