"use server";

import projectA from "@assets/images/projects/projectsCatalogue/projecta.png";
import projectB from "@assets/images/projects/projectsCatalogue/projectb.png";
import projectC from "@assets/images/projects/projectsCatalogue/projectc.png";
import { PROJECTS_CATALOGUE_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQuery";

const mockPool = [
  {
    profileImage: projectA.src,
    title: "Project Pearl",
  },
  {
    profileImage: projectB.src,
    title: "Project Ivory",
  },
  {
    profileImage: projectC.src,
    title: "Project Aura",
  },
];

const mockProjects = Array.from({ length: 24 }, (_, index) => {
  const source = mockPool[index % mockPool.length];

  return {
    id: `project-${index + 1}`,
    title: `${source.title} ${index + 1}`,
    profileImage: source.profileImage,
  };
});

export async function getProjectsCataloguePage({
  page = 1,
  limit = PROJECTS_CATALOGUE_PAGE_SIZE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.trunc(limit)) : PROJECTS_CATALOGUE_PAGE_SIZE;
  const offset = (safePage - 1) * safeLimit;

  // Replace this mock slice with your API/server action backend call later.
  // Example:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?offset=${offset}&limit=${safeLimit}`, { cache: "no-store" });
  // const payload = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 220));

  const projects = mockProjects.slice(offset, offset + safeLimit);

  return {
    projects,
    total: mockProjects.length,
    limit: safeLimit,
    offset,
  };
}
