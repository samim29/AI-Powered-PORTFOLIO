import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Star, StarOff, LogOut, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/admin/ProjectForm";

export default function Admin() {
  const { isAdmin, loading: authLoading, logout, getToken } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate("/login");
  }, [isAdmin, authLoading]);

  const fetchProjects = async () => {
  setLoading(true);
  try {
    const base = import.meta.env.VITE_API_URL || "";
    const res = await axios.get(`${base}/api/projects`);
    setProjects(Array.isArray(res.data) ? res.data : []);
  } catch {
    toast.error("Failed to load projects");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id) => {
  if (!confirm("Delete this project? This cannot be undone.")) return;
  try {
    const base = import.meta.env.VITE_API_URL || "";
    await axios.delete(`${base}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    toast.success("Project deleted");
    fetchProjects();
  } catch {
    toast.error("Delete failed");
  }
};

  const handleToggleFeatured = async (project) => {
  try {
    const base = import.meta.env.VITE_API_URL || "";
    const fd = new FormData();
    fd.append("featured", !project.featured);
    fd.append("title", project.title);
    fd.append("shortDescription", project.shortDescription);
    fd.append("techStack", JSON.stringify(project.techStack));
    await axios.put(`${base}/api/projects/${project._id}`, fd, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    toast.success(project.featured ? "Removed from featured" : "Marked as featured!");
    fetchProjects();
  } catch {
    toast.error("Update failed");
  }
};
  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-electric/30 border-t-electric rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-12"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span className="font-mono text-xs text-electric">Admin Mode Active</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-paper">DASHBOARD</h1>
          <p className="font-mono text-sm text-paper/30 mt-2">{projects.length} projects in portfolio</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setEditProject(null); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-electric/20 border border-electric/30 text-electric font-body font-medium rounded-xl hover:bg-electric/30 transition-all"
          >
            <Plus size={16} /> Add Project
          </button>
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="flex items-center gap-2 px-4 py-2.5 border border-paper/20 text-paper/50 font-body text-sm rounded-xl hover:border-paper/40 hover:text-paper transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Total Projects", val: projects.length },
          { label: "Featured", val: projects.filter((p) => p.featured).length },
          { label: "Full-stack", val: projects.filter((p) => p.category === "fullstack").length },
          { label: "ML Projects", val: projects.filter((p) => p.category === "ml").length },
        ].map((s) => (
          <div key={s.label} className="glass-card p-5">
            <p className="font-mono text-xs text-paper/30 mb-1">{s.label}</p>
            <p className="font-display text-4xl text-paper">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Projects table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="glass-card h-20 animate-pulse" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 glass-card">
          <p className="font-display text-5xl text-paper/10 mb-4">EMPTY</p>
          <p className="font-body text-paper/30 mb-6">No projects yet. Add your first one!</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={16} /> Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-4 flex items-center gap-4 hover:border-paper/20 transition-colors"
            >
              {/* Image thumbnail */}
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-paper/5 flex-shrink-0">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-xl text-paper/20">{p.title[0]}</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-body font-medium text-paper truncate">{p.title}</h3>
                  {p.featured && <span className="text-xs font-mono text-accent flex-shrink-0">★ featured</span>}
                </div>
                <p className="font-mono text-xs text-paper/30 truncate">{p.shortDescription}</p>
              </div>

              {/* Category */}
              <span className="hidden md:block font-mono text-xs text-paper/40 flex-shrink-0">{p.category}</span>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => navigate(`/projects/${p._id}`)}
                  title="View"
                  className="p-2 text-paper/30 hover:text-paper transition-colors"
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => handleToggleFeatured(p)}
                  title={p.featured ? "Unfeature" : "Feature"}
                  className={`p-2 transition-colors ${p.featured ? "text-accent" : "text-paper/30 hover:text-accent"}`}
                >
                  {p.featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
                </button>
                <button
                  onClick={() => { setEditProject(p); setShowForm(true); }}
                  title="Edit"
                  className="p-2 text-paper/30 hover:text-electric transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  title="Delete"
                  className="p-2 text-paper/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editProject}
          onClose={() => { setShowForm(false); setEditProject(null); }}
          onSaved={fetchProjects}
        />
      )}
    </div>
  );
}
