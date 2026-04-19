"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongoose"
import Apartment from "@/models/apartment"
import ApartmentMedia from "@/models/apartmentMedia"
import {
  destroyCloudinaryImage,
  getSafeOrderStart,
  getValidImageFiles,
  uploadImageToCloudinary,
  VALID_MEDIA_SLOTS,
} from "@/lib/cloudinary"

const APARTMENT_CLOUDINARY_FOLDER = "mimzinteriors/apartments"

export async function getAdminApartments() {
  await dbConnect()

  const [apartments, mediaCounts] = await Promise.all([
    Apartment.find({}).sort({ createdAt: -1 }).lean(),
    ApartmentMedia.aggregate([
      { $group: { _id: "$apartmentId", total: { $sum: 1 } } },
    ]),
  ])

  const mediaCountByApartmentId = new Map(
    mediaCounts.map((entry) => [String(entry._id), entry.total]),
  )

  return apartments.map((apartment) => ({
    id: String(apartment._id),
    title: apartment.title,
    description: apartment.description,
    profileImage: apartment.profileImage,
    mediaCount: mediaCountByApartmentId.get(String(apartment._id)) || 0,
    isPublished: Boolean(apartment.isPublished),
    publishedAt: apartment.publishedAt ? new Date(apartment.publishedAt).toISOString() : null,
    createdAt: apartment.createdAt ? new Date(apartment.createdAt).toISOString() : null,
  }))
}

export async function createApartmentAction(formData) {
  const title = String(formData.get("title") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const image = formData.get("image")

  if (!title || !description) {
    throw new Error("Title and description are required")
  }

  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Apartment image is required")
  }

  await dbConnect()
  const uploaded = await uploadImageToCloudinary(image, APARTMENT_CLOUDINARY_FOLDER)

  await Apartment.create({
    title,
    description,
    profileImage: uploaded.secure_url,
    imagePublicId: uploaded.public_id,
    isPublished: false,
    publishedAt: null,
  })

  revalidatePath("/admin/apartment")
  revalidatePath("/projects/apartments")
}

export async function createApartmentFormAction(previousState, formData) {
  try {
    await createApartmentAction(formData)

    return {
      status: "success",
      message: "Apartment uploaded successfully.",
      resetToken: Date.now(),
    }
  } catch (error) {
    return {
      status: "error",
      message: error?.message || "Failed to upload apartment.",
      resetToken: previousState?.resetToken || 0,
    }
  }
}

export async function uploadApartmentMediaAction(formData) {
  const apartmentId = String(formData.get("apartmentId") || "").trim()
  const slot = String(formData.get("slot") || "column").trim().toLowerCase()
  const files = getValidImageFiles(formData)
  const orderStart = getSafeOrderStart(formData.get("orderStart"))

  if (!apartmentId) {
    throw new Error("Apartment id is required")
  }

  if (!VALID_MEDIA_SLOTS.has(slot)) {
    throw new Error("Invalid media slot")
  }

  if (files.length === 0) {
    throw new Error("Select at least one image")
  }

  await dbConnect()

  const uploadedResults = await Promise.all(
    files.map((file) => uploadImageToCloudinary(file, APARTMENT_CLOUDINARY_FOLDER)),
  )

  const mediaDocuments = uploadedResults.map((uploaded, index) => ({
    apartmentId,
    slot,
    imageUrl: uploaded.secure_url,
    imagePublicId: uploaded.public_id,
    order: orderStart + index,
  }))

  await ApartmentMedia.insertMany(mediaDocuments)

  revalidatePath("/admin/apartment")
  revalidatePath(`/admin/apartment/${apartmentId}/images`)
  revalidatePath("/projects/apartments")
  revalidatePath(`/projects/apartments/${apartmentId}`)

  return uploadedResults.length
}

export async function uploadApartmentMediaFormAction(previousState, formData) {
  try {
    const uploadedCount = await uploadApartmentMediaAction(formData)

    return {
      status: "success",
      message: `${uploadedCount} image${uploadedCount > 1 ? "s" : ""} uploaded successfully.`,
      resetToken: Date.now(),
    }
  } catch (error) {
    return {
      status: "error",
      message: error?.message || "Failed to upload apartment media.",
      resetToken: previousState?.resetToken || 0,
    }
  }
}

export async function getAdminApartmentImagesPageData(apartmentId) {
  if (!apartmentId) {
    return null
  }

  await dbConnect()

  const [apartment, media] = await Promise.all([
    Apartment.findById(apartmentId).lean(),
    ApartmentMedia.find({ apartmentId }).sort({ slot: 1, order: 1, createdAt: 1 }).lean(),
  ])

  if (!apartment) {
    return null
  }

  return {
    apartment: {
      id: String(apartment._id),
      title: apartment.title,
      description: apartment.description,
      profileImage: apartment.profileImage,
      isPublished: Boolean(apartment.isPublished),
    },
    media: media.map((item) => ({
      id: String(item._id),
      imageUrl: item.imageUrl,
      imagePublicId: item.imagePublicId,
      slot: item.slot,
      order: item.order,
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    })),
  }
}

export async function deleteApartmentMediaAction(formData) {
  const mediaId = String(formData.get("mediaId") || "").trim()
  const apartmentId = String(formData.get("apartmentId") || "").trim()

  if (!mediaId || !apartmentId) {
    throw new Error("Apartment and media ids are required")
  }

  await dbConnect()
  const media = await ApartmentMedia.findById(mediaId)

  if (!media) {
    throw new Error("Media not found")
  }

  await destroyCloudinaryImage(media.imagePublicId, "apartment image")
  await ApartmentMedia.deleteOne({ _id: mediaId })

  revalidatePath("/admin/apartment")
  revalidatePath(`/admin/apartment/${apartmentId}/images`)
  revalidatePath(`/projects/apartments/${apartmentId}`)

  redirect(`/admin/apartment/${apartmentId}/images`)
}

export async function publishApartmentAction(formData) {
  const apartmentId = String(formData.get("apartmentId") || "").trim()

  if (!apartmentId) {
    throw new Error("Apartment id is required")
  }

  await dbConnect()
  await Apartment.findByIdAndUpdate(apartmentId, {
    isPublished: true,
    publishedAt: new Date(),
  })

  revalidatePath("/admin/apartment")
  revalidatePath("/projects/apartments")
}

export async function unpublishApartmentAction(formData) {
  const apartmentId = String(formData.get("apartmentId") || "").trim()

  if (!apartmentId) {
    throw new Error("Apartment id is required")
  }

  await dbConnect()
  await Apartment.findByIdAndUpdate(apartmentId, {
    isPublished: false,
    publishedAt: null,
  })

  revalidatePath("/admin/apartment")
  revalidatePath("/projects/apartments")
}

export async function deleteApartmentAction(formData) {
  const apartmentId = String(formData.get("apartmentId") || "").trim()

  if (!apartmentId) {
    throw new Error("Apartment id is required")
  }

  await dbConnect()

  const apartment = await Apartment.findById(apartmentId).lean()

  if (!apartment) {
    throw new Error("Apartment not found")
  }

  const mediaItems = await ApartmentMedia.find({ apartmentId }).lean()

  await destroyCloudinaryImage(apartment.imagePublicId, "apartment profile image")

  await Promise.all(
    mediaItems.map((media) => destroyCloudinaryImage(media.imagePublicId, "apartment media image")),
  )

  await Promise.all([
    ApartmentMedia.deleteMany({ apartmentId }),
    Apartment.deleteOne({ _id: apartmentId }),
  ])

  revalidatePath("/admin/apartment")
  revalidatePath(`/admin/apartment/${apartmentId}/images`)
  revalidatePath("/projects/apartments")
  revalidatePath(`/projects/apartments/${apartmentId}`)

  redirect("/admin/apartment")
}
