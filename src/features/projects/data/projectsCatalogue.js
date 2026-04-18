"use server";

import projectA from "@assets/images/projects/projectsCatalogue/projecta.png";
import projectB from "@assets/images/projects/projectsCatalogue/projectb.png";
import projectC from "@assets/images/projects/projectsCatalogue/projectc.png";
import { PROJECTS_CATALOGUE_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQueryKeys";
import dbConnect from "../../../app/lib/mongoose";
import Project from "../../../app/models/project";

const mockPool = [
  {
    profileImage: projectA.src,
    title: "Project Pearl",
    description: "Refined comfort where soft palettes and thoughtful detailing create a calm, luxurious everyday living experience.",
  },
  {
    profileImage: projectB.src,
    title: "Project Ivory",
    description: "A modern interior with clean lines, layered textures, and timeless finishes designed for both beauty and function.",
  },
  {
    profileImage: projectC.src,
    title: "Project Aura",
    description: "Elegant spatial storytelling that balances warmth, light, and craftsmanship to deliver a memorable atmosphere.",
  },
];

const mockProjects = Array.from({ length: 24 }, (_, index) => {
  const source = mockPool[index % mockPool.length];

  return {
    id: `project-${index + 1}`,
    title: `${source.title} ${index + 1}`,
    profileImage: source.profileImage,
    description: source.description,
  };
});

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

  await new Promise((resolve) => setTimeout(resolve, 220));

  const projects = mockProjects.slice(offset, offset + safeLimit);

  return {
    projects,
    total: mockProjects.length,
    limit: safeLimit,
    offset,
  };
}
