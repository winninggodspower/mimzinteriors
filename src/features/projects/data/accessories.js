"use server";

import AccessoryMedia from "@/models/accessoryMedia";
import dbConnect from "@/lib/mongoose";
import { ACCESSORIES_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQueryKeys";

export async function getAccessoriesPage({ page = 1, limit = ACCESSORIES_PAGE_SIZE }) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.trunc(limit)) : ACCESSORIES_PAGE_SIZE;
  const offset = (safePage - 1) * safeLimit;

  try {
    await dbConnect();

    const [documents, total] = await Promise.all([
      AccessoryMedia.find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(safeLimit)
        .lean(),
      AccessoryMedia.countDocuments(),
    ]);

    return {
      items: documents.map((item) => ({
        id: item._id.toString(),
        image: item.imageUrl,
        title: item.imagePublicId || "Accessory",
      })),
      total,
      limit: safeLimit,
      offset,
    };
  } catch (error) {
    console.error("Error fetching accessories:", error);
    throw new Error("Failed to fetch accessories");
  }
}
