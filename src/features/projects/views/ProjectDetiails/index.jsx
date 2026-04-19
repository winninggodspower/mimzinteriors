"use client"

import CatalogueDetailView from "@features/projects/components/catalogue-detail-view"
import { useProjectDetailPagination } from "./useProjectDetailPagination"

export default function ProectDetail({ projectId }) {
  const pagination = useProjectDetailPagination(projectId)

  return <CatalogueDetailView entityLabel="Project" {...pagination} />
}
