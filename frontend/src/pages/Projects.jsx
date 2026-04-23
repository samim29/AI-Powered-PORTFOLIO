import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProjectCard from "../components/sections/ProjectCard";
import { Search } from "lucide-react";

const FILTERS = ["all", "fullstack", "frontend", "backend", "ml", "other"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    axios.get(`${base}/api/projects`)
      .then((res) => setProjects(Array.isArray(res.data) ? res.data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => {
    const matchCat = filter === "all" || p.category === filter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">What I've built</p>
        <h1 className="font-display text-7xl md:text-[10vw] leading-none text-paper">PROJECTS</h1>
      </motion.div>

      {/* Filters + Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mb-12"
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-300 ${
                filter === f
                  ? "bg-accent border-accent text-paper"
                  : "border-paper/20 text-paper/50 hover:border-paper/50 hover:text-paper"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-paper/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, tech..."
            className="pl-9 pr-4 py-2 bg-paper/5 border border-paper/20 rounded-full font-mono text-xs text-paper placeholder-paper/30 outline-none focus:border-accent/50 w-56 transition-colors"
          />
        </div>
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card h-72 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32"
        >
          <p className="font-display text-6xl text-paper/10 mb-4">EMPTY</p>
          <p className="font-body text-paper/40">No projects found. Try a different filter.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}