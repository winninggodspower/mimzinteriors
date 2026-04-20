"use server";

import { PROJECTS_CATALOGUE_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQueryKeys";
import dbConnect from "../../../app/lib/mongoose";
import Project from "../../../app/models/project";

export async function getProjectsCataloguePage({
  page = 1,
  limit = PROJECTS_CATALOGUE_PAGE_SIZE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.trunc(limit)) : PROJECTS_CATALOGUE_PAGE_SIZE;
  const offset = (safePage - 1) * safeLimit;

  try {
    await dbConnect();

    const [documents, total] = await Promise.all([
      Project.find({ isPublished: true })
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(offset)
        .limit(safeLimit)
        .lean(),
      Project.countDocuments({ isPublished: true }),
    ]);

    console.log(documents.map((doc) => doc.title));
    if (total > 0) {
      return {
        projects: documents.map((project) => ({
          id: String(project._id),
          title: project.title,
          profileImage: project.profileImage,
          description: project.description,
        })),
        total,
        limit: safeLimit,
        offset,
      };
    }
  } catch (error) {
    console.error("Failed to load published projects from MongoDB:", error);
  }

  return {
    projects: [],
    total: 0,
    limit: safeLimit,
    offset,
  };
}
