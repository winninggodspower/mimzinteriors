"use server"

import projectA from "@assets/images/projects/projectsCatalogue/projecta.png"
import projectB from "@assets/images/projects/projectsCatalogue/projectb.png"
import projectC from "@assets/images/projects/projectsCatalogue/projectc.png"
import { APARTMENTS_CATALOGUE_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQueryKeys"
import dbConnect from "@/lib/mongoose"
import Apartment from "@/models/apartment"

const mockPool = [
  {
    profileImage: projectA.src,
    title: "Apartment Pearl",
    description: "Soft finishes, layered comfort, and a calm shortlet atmosphere designed for easy stays.",
  },
  {
    profileImage: projectB.src,
    title: "Apartment Ivory",
    description: "A polished apartment interior with clean details and welcoming everyday luxury.",
  },
  {
    profileImage: projectC.src,
    title: "Apartment Aura",
    description: "A bright, elegant apartment concept that balances warmth, comfort, and style.",
  },
]

const mockApartments = Array.from({ length: 24 }, (_, index) => {
  const source = mockPool[index % mockPool.length]

  return {
    id: `apartment-${index + 1}`,
    title: `${source.title} ${index + 1}`,
    profileImage: source.profileImage,
    description: source.description,
  }
})

export async function getApartmentsCataloguePage({
  page = 1,
  limit = APARTMENTS_CATALOGUE_PAGE_SIZE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1
  const safeLimit = Number.isFinite(limit)
    ? Math.max(1, Math.trunc(limit))
    : APARTMENTS_CATALOGUE_PAGE_SIZE
  const offset = (safePage - 1) * safeLimit

  try {
    await dbConnect()

    const [documents, total] = await Promise.all([
      Apartment.find({ isPublished: true })
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(offset)
        .limit(safeLimit)
        .lean(),
      Apartment.countDocuments({ isPublished: true }),
    ])

    if (total > 0) {
      return {
        apartments: documents.map((apartment) => ({
          id: String(apartment._id),
          title: apartment.title,
          profileImage: apartment.profileImage,
          description: apartment.description,
        })),
        total,
        limit: safeLimit,
        offset,
      }
    }
  } catch (error) {
    console.error("Failed to load published apartments from MongoDB:", error)
  }

  await new Promise((resolve) => setTimeout(resolve, 220))

  const apartments = mockApartments.slice(offset, offset + safeLimit)

  return {
    apartments,
    total: mockApartments.length,
    limit: safeLimit,
    offset,
  }
}
