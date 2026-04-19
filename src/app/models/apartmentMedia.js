import mongoose from "mongoose"

const apartmentMediaSchema = new mongoose.Schema(
  {
    apartmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true, index: true },
    slot: { type: String, enum: ["hero", "row", "column"], required: true, index: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    order: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
)

apartmentMediaSchema.index({ apartmentId: 1, slot: 1, order: 1 })

const ApartmentMedia = mongoose.models.ApartmentMedia || mongoose.model("ApartmentMedia", apartmentMediaSchema)

export default ApartmentMedia
