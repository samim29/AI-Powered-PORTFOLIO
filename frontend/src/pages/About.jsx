import { motion } from "framer-motion";
import { GraduationCap, Code2, Microscope, Trophy } from "lucide-react";

const timeline = [
  {
    year: "2020",
    title: "Secondary (Class 10)",
    org: "Garh Bhawanipur R.P. Institution",
    detail: "88% — Strong academic foundation",
    icon: GraduationCap,
    color: "text-purple-400",
  },
  {
    year: "2022",
    title: "Higher Secondary (Class 12)",
    org: "Garh Bhawanipur R.P. Institution",
    detail: "84% — Science stream",
    icon: GraduationCap,
    color: "text-blue-400",
  },
  {
    year: "2022",
    title: "B.Tech CS (AI & ML) — Started",
    org: "Techno Engineering College Banipur",
    detail: "Began the journey into AI and software engineering",
    icon: Code2,
    color: "text-accent",
  },
  {
    year: "2023",
    title: "Wanderlust — Full-stack Platform",
    org: "Personal Project",
    detail: "Built a full rental property listing app with MERN-adjacent stack",
    icon: Code2,
    color: "text-green-400",
  },
  {
    year: "2024",
    title: "Chancellor's Medal — College Topper",
    org: "Techno India University Convocation",
    detail: "Awarded Jewel of Jewels for academic excellence",
    icon: Trophy,
    color: "text-yellow-400",
  },
  {
    year: "2024",
    title: "Conversa — AI Chatbot",
    org: "Personal Project",
    detail: "MERN stack chatbot with integrated third-party AI API",
    icon: Code2,
    color: "text-cyan-400",
  },
  {
    year: "2025",
    title: "Lung Cancer Prediction Research",
    org: "Under Faculty Guidance",
    detail: "ML model evaluation and error analysis — under review",
    icon: Microscope,
    color: "text-pink-400",
  },
  {
    year: "2026",
    title: "B.Tech Graduation",
    org: "Techno Engineering College Banipur",
    detail: "Expected — CGPA 8.6",
    icon: GraduationCap,
    color: "text-electric",
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">The story so far</p>
        <h1 className="font-display text-7xl md:text-[10vw] leading-none text-paper mb-6">ABOUT ME</h1>
        <div className="max-w-2xl">
          <p className="font-body text-lg text-paper/60 leading-relaxed">
            I'm Sk Samim Ali — a Computer Science undergraduate specializing in AI & ML,
            building things at the intersection of software and intelligence.
            I care deeply about clean code, real-world impact, and shipping products that work.
          </p>
        </div>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Left - bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="glass-card p-8 h-full">
            <h2 className="font-display text-3xl text-paper mb-6">THE BASICS</h2>
            <div className="space-y-4">
              {[
                { label: "Name", val: "Sk Samim Ali" },
                { label: "Role", val: "Full-stack Developer + AI/ML Student" },
                { label: "Location", val: "West Bengal, India" },
                { label: "College", val: "Techno Engineering College Banipur" },
                { label: "Degree", val: "B.Tech in CS (AI & ML)" },
                { label: "CGPA", val: "8.6 / 10" },
                { label: "Graduation", val: "2026 (Expected)" },
                { label: "Email", val: "samimalisk000@gmail.com" },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-start gap-4 py-3 border-b border-paper/10 last:border-0">
                  <span className="font-mono text-xs text-paper/30 w-24 flex-shrink-0 pt-0.5">{label}</span>
                  <span className="font-body text-sm text-paper/70">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right - what I do */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="space-y-6"
        >
          {[
            {
              title: "I build full-stack apps",
              body: "From database schemas to pixel-perfect UIs. My stack revolves around MERN — MongoDB, Express, React, Node — with Tailwind for styling and clean component architecture.",
              color: "border-accent/30",
            },
            {
              title: "I explore AI & ML",
              body: "My academic focus is on applied machine learning. I've worked on research involving lung cancer prediction models, and I'm certified in IBM AI fundamentals and AWS Cloud.",
              color: "border-purple-400/30",
            },
            {
              title: "I contribute to open source",
              body: "Top 25 contributor in Apertre 2.0, a 30-day open-source program by Resourcio Community. Regular Hacktoberfest participant.",
              color: "border-green-400/30",
            },
            {
              title: "I ship real projects",
              body: "Wanderlust (travel stay platform) and Conversa (AI chatbot) are real, deployed, complete applications — not just tutorials.",
              color: "border-blue-400/30",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`glass-card p-6 border-l-2 ${card.color}`}
            >
              <h3 className="font-body font-medium text-paper mb-2">{card.title}</h3>
              <p className="font-body text-sm text-paper/50 leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">Journey</p>
        <h2 className="font-display text-5xl md:text-7xl text-paper mb-12">TIMELINE</h2>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-paper/10" />
          <div className="space-y-8 pl-16">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="relative"
              >
                {/* Dot */}
                <div className={`absolute -left-10 top-1 w-4 h-4 rounded-full border-2 border-ink bg-ink flex items-center justify-center ${item.color}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                </div>

                <div className="glass-card p-5 hover:border-paper/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <item.icon size={16} className={`mt-0.5 flex-shrink-0 ${item.color}`} />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs text-paper/30">{item.year}</span>
                        <h3 className="font-body font-medium text-paper text-sm">{item.title}</h3>
                      </div>
                      <p className="font-mono text-xs text-paper/40 mb-1">{item.org}</p>
                      <p className="font-body text-sm text-paper/50">{item.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
