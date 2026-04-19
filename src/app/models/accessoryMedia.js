import mongoose from "mongoose"

const accessoryMediaSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true },
)

const AccessoryMedia = mongoose.models.AccessoryMedia || mongoose.model("AccessoryMedia", accessoryMediaSchema)

export default AccessoryMedia