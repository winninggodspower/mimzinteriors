import Link from "next/link"
import { notFound } from "next/navigation"
import {
  deleteApartmentMediaAction,
  getAdminApartmentImagesPageData,
  uploadApartmentMediaFormAction,
} from "../../actions"
import CatalogMediaGrid from "@features/admin/catalogue/components/catalog-media-grid"
import CatalogMediaUploadForm from "@features/admin/catalogue/components/catalog-media-upload-form"

export default async function AdminApartmentImagesPage({ params }) {
  const { apartmentId } = await params
  const data = await getAdminApartmentImagesPageData(apartmentId)

  if (!data) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Apartment Images</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">{data.apartment.title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">{data.apartment.description}</p>
          </div>

          <Link
            href="/admin/apartment"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to Apartments
          </Link>
        </div>

        <CatalogMediaUploadForm
          action={uploadApartmentMediaFormAction}
          entityId={data.apartment.id}
          entityIdField="apartmentId"
          entityLabel="Apartment"
        />
      </section>

      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">All Uploaded Images</h2>
        <p className="mt-1 text-sm text-slate-600">Upload new images above or delete any image from this gallery.</p>

        <div className="mt-4">
          <CatalogMediaGrid
            media={data.media}
            entityId={data.apartment.id}
            entityIdField="apartmentId"
            deleteAction={deleteApartmentMediaAction}
          />
        </div>
      </section>
    </div>
  )
}
