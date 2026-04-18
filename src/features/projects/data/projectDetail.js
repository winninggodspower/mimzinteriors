"use server";

import ivoryHero from "@assets/images/projects/projectsCatalogue/projects/ivoryhero.png";
import ivoryHeroB from "@assets/images/projects/projectsCatalogue/projects/ivoryherob.png";
import ivoryHeroC from "@assets/images/projects/projectsCatalogue/projects/ivoryheroc.png";
import ivoryColumnA from "@assets/images/projects/projectsCatalogue/projects/ivorycolumna.png";
import ivoryColumnB from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnb.png";
import ivoryColumnC from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnc.png";
import ivoryColumnD from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnd.png";
import ivoryColumnE from "@assets/images/projects/projectsCatalogue/projects/ivorycolumne.png";
import ivoryColumnF from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnf.png";
import {
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import dbConnect from "../../../app/lib/mongoose";
import Project from "../../../app/models/project";
import ProjectMedia from "../../../app/models/projectMedia";

const projectMetaMap = {
  "project-1": { title: "MYKONOS", period: "JAN 2025" },
  "project-2": { title: "SANTORINI", period: "FEB 2025" },
  "project-3": { title: "IBIZA", period: "MAR 2025" },
};

const defaultMeta = { title: "MYKONOS", period: "JAN 2025" };

const placeholderMedia = [
  { id: "project-hero-1", src: ivoryHero.src, slot: "hero", order: 1 },
  { id: "project-column-1", src: ivoryColumnA.src, slot: "column", order: 2 },
  { id: "project-column-2", src: ivoryColumnB.src, slot: "column", order: 3 },
  { id: "project-row-1", src: ivoryHeroB.src, slot: "row", order: 4 },
  { id: "project-column-3", src: ivoryColumnC.src, slot: "column", order: 5 },
  { id: "project-column-4", src: ivoryColumnD.src, slot: "column", order: 6 },
  { id: "project-row-2", src: ivoryHeroC.src, slot: "row", order: 7 },
  { id: "project-column-5", src: ivoryColumnE.src, slot: "column", order: 8 },
  { id: "project-column-6", src: ivoryColumnF.src, slot: "column", order: 9 },
];

const paginate = (items, page, pageSize) => {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

const sortByOrder = (items) => [...items].sort((leftItem, rightItem) => leftItem.order - rightItem.order);

const formatProjectPeriod = (inputDate) => {
  if (!inputDate) {
    return ""
  }

  const date = new Date(inputDate)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return date
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase()
}

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

      const orderedMedia = sortByOrder(media);
      const hero = orderedMedia.find((mediaItem) => mediaItem.slot === "hero")?.src || project.profileImage || null;
      const rows = orderedMedia.filter((mediaItem) => mediaItem.slot === "row").map((mediaItem) => mediaItem.src);
      const columns = orderedMedia.filter((mediaItem) => mediaItem.slot === "column").map((mediaItem) => mediaItem.src);
      const safeRowsPerPage = Math.max(1, Math.floor(safeColumnsPerPage / 3));

      const totalPages = Math.max(
        Math.ceil(rows.length / safeRowsPerPage),
        Math.ceil(columns.length / safeColumnsPerPage),
        1,
      );

      const boundedPage = Math.min(safePage, totalPages);

      return {
        id: String(project._id),
        title: project.title || defaultMeta.title,
        period: formatProjectPeriod(project.publishedAt || project.createdAt) || defaultMeta.period,
        subtitle: project.description || "Relaxation and peace of mind can come from a well designed space. Mimz interior",
        media: orderedMedia,
        hero,
        rows: paginate(rows, boundedPage, safeRowsPerPage),
        columns: paginate(columns, boundedPage, safeColumnsPerPage),
        heroTotal: hero ? 1 : 0,
        rowTotal: rows.length,
        columnTotal: columns.length,
        totalPages,
        page: boundedPage,
      };
    }
  } catch (error) {
    console.error("Failed to load project detail from MongoDB:", error);
  }

  const meta = projectMetaMap[projectId] || defaultMeta;
  const subtitle =
    "Relaxation and peace of mind can come from a well designed space. Mimz interior";
  const media = sortByOrder(placeholderMedia);
  const hero = media.find((mediaItem) => mediaItem.slot === "hero")?.src || null;
  const rows = media.filter((mediaItem) => mediaItem.slot === "row").map((mediaItem) => mediaItem.src);
  const columns = media.filter((mediaItem) => mediaItem.slot === "column").map((mediaItem) => mediaItem.src);
  const safeRowsPerPage = Math.max(1, Math.floor(safeColumnsPerPage / 3));

  const totalPages = Math.max(
    Math.ceil(rows.length / safeRowsPerPage),
    Math.ceil(columns.length / safeColumnsPerPage),
    1
  );

  const boundedPage = Math.min(safePage, totalPages);

  await new Promise((resolve) => setTimeout(resolve, 160));

  return {
    id: projectId,
    title: meta.title,
    period: meta.period,
    subtitle,
    media,
    hero,
    rows: paginate(rows, boundedPage, safeRowsPerPage),
    columns: paginate(columns, boundedPage, safeColumnsPerPage),
    heroTotal: hero ? 1 : 0,
    rowTotal: rows.length,
    columnTotal: columns.length,
    totalPages,
    page: boundedPage,
  };
}
