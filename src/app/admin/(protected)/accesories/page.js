import {
  deleteAccessoryMediaAction,
  getAdminAccessoryImages,
  uploadAccessoryMediaFormAction,
} from "./actions"
import CatalogMediaGrid from "@features/admin/catalogue/components/catalog-media-grid"
import CatalogMediaUploadForm from "@features/admin/catalogue/components/catalog-media-upload-form"

const ACCESSORY_GALLERY_ID = "accessories-gallery"

export default async function AdminAccesoriesPage() {
  const media = await getAdminAccessoryImages()

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Accessories Images</h1>
        <p className="mt-2 text-slate-600">Upload accessories images and remove any image you no longer want in the gallery.</p>

        <CatalogMediaUploadForm
          action={uploadAccessoryMediaFormAction}
          entityId={ACCESSORY_GALLERY_ID}
          entityIdField="accessoryGroupId"
          entityLabel="Accessory"
          showLayoutFields={false}
        />
      </section>

      <section className="rounded-2xl border border-[#B58A2A]/25 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">All Uploaded Images</h2>
        <p className="mt-1 text-sm text-slate-600">Delete any image below to remove it from accessories.</p>

        <div className="mt-4">
          <CatalogMediaGrid
            media={media}
            entityId={ACCESSORY_GALLERY_ID}
            entityIdField="accessoryGroupId"
            deleteAction={deleteAccessoryMediaAction}
            emptyText="No accessories images uploaded yet."
            showLayoutMeta={false}
          />
        </div>
      </section>
    </div>
  )
}
