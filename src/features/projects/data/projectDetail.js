"use server";

import {
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import { buildDetailPageData, formatEntityPeriod } from "@features/projects/lib/detailPageData";
import dbConnect from "../../../app/lib/mongoose";
import Project from "../../../app/models/project";
import ProjectMedia from "../../../app/models/projectMedia";

const FALLBACK_TITLE = "PROJECT";
const FALLBACK_SUBTITLE = "Relaxation and peace of mind can come from a well designed space. Mimz interior";

export async function getProjectDetailPage({
  projectId,
  page = 1,
  columnsPerPage = PROJECT_DETAIL_COLUMNS_PER_PAGE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeColumnsPerPage = Number.isFinite(columnsPerPage)
    ? Math.max(1, Math.trunc(columnsPerPage))
    : PROJECT_DETAIL_COLUMNS_PER_PAGE;

  try {
    await dbConnect();

    const [project, mediaDocuments] = await Promise.all([
      Project.findById(projectId).lean(),
      ProjectMedia.find({ projectId }).sort({ order: 1, createdAt: 1 }).lean(),
    ]);

    if (project) {
      const media = mediaDocuments.map((item) => ({
        id: String(item._id),
        src: item.imageUrl,
        slot: item.slot,
        order: item.order,
      }));

      return buildDetailPageData({
        id: String(project._id),
        title: project.title || FALLBACK_TITLE,
        period: formatEntityPeriod(project.publishedAt || project.createdAt) || "",
        subtitle: project.description || FALLBACK_SUBTITLE,
        profileImage: project.profileImage,
        media,
        page: safePage,
        columnsPerPage: safeColumnsPerPage,
      });
    }

    return null;
  } catch (error) {
    console.error("Failed to load project detail from MongoDB:", error);
    return null;
  }
}
