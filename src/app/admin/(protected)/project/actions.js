"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/mongoose"
import Project from "@/models/project"
import ProjectMedia from "@/models/projectMedia"
import {
  destroyCloudinaryImage,
  getSafeOrderStart,
  getValidImageFiles,
  uploadImageToCloudinary,
  VALID_MEDIA_SLOTS,
} from "@/lib/cloudinary"

const PROJECT_CLOUDINARY_FOLDER = "mimzinteriors/projects"

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
  const uploaded = await uploadImageToCloudinary(image, PROJECT_CLOUDINARY_FOLDER)

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
  const files = getValidImageFiles(formData)

  if (!projectId) {
    throw new Error("Project id is required")
  }

  if (!VALID_MEDIA_SLOTS.has(slot)) {
    throw new Error("Invalid media slot")
  }

  if (files.length === 0) {
    throw new Error("Select at least one image")
  }

  const orderStart = getSafeOrderStart(formData.get("orderStart"))

  await dbConnect()

  const uploadedResults = await Promise.all(
    files.map((file) => uploadImageToCloudinary(file, PROJECT_CLOUDINARY_FOLDER)),
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

  await destroyCloudinaryImage(media.imagePublicId, "project image")
  await ProjectMedia.deleteOne({ _id: mediaId })

  revalidatePath("/admin/project")
  revalidatePath(`/admin/project/${projectId}/images`)
  revalidatePath(`/projects/project_catalogue/${projectId}`)

  redirect(`/admin/project/${projectId}/images`)
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

export async function deleteProjectAction(formData) {
  const projectId = String(formData.get("projectId") || "").trim()

  if (!projectId) {
    throw new Error("Project id is required")
  }

  await dbConnect()

  const project = await Project.findById(projectId).lean()

  if (!project) {
    throw new Error("Project not found")
  }

  const mediaItems = await ProjectMedia.find({ projectId }).lean()
  await destroyCloudinaryImage(project.imagePublicId, "project profile image")

  await Promise.all(
    mediaItems.map((media) => destroyCloudinaryImage(media.imagePublicId, "project media image")),
  )

  await Promise.all([
    ProjectMedia.deleteMany({ projectId }),
    Project.deleteOne({ _id: projectId }),
  ])

  revalidatePath("/admin/project")
  revalidatePath(`/admin/project/${projectId}/images`)
  revalidatePath("/projects/project_catalogue")
  revalidatePath(`/projects/project_catalogue/${projectId}`)

  redirect("/admin/project")
}
