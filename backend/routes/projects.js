import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/auth.js";
import { upload, cloudinary } from "../middleware/cloudinary.js";

const router = express.Router();

// Public - get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public - get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin - create project with image upload
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const data = {
      ...req.body,
      techStack: req.body.techStack ? JSON.parse(req.body.techStack) : [],
    };
    if (req.file) {
      data.imageUrl = req.file.path;
      data.imagePublicId = req.file.filename;
    }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin - update project
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const data = {
      ...req.body,
      techStack: req.body.techStack ? JSON.parse(req.body.techStack) : existing.techStack,
    };

    if (req.file) {
      if (existing.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId);
      }
      data.imageUrl = req.file.path;
      data.imagePublicId = req.file.filename;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Admin - delete project
router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId);
    }
    await project.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
