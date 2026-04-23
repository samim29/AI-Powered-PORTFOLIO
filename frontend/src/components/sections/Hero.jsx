import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";

const floatingWords = ["DEVELOPER", "BUILDER", "RESEARCHER", "CREATOR", "ENGINEER"];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,77,0,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Big BG text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] text-paper/[0.03] whitespace-nowrap">
          SAMIM
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-electric/30 bg-electric/5"
        >
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          <span className="font-mono text-xs text-electric">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-[13vw] md:text-[11vw] leading-none tracking-tight text-paper">
            SK SAMIM
          </h1>
          <h1 className="font-display text-[13vw] md:text-[11vw] leading-none tracking-tight text-accent">
            ALI
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-accent" />
          <span className="font-mono text-sm text-paper/50">I build</span>
          <TypeAnimation
            sequence={[
              "full-stack web apps", 2000,
              "AI-powered tools", 2000,
              "intelligent systems", 2000,
              "things that matter", 2000,
            ]}
            repeat={Infinity}
            className="font-mono text-sm text-accent"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 max-w-md font-body text-paper/50 leading-relaxed"
        >
          CS (AI & ML) undergraduate at Techno Engineering College Banipur.
          CGPA 8.6. Chancellor's Medal recipient. Building software that solves real problems.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link to="/projects" className="btn-primary flex items-center gap-2 group">
            View Projects
            <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </Link>
          <Link to="/contact" className="btn-outline">
            Let's talk
          </Link>
          <a
            href="https://github.com/samim29"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-paper/40 hover:text-paper/70 transition-colors underline underline-offset-4"
          >
            github.com/samim29
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-sm"
        >
          {[
            { num: "8.6", label: "CGPA" },
            { num: "2+", label: "Projects" },
            { num: "5+", label: "Certs" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl text-accent">{s.num}</div>
              <div className="font-mono text-xs text-paper/40 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-paper/30">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent"
        />
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-paper/5 py-3 bg-ink/50 backdrop-blur-sm">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...floatingWords, ...floatingWords].map((w, i) => (
            <span key={i} className="font-display text-sm tracking-widest text-paper/20">
              {w} <span className="text-accent/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
