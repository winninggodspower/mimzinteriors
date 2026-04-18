import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
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

projectSchema.index({ createdAt: -1 })
projectSchema.index({ isPublished: 1, createdAt: -1 })

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema)

export default Project
