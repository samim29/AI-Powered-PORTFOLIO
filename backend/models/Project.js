import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    techStack: [{ type: String }],
    category: {
      type: String,
      enum: ["fullstack", "frontend", "backend", "ml", "other"],
      default: "fullstack",
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
