import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import Project from "@/models/project"

export const dynamic = "force-dynamic"

const DEFAULT_LIMIT = 3
const MAX_LIMIT = 12

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

    return NextResponse.json({
      projects: projects.map((project) => ({
        id: String(project._id),
        title: project.title,
        profileImage: project.profileImage,
        featuredAt: project.featuredAt ? new Date(project.featuredAt).toISOString() : null,
        publishedAt: project.publishedAt ? new Date(project.publishedAt).toISOString() : null,
        createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : null,
      })),
    })
  } catch (error) {
    console.error("Failed to load featured projects:", error)

    return NextResponse.json(
      { message: "Failed to load featured projects." },
      { status: 500 },
    )
  }
}
