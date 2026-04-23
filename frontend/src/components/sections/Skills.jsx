import { motion } from "framer-motion";

const skills = [
  { name: "React.js", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "MongoDB", cat: "Database" },
  { name: "Express.js", cat: "Backend" },
  { name: "Python", cat: "Language" },
  { name: "Java", cat: "Language" },
  { name: "JavaScript", cat: "Language" },
  { name: "Tailwind CSS", cat: "Styling" },
  { name: "AWS Cloud", cat: "Cloud" },
  { name: "Machine Learning", cat: "AI/ML" },
  { name: "SQL", cat: "Database" },
  { name: "Git / GitHub", cat: "Tools" },
  { name: "DSA", cat: "CS Core" },
  { name: "OOP", cat: "CS Core" },
];

const catColors = {
  Frontend: "text-blue-400 border-blue-400/30",
  Backend: "text-green-400 border-green-400/30",
  Database: "text-yellow-400 border-yellow-400/30",
  Language: "text-purple-400 border-purple-400/30",
  Cloud: "text-cyan-400 border-cyan-400/30",
  "AI/ML": "text-accent border-accent/30",
  Styling: "text-pink-400 border-pink-400/30",
  Tools: "text-paper/60 border-paper/20",
  "CS Core": "text-orange-400 border-orange-400/30",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function Skills() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">Arsenal</p>
        <h2 className="font-display text-5xl md:text-7xl text-paper">
          SKILLS <span className="text-paper/20">&</span> TOOLS
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-3"
      >
        {skills.map((s) => (
          <motion.div
            key={s.name}
            variants={item}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-paper/5 backdrop-blur-sm cursor-default ${catColors[s.cat] || "text-paper/60 border-paper/20"}`}
          >
            <span className="font-body text-sm font-medium">{s.name}</span>
            <span className="font-mono text-xs opacity-50">{s.cat}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
