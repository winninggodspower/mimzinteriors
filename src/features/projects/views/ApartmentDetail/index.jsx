"use client"

import CatalogueDetailView from "@features/projects/components/catalogue-detail-view"
import { useApartmentDetailPagination } from "./useApartmentDetailPagination"

export default function ApartmentDetail({ apartmentId }) {
  const pagination = useApartmentDetailPagination(apartmentId)

  return <CatalogueDetailView entityLabel="Apartment" {...pagination} />
}
