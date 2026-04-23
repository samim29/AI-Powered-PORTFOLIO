import { motion } from "framer-motion";
import { Github, ExternalLink, Play } from "lucide-react";
import { Link } from "react-router-dom";

const catColors = {
  fullstack: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  frontend: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  backend: "bg-green-500/10 text-green-300 border-green-500/20",
  ml: "bg-accent/10 text-accent border-accent/20",
  other: "bg-paper/10 text-paper/60 border-paper/20",
};

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to={`/projects/${project._id}`}>
        <div className="glass-card overflow-hidden hover:border-accent/30 transition-all duration-500 hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-52 overflow-hidden bg-paper/5">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-6xl text-paper/10">
                  {project.title[0]}
                </span>
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
            {/* Category badge */}
            <div className={`absolute top-3 left-3 text-xs font-mono px-2 py-1 rounded-full border ${catColors[project.category]}`}>
              {project.category}
            </div>
            {project.featured && (
              <div className="absolute top-3 right-3 text-xs font-mono px-2 py-1 rounded-full bg-accent text-paper">
                featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display text-2xl text-paper group-hover:text-accent transition-colors duration-300 mb-2">
              {project.title}
            </h3>
            <p className="font-body text-sm text-paper/50 leading-relaxed line-clamp-2 mb-4">
              {project.shortDescription}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack?.slice(0, 4).map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
              {project.techStack?.length > 4 && (
                <span className="tag-pill">+{project.techStack.length - 4}</span>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-3 border-t border-paper/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 font-mono text-xs text-paper/40 hover:text-paper transition-colors"
                >
                  <Github size={13} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 font-mono text-xs text-paper/40 hover:text-electric transition-colors"
                >
                  <ExternalLink size={13} /> Live
                </a>
              )}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 font-mono text-xs text-paper/40 hover:text-accent transition-colors"
                >
                  <Play size={13} /> Demo
                </a>
              )}
              <span className="ml-auto font-mono text-xs text-paper/20 group-hover:text-accent transition-colors">
                view →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
