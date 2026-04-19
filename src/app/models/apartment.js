import mongoose from "mongoose"

const apartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    profileImage: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
)

apartmentSchema.index({ createdAt: -1 })
apartmentSchema.index({ isPublished: 1, createdAt: -1 })

const Apartment = mongoose.models.Apartment || mongoose.model("Apartment", apartmentSchema)

export default Apartment
