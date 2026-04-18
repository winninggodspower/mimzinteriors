import mongoose from "mongoose"

const projectMediaSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    slot: { type: String, enum: ["hero", "row", "column"], required: true, index: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    order: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
)

projectMediaSchema.index({ projectId: 1, slot: 1, order: 1 })

const ProjectMedia = mongoose.models.ProjectMedia || mongoose.model("ProjectMedia", projectMediaSchema)

export default ProjectMedia
