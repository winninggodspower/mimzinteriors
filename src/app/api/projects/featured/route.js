import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Project from "@/models/project"

export const dynamic = "force-dynamic"

const DEFAULT_LIMIT = 3
const MAX_LIMIT = 12

const DUMMY_FEATURED_PROJECTS = [
  {
    id: "dummy-featured-1",
    title: "Project Pinnock",
    profileImage: '/project-catalogue/projecta.png',
    featuredAt: "2026-01-01T00:00:00.000Z",
    publishedAt: "2026-01-01T00:00:00.000Z",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "dummy-featured-2",
    title: "Luxury Living Room",
    profileImage: "/project-catalogue/projectb.png",
    featuredAt: "2025-12-01T00:00:00.000Z",
    publishedAt: "2025-12-01T00:00:00.000Z",
    createdAt: "2025-12-01T00:00:00.000Z",
  },
  {
    id: "dummy-featured-3",
    title: "Minimal Apartment Concept",
    profileImage: "/project-catalogue/projectc.png",
    featuredAt: "2025-11-01T00:00:00.000Z",
    publishedAt: "2025-11-01T00:00:00.000Z",
    createdAt: "2025-11-01T00:00:00.000Z",
  },
]

function serializeProject(project) {
  return {
    id: String(project._id),
    title: project.title,
    profileImage: project.profileImage,
    featuredAt: project.featuredAt ? new Date(project.featuredAt).toISOString() : null,
    publishedAt: project.publishedAt ? new Date(project.publishedAt).toISOString() : null,
    createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : null,
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const parsedLimit = Number.parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10)
    const safeLimit = Number.isFinite(parsedLimit)
      ? Math.min(MAX_LIMIT, Math.max(1, parsedLimit))
      : DEFAULT_LIMIT

    await dbConnect()

    const projects = await Project.find({
      isPublished: true,
      isFeatured: true,
    })
      .sort({ featuredAt: -1, publishedAt: -1, createdAt: -1 })
      .limit(safeLimit)
      .lean()

    const serializedProjects = projects.map(serializeProject)

    if (serializedProjects.length === 0) {
      return NextResponse.json({
        projects: DUMMY_FEATURED_PROJECTS.slice(0, safeLimit),
      })
    }

    return NextResponse.json({
      projects: serializedProjects,
    })
  } catch (error) {
    console.error("Failed to load featured projects:", error)

    return NextResponse.json(
      { message: "Failed to load featured projects." },
      { status: 500 },
    )
  }
}
