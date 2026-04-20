"use server"

import ivoryHero from "@assets/images/projects/projectsCatalogue/projects/ivoryhero.png"
import ivoryHeroB from "@assets/images/projects/projectsCatalogue/projects/ivoryherob.png"
import ivoryHeroC from "@assets/images/projects/projectsCatalogue/projects/ivoryheroc.png"
import ivoryColumnA from "@assets/images/projects/projectsCatalogue/projects/ivorycolumna.png"
import ivoryColumnB from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnb.png"
import ivoryColumnC from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnc.png"
import ivoryColumnD from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnd.png"
import ivoryColumnE from "@assets/images/projects/projectsCatalogue/projects/ivorycolumne.png"
import ivoryColumnF from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnf.png"
import {
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQueryKeys"
import { buildDetailPageData, formatEntityPeriod } from "@features/projects/lib/detailPageData"
import dbConnect from "@/lib/mongoose"
import Apartment from "@/models/apartment"
import ApartmentMedia from "@/models/apartmentMedia"

const apartmentMetaMap = {
  "apartment-1": { title: "APARTMENT PEARL", period: "JAN 2025" },
  "apartment-2": { title: "APARTMENT IVORY", period: "FEB 2025" },
  "apartment-3": { title: "APARTMENT AURA", period: "MAR 2025" },
}

const defaultMeta = { title: "APARTMENT PEARL", period: "JAN 2025" }

const placeholderMedia = [
  { id: "apartment-column-1", src: ivoryColumnA.src, slot: "column", order: 1 },
  { id: "apartment-column-2", src: ivoryColumnB.src, slot: "column", order: 2 },
  { id: "apartment-row-1", src: ivoryHeroB.src, slot: "row", order: 3 },
  { id: "apartment-column-3", src: ivoryColumnC.src, slot: "column", order: 4 },
  { id: "apartment-column-4", src: ivoryColumnD.src, slot: "column", order: 5 },
  { id: "apartment-row-2", src: ivoryHeroC.src, slot: "row", order: 6 },
  { id: "apartment-column-5", src: ivoryColumnE.src, slot: "column", order: 7 },
  { id: "apartment-column-6", src: ivoryColumnF.src, slot: "column", order: 8 },
]

export async function getApartmentDetailPage({
  apartmentId,
  page = 1,
  columnsPerPage = PROJECT_DETAIL_COLUMNS_PER_PAGE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1
  const safeColumnsPerPage = Number.isFinite(columnsPerPage)
    ? Math.max(1, Math.trunc(columnsPerPage))
    : PROJECT_DETAIL_COLUMNS_PER_PAGE

  try {
    await dbConnect()

    const [apartment, mediaDocuments] = await Promise.all([
      Apartment.findById(apartmentId).lean(),
      ApartmentMedia.find({ apartmentId }).sort({ order: 1, createdAt: 1 }).lean(),
    ])

    if (apartment) {
      const media = mediaDocuments.map((item) => ({
        id: String(item._id),
        src: item.imageUrl,
        slot: item.slot,
        order: item.order,
      }))

      return buildDetailPageData({
        id: String(apartment._id),
        title: apartment.title || defaultMeta.title,
        period: formatEntityPeriod(apartment.publishedAt || apartment.createdAt) || defaultMeta.period,
        subtitle: apartment.description || "Relaxation and peace of mind can come from a well designed space. Mimz interior",
        profileImage: apartment.profileImage,
        media,
        page: safePage,
        columnsPerPage: safeColumnsPerPage,
      })
    }
  } catch (error) {
    console.error("Failed to load apartment detail from MongoDB:", error)
  }

  const meta = apartmentMetaMap[apartmentId] || defaultMeta
  const subtitle =
    "Relaxation and peace of mind can come from a well designed space. Mimz interior"

  await new Promise((resolve) => setTimeout(resolve, 160))

  return buildDetailPageData({
    id: apartmentId,
    title: meta.title,
    period: meta.period,
    subtitle,
    profileImage: ivoryHero.src,
    media: placeholderMedia,
    page: safePage,
    columnsPerPage: safeColumnsPerPage,
  })
}
