"use server";

import projectA from "@assets/images/projects/projectsCatalogue/projecta.png";
import projectB from "@assets/images/projects/projectsCatalogue/projectb.png";
import projectC from "@assets/images/projects/projectsCatalogue/projectc.png";
import { APARTMENTS_CATALOGUE_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQuery";

const mockPool = [
  {
    profileImage: projectA.src,
    title: "Apartment Pearl",
  },
  {
    profileImage: projectB.src,
    title: "Apartment Ivory",
  },
  {
    profileImage: projectC.src,
    title: "Apartment Aura",
  },
];

const mockApartments = Array.from({ length: 24 }, (_, index) => {
  const source = mockPool[index % mockPool.length];

  return {
    id: `apartment-${index + 1}`,
    title: `${source.title} ${index + 1}`,
    profileImage: source.profileImage,
  };
});

export async function getApartmentsCataloguePage({
  page = 1,
  limit = APARTMENTS_CATALOGUE_PAGE_SIZE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeLimit = Number.isFinite(limit)
    ? Math.max(1, Math.trunc(limit))
    : APARTMENTS_CATALOGUE_PAGE_SIZE;
  const offset = (safePage - 1) * safeLimit;

  await new Promise((resolve) => setTimeout(resolve, 220));

  const apartments = mockApartments.slice(offset, offset + safeLimit);

  return {
    apartments,
    total: mockApartments.length,
    limit: safeLimit,
    offset,
  };
}
