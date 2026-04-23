import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = ["fullstack", "frontend", "backend", "ml", "other"];

export default function ProjectForm({ project, onClose, onSaved }) {
  const { getToken } = useAuth();
  const isEdit = !!project;

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    githubUrl: "",
    liveUrl: "",
    videoUrl: "",
    category: "fullstack",
    featured: false,
    order: 0,
  });
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      const { techStack: ts, imageUrl, ...rest } = project;
      setForm(rest);
      setTechStack(ts || []);
      setImagePreview(imageUrl || "");
    }
  }, [project]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !techStack.includes(t)) {
      setTechStack([...techStack, t]);
    }
    setTechInput("");
  };

  const removeTech = (t) => setTechStack(techStack.filter((x) => x !== t));

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = getToken();
    const base = import.meta.env.VITE_API_URL || "";

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("techStack", JSON.stringify(techStack));
      if (imageFile) fd.append("image", imageFile);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      if (isEdit) {
        await axios.put(`${base}/api/projects/${project._id}`, fd, { headers });
        toast.success("Project updated!");
      } else {
        await axios.post(`${base}/api/projects`, fd, { headers });
        toast.success("Project created!");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-paper/20 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl text-paper">
              {isEdit ? "EDIT PROJECT" : "NEW PROJECT"}
            </h2>
            <button onClick={onClose} className="p-2 hover:text-accent transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image upload */}
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Project Image</label>
              <label className="cursor-pointer block">
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                <div className="h-40 border-2 border-dashed border-paper/20 rounded-xl flex items-center justify-center hover:border-accent/50 transition-colors overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="text-center">
                      <Upload size={24} className="mx-auto text-paper/30 mb-2" />
                      <p className="font-mono text-xs text-paper/30">Click to upload image</p>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Title */}
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="My Awesome Project"
                className="w-full bg-paper/5 border border-paper/20 rounded-xl px-4 py-3 font-body text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            {/* Short description */}
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Short Description *</label>
              <input
                required
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                placeholder="One-line pitch for your project"
                className="w-full bg-paper/5 border border-paper/20 rounded-xl px-4 py-3 font-body text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            {/* Long description */}
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Full Description</label>
              <textarea
                rows={4}
                value={form.longDescription}
                onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                placeholder="Detailed description, challenges, learnings..."
                className="w-full bg-paper/5 border border-paper/20 rounded-xl px-4 py-3 font-body text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>

            {/* URLs row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: "githubUrl", label: "GitHub URL" },
                { key: "liveUrl", label: "Live URL" },
                { key: "videoUrl", label: "Video/Demo URL" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="font-mono text-xs text-paper/40 mb-2 block">{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-paper/5 border border-paper/20 rounded-xl px-3 py-2.5 font-mono text-xs text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Tech Stack</label>
              <div className="flex gap-2 mb-2">
                <input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                  placeholder="e.g. React.js"
                  className="flex-1 bg-paper/5 border border-paper/20 rounded-xl px-4 py-2.5 font-mono text-xs text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors"
                />
                <button type="button" onClick={addTech} className="px-4 py-2.5 bg-accent/20 border border-accent/30 text-accent rounded-xl hover:bg-accent/30 transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 tag-pill pr-1">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="hover:text-accent transition-colors">
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Category + Featured + Order */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-mono text-xs text-paper/40 mb-2 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-paper/5 border border-paper/20 rounded-xl px-3 py-2.5 font-mono text-xs text-paper outline-none focus:border-accent/50 transition-colors"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="font-mono text-xs text-paper/40 mb-2 block">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: +e.target.value })}
                  className="w-full bg-paper/5 border border-paper/20 rounded-xl px-3 py-2.5 font-mono text-xs text-paper outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                  <div
                    onClick={() => setForm({ ...form, featured: !form.featured })}
                    className={`w-10 h-5 rounded-full transition-colors ${form.featured ? "bg-accent" : "bg-paper/20"}`}
                  >
                    <motion.div
                      animate={{ x: form.featured ? 20 : 2 }}
                      className="w-4 h-4 mt-0.5 rounded-full bg-paper"
                    />
                  </div>
                  <span className="font-mono text-xs text-paper/60">Featured</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {loading ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
              </button>
              <button type="button" onClick={onClose} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
