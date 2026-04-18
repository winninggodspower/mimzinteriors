"use server"

import { revalidatePath } from "next/cache"
import dbConnect from "@/lib/mongoose"
import cloudinary from "@/lib/cloudinary"
import Project from "@/models/project"
import ProjectMedia from "@/models/projectMedia"

const VALID_MEDIA_SLOTS = new Set(["hero", "row", "column"])

function ensureCloudinaryEnv() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary environment variables")
  }
}

async function uploadToCloudinary(file) {
  ensureCloudinaryEnv()

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "mimzinteriors/projects",
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

export async function getAdminProjects() {
  await dbConnect()

  const [projects, mediaCounts] = await Promise.all([
    Project.find({}).sort({ createdAt: -1 }).lean(),
    ProjectMedia.aggregate([
      { $group: { _id: "$projectId", total: { $sum: 1 } } },
    ]),
  ])

  const mediaCountByProjectId = new Map(
    mediaCounts.map((entry) => [String(entry._id), entry.total]),
  )

  return projects.map((project) => ({
    id: String(project._id),
    title: project.title,
    description: project.description,
    profileImage: project.profileImage,
    mediaCount: mediaCountByProjectId.get(String(project._id)) || 0,
    isPublished: Boolean(project.isPublished),
    publishedAt: project.publishedAt ? new Date(project.publishedAt).toISOString() : null,
    createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : null,
  }))
}

export async function createProjectAction(formData) {
  const title = String(formData.get("title") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const image = formData.get("image")

  if (!title || !description) {
    throw new Error("Title and description are required")
  }

  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Project image is required")
  }

  await dbConnect()
  const uploaded = await uploadToCloudinary(image)

  await Project.create({
    title,
    description,
    profileImage: uploaded.secure_url,
    imagePublicId: uploaded.public_id,
    isPublished: false,
    publishedAt: null,
  })

  revalidatePath("/admin/project")
  revalidatePath("/projects/project_catalogue")
}

export async function createProjectFormAction(previousState, formData) {
  try {
    await createProjectAction(formData)

    return {
      status: "success",
      message: "Project uploaded successfully.",
      resetToken: Date.now(),
    }
  } catch (error) {
    return {
      status: "error",
      message: error?.message || "Failed to upload project.",
      resetToken: previousState?.resetToken || 0,
    }
  }
}

export async function uploadProjectMediaAction(formData) {
  const projectId = String(formData.get("projectId") || "").trim()
  const slot = String(formData.get("slot") || "column").trim().toLowerCase()
  const orderStartRaw = Number(formData.get("orderStart") || 1)
  const files = formData
    .getAll("images")
    .filter((file) => file instanceof File && file.size > 0)

  if (!projectId) {
    throw new Error("Project id is required")
  }

  if (!VALID_MEDIA_SLOTS.has(slot)) {
    throw new Error("Invalid media slot")
  }

  if (files.length === 0) {
    throw new Error("Select at least one image")
  }

  const orderStart = Number.isFinite(orderStartRaw)
    ? Math.max(1, Math.trunc(orderStartRaw))
    : 1

  await dbConnect()

  const uploadedResults = await Promise.all(
    files.map((file) =>
      uploadToCloudinary(file),
    ),
  )

  const mediaDocuments = uploadedResults.map((uploaded, index) => ({
    projectId,
    slot,
    imageUrl: uploaded.secure_url,
    imagePublicId: uploaded.public_id,
    order: orderStart + index,
  }))

  await ProjectMedia.insertMany(mediaDocuments)

  revalidatePath("/admin/project")
  revalidatePath(`/admin/project/${projectId}/images`)
  revalidatePath(`/projects/project_catalogue/${projectId}`)

  return uploadedResults.length
}

export async function uploadProjectMediaFormAction(previousState, formData) {
  try {
    const uploadedCount = await uploadProjectMediaAction(formData)

    return {
      status: "success",
      message: `${uploadedCount} image${uploadedCount > 1 ? "s" : ""} uploaded successfully.`,
      resetToken: Date.now(),
    }
  } catch (error) {
    return {
      status: "error",
      message: error?.message || "Failed to upload project media.",
      resetToken: previousState?.resetToken || 0,
    }
  }
}

export async function getAdminProjectImagesPageData(projectId) {
  if (!projectId) {
    return null
  }

  await dbConnect()

  const [project, media] = await Promise.all([
    Project.findById(projectId).lean(),
    ProjectMedia.find({ projectId }).sort({ slot: 1, order: 1, createdAt: 1 }).lean(),
  ])

  if (!project) {
    return null
  }

  return {
    project: {
      id: String(project._id),
      title: project.title,
      description: project.description,
      profileImage: project.profileImage,
      isPublished: Boolean(project.isPublished),
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

export async function deleteProjectMediaAction(formData) {
  const mediaId = String(formData.get("mediaId") || "").trim()
  const projectId = String(formData.get("projectId") || "").trim()

  if (!mediaId || !projectId) {
    throw new Error("Project and media ids are required")
  }

  await dbConnect()
  const media = await ProjectMedia.findById(mediaId)

  if (!media) {
    throw new Error("Media not found")
  }

  ensureCloudinaryEnv()

  try {
    await cloudinary.uploader.destroy(media.imagePublicId, { resource_type: "image" })
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error)
  }

  await ProjectMedia.deleteOne({ _id: mediaId })

  revalidatePath("/admin/project")
  revalidatePath(`/admin/project/${projectId}/images`)
  revalidatePath(`/projects/project_catalogue/${projectId}`)
}

export async function publishProjectAction(formData) {
  const projectId = String(formData.get("projectId") || "").trim()

  if (!projectId) {
    throw new Error("Project id is required")
  }

  await dbConnect()
  await Project.findByIdAndUpdate(projectId, {
    isPublished: true,
    publishedAt: new Date(),
  })

  revalidatePath("/admin/project")
  revalidatePath("/projects/project_catalogue")
}

export async function unpublishProjectAction(formData) {
  const projectId = String(formData.get("projectId") || "").trim()

  if (!projectId) {
    throw new Error("Project id is required")
  }

  await dbConnect()
  await Project.findByIdAndUpdate(projectId, {
    isPublished: false,
    publishedAt: null,
  })

  revalidatePath("/admin/project")
  revalidatePath("/projects/project_catalogue")
}
