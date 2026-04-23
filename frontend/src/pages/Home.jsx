import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";
import ProjectCard from "../components/sections/ProjectCard";
import { ArrowRight, Award, Github, Linkedin } from "lucide-react";

const achievements = [
  { icon: "🏅", title: "Chancellor's Medal", sub: "Jewel of Jewels — College Topper" },
  { icon: "🏅", title: "Achieved 2nd Position at the 16th Inter-University Engineering, Science & Technology Academic Meet 2026 organized by FOSET", sub: "CampusNest+ — a Hybrid ML-Based Recommendation System for Paying Guest Accommodation Paper Presentation." },
  { icon: "💻", title: "Top 25 Contributor", sub: "Apertre 2.0 Open-Source" },
  { icon: "🐙", title: "Hacktoberfest", sub: "Open Source Contributor" },
  { icon: "☁️", title: "AWS Academy Graduate", sub: "Cloud Foundations" },
  { icon: "🤖", title: "IBM AI Certified", sub: "Introduction to AI" },
];

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || "";
    axios.get(`${base}/api/projects`).then((res) => {
      setProjects(Array.isArray(res.data) ? res.data.filter((p) => p.featured).slice(0, 3) : []);
    }).catch(() => {});
  }, []);

  return (
    <div className="noise-bg">
      <Hero />

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">Selected Work</p>
              <h2 className="font-display text-5xl md:text-7xl text-paper">FEATURED</h2>
            </div>
            <Link to="/projects" className="hidden md:flex items-center gap-2 font-mono text-xs text-paper/40 hover:text-accent transition-colors group">
              All projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
          </div>
          <div className="mt-8 md:hidden">
            <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
              All projects <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      <Skills />

      {/* Achievements */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">Recognition</p>
          <h2 className="font-display text-5xl md:text-7xl text-paper">ACHIEVEMENTS</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card p-5 hover:border-accent/30 transition-all duration-300"
            >
              <span className="text-2xl mb-3 block">{a.icon}</span>
              <h3 className="font-body font-medium text-paper mb-1">{a.title}</h3>
              <p className="font-mono text-xs text-paper/40">{a.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto glass-card border-accent/20 p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
          <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase relative">Let's Build Together</p>
          <h2 className="font-display text-5xl md:text-8xl text-paper mb-6 relative">GOT A PROJECT?</h2>
          <p className="font-body text-paper/50 max-w-md mx-auto mb-10 relative">
            I'm always open to interesting projects, collaborations, or just a good conversation about tech.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative">
            <Link to="/contact" className="btn-primary">Get in touch</Link>
            <a href="https://github.com/samim29" target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
            <a href="https://linkedin.com/in/sk-samim-ali" target="_blank" rel="noreferrer" className="btn-outline flex items-center gap-2">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
