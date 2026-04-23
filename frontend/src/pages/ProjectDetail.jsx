import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Github, ExternalLink, Play, ArrowLeft } from "lucide-react";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    axios.get(`${base}/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="font-display text-6xl text-paper/20">404</p>
      <Link to="/projects" className="btn-outline">Back to Projects</Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-paper/40 hover:text-accent transition-colors mb-10">
          <ArrowLeft size={14} /> Back to projects
        </Link>

        {/* Hero image */}
        {project.imageUrl && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10 border border-paper/10">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-xs text-accent mb-2 block uppercase tracking-widest">{project.category}</span>
            <h1 className="font-display text-5xl md:text-7xl text-paper leading-none">{project.title}</h1>
          </div>
          <div className="flex gap-3 flex-wrap">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 text-sm">
                <Github size={15} /> Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary flex items-center gap-2 text-sm">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.videoUrl && (
              <a href={project.videoUrl} target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2 text-sm">
                <Play size={15} /> Watch Demo
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-mono text-xs text-paper/30 uppercase tracking-widest mb-3">Overview</h2>
              <p className="font-body text-paper/70 leading-relaxed text-lg">{project.shortDescription}</p>
            </div>
            {project.longDescription && (
              <div>
                <h2 className="font-mono text-xs text-paper/30 uppercase tracking-widest mb-3">Details</h2>
                <p className="font-body text-paper/60 leading-relaxed whitespace-pre-line">{project.longDescription}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-5">
              <h3 className="font-mono text-xs text-paper/30 uppercase tracking-widest mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((t) => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-mono text-xs text-paper/30 uppercase tracking-widest mb-3">Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-paper/30">Category</span>
                  <span className="font-mono text-xs text-paper/60">{project.category}</span>
                </div>
                {project.featured && (
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-paper/30">Status</span>
                    <span className="font-mono text-xs text-accent">Featured</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-paper/30">Added</span>
                  <span className="font-mono text-xs text-paper/60">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
