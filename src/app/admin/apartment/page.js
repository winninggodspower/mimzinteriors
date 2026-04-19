import Link from "next/link"
import {
  createApartmentFormAction,
  deleteApartmentAction,
  getAdminApartments,
  publishApartmentAction,
  unpublishApartmentAction,
} from "./actions"
import CatalogDeleteButton from "@features/admin/catalogue/components/catalog-delete-button"
import CatalogItemUploadForm from "@features/admin/catalogue/components/catalog-item-upload-form"

export default async function AdminApartmentPage() {
  const apartments = await getAdminApartments()

  return (
    <div className="space-y-6">
      <CatalogItemUploadForm
        action={createApartmentFormAction}
        entityLabel="Apartment"
        heading="Apartment Upload"
        description="Create multiple apartments and manage whether they are visible on the apartments catalogue page."
        toggleCreateLabel="Create Apartment"
        titlePlaceholder="Apartment Ivory"
        descriptionPlaceholder="Write a short apartment description"
        submitLabel="Upload Apartment"
      />

      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Existing Apartments</h2>

        {apartments.length === 0 ? (
          <p className="mt-4 text-slate-600">No apartments yet. Upload your first apartment.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {apartments.map((apartment) => (
              <article key={apartment.id} className="grid gap-4 rounded-xl border border-slate-200 p-4 md:grid-cols-[120px_1fr_auto] md:items-center">
                <img
                  src={apartment.profileImage}
                  alt={apartment.title}
                  className="h-24 w-30 rounded-lg object-cover"
                />

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{apartment.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{apartment.description}</p>
                  <p className="mt-2 text-xs text-slate-500">Detail images: {apartment.mediaCount}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {apartment.isPublished ? "Published" : "Unpublished"}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <Link
                    href={`/admin/apartment/${apartment.id}/images`}
                    className="rounded-lg border border-[#B58A2A]/40 bg-[#FFF7E5] px-4 py-2 text-sm font-medium text-[#7A5B1B] hover:bg-[#F9ECCF]"
                  >
                    View Images
                  </Link>

                  <form action={apartment.isPublished ? unpublishApartmentAction : publishApartmentAction}>
                    <input type="hidden" name="apartmentId" value={apartment.id} />
                    <button
                      type="submit"
                      className={`rounded-lg px-4 py-2 text-sm font-medium ${
                        apartment.isPublished
                          ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {apartment.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </form>

                  <CatalogDeleteButton
                    action={deleteApartmentAction}
                    entityId={apartment.id}
                    entityIdField="apartmentId"
                    entityLabel="Apartment"
                    entityTitle={apartment.title}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
