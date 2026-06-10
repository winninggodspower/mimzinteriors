"use server";

import { PROJECTS_CATALOGUE_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQueryKeys";
import dbConnect from "../../../app/lib/mongoose";
import Project from "../../../app/models/project";

const VALID_TAGS = ["home", "office", "hotel"];

const mockPool = {
  home: [
    {
      profileImage: "/project-catalogue/projecta.png",
      title: "Home Serene",
      description: "A tranquil residential interior with warm tones and natural light that invites relaxation.",
    },
    {
      profileImage: "/project-catalogue/projectb.png",
      title: "Home Elegance",
      description: "Classic home design blending contemporary finishes with timeless comfort.",
    },
    {
      profileImage: "/project-catalogue/projectc.png",
      title: "Home Haven",
      description: "A cozy family space crafted for connection, rest, and everyday luxury.",
    },
  ],
  office: [
    {
      profileImage: "/project-catalogue/projecta.png",
      title: "Office Pinnacle",
      description: "A sophisticated corporate workspace designed for productivity and modern professionalism.",
    },
    {
      profileImage: "/project-catalogue/projectb.png",
      title: "Office Flow",
      description: "Open-plan office interiors that balance collaboration with quiet focus zones.",
    },
    {
      profileImage: "/project-catalogue/projectc.png",
      title: "Office Apex",
      description: "Executive-level office design that communicates authority and refined taste.",
    },
  ],
  hotel: [
    {
      profileImage: "/project-catalogue/projecta.png",
      title: "Hotel Luxe",
      description: "Five-star hospitality interiors with opulent finishes and unforgettable guest experiences.",
    },
    {
      profileImage: "/project-catalogue/projectb.png",
      title: "Hotel Boutique",
      description: "Boutique hotel charm with curated details and intimate ambiance.",
    },
    {
      profileImage: "/project-catalogue/projectc.png",
      title: "Hotel Grand",
      description: "Grand lobby and suite designs that set the standard for luxury hospitality.",
    },
  ],
};

function generateMockProjects(tag, totalCount = 24) {
  const pool = mockPool[tag] || mockPool.home;
  return Array.from({ length: totalCount }, (_, index) => {
    const source = pool[index % pool.length];
    return {
      id: `mock-${tag}-${index + 1}`,
      title: `${source.title} ${index + 1}`,
      profileImage: source.profileImage,
      description: source.description,
      tag,
    };
  });
}

export async function getProjectsByTagPage({
  tag = "home",
  page = 1,
  limit = PROJECTS_CATALOGUE_PAGE_SIZE,
}) {
  const safeTag = VALID_TAGS.includes(tag) ? tag : "home";
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.trunc(limit)) : PROJECTS_CATALOGUE_PAGE_SIZE;
  const offset = (safePage - 1) * safeLimit;

  try {
    await dbConnect();

    const filter = { isPublished: true, tag: safeTag };

    const [documents, total] = await Promise.all([
      Project.find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(offset)
        .limit(safeLimit)
        .lean(),
      Project.countDocuments(filter),
    ]);

    if (total > 0) {
      return {
        projects: documents.map((project) => ({
          id: String(project._id),
          title: project.title,
          profileImage: project.profileImage,
          description: project.description,
          tag: project.tag || "home",
        })),
        tag: safeTag,
        total,
        limit: safeLimit,
        offset,
      };
    }
  } catch (error) {
    console.error("Failed to load published projects by tag from MongoDB:", error);
  }

  // Fallback to mock data when MongoDB returns nothing
  const allMock = generateMockProjects(safeTag);
  const total = allMock.length;
  const projects = allMock.slice(offset, offset + safeLimit);

  return {
    projects,
    tag: safeTag,
    total,
    limit: safeLimit,
    offset,
  };
}