import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const rules = [
  {
    patterns: ["who are you", "what are you", "introduce yourself", "about you"],
    reply: "I'm Samim's portfolio assistant! I can answer questions about Samim, his projects, skills, and help you navigate this site. 🤖",
  },
  {
    patterns: ["who is samim", "about samim", "tell me about", "introduce samim"],
    reply: "Sk Samim Ali is a CS (AI & ML) undergraduate at Techno Engineering College Banipur (2022–2026) with a CGPA of 8.6. He's a full-stack developer, Chancellor's Medal recipient, and open-source contributor. 🏅",
  },
  {
    patterns: ["project", "what has he built", "what did he build", "work"],
    reply: "Samim has built: 1) Wanderlust — a full-stack travel stay platform (MERN), 2) Conversa — an AI chatbot web app (MERN), and 3) CampusNest+ — a Hybrid ML-Based Recommendation System for Paying Guest Accommodation — an ML research project currently under review. 🚀",
    nav: "/projects",
  },
  {
    patterns: ["wanderlust"],
    reply: "Wanderlust is a full-stack travel stay platform for listing and booking rental properties. Built with MongoDB, Node.js, Express.js, and EJS. Features user auth, image upload, and reviews. 🌍",
  },
  {
    patterns: ["conversa", "chatbot project"],
    reply: "Conversa is an AI chatbot web app built with the MERN stack (MongoDB, Express, React, Node.js). It integrates a third-party AI API and stores full chat history in MongoDB. 💬",
  },
  {
    patterns: ["campusnest", "hybrid ml", "pg recommendation"],
    reply: "Samim worked on CampusNest+ — a Hybrid ML-Based Recommendation System for Paying Guest Accommodation. It combines Matrix Factorization and LightGBM to improve the PG hunting experience for students. It's currently under review. 🔬",
  },
  {
    patterns: ["skill", "technology", "tech stack", "what can he do", "knows"],
    reply: "Samim's skills include: React.js, Node.js, Express.js, MongoDB, SQL, Python, Java, JavaScript, Tailwind CSS, Git, DSA, OOP, DBMS, and AWS Cloud. 💻",
  },
  {
    patterns: ["frontend", "react", "ui"],
    reply: "On the frontend, Samim works with React.js, Tailwind CSS, HTML, CSS, and EJS. He focuses on clean structure and responsive design. 🎨",
  },
  {
    patterns: ["backend", "server", "api"],
    reply: "On the backend, Samim uses Node.js and Express.js to build RESTful APIs with clean architecture and basic security practices. ⚙️",
  },
  {
    patterns: ["database", "mongodb", "sql"],
    reply: "Samim works with both MongoDB (NoSQL) and SQL (relational) databases. MongoDB is his primary choice for full-stack MERN projects. 🗄️",
  },
  {
    patterns: ["education", "college", "degree", "study", "university", "cgpa", "grade"],
    reply: "Samim is pursuing B.Tech in CS (AI & ML) at Techno Engineering College Banipur (2022–2026) with a CGPA of 8.6. He scored 84% in Class 12 and 88% in Class 10. 🎓",
  },
  {
    patterns: ["achievement", "award", "medal", "chancellor", "recognition"],
    reply: "Samim won the Chancellor's Medal (Jewel of Jewels) for being the College Topper at Techno India University Convocation. He's also a Top 25 Contributor in Apertre 2.0 and a Hacktoberfest contributor. 🏆",
  },
  {
    patterns: ["certification", "certificate", "ibm", "aws", "cloud"],
    reply: "Samim holds: IBM Introduction to AI, AWS Academy Cloud Foundations, and was a Top 25 Contributor in the Apertre 2.0 open-source program. ☁️",
  },
  {
    patterns: ["open source", "hacktoberfest", "apertre", "contribute"],
    reply: "Samim is an active open-source contributor — Top 25 in Apertre 2.0 (30-day program by Resourcio Community) and a Hacktoberfest contributor. 🐙",
  },
  {
    patterns: ["contact", "email", "reach", "hire", "connect"],
    reply: "You can reach Samim at samimalisk000@gmail.com or +91 7501563483. He's also on LinkedIn (sk-samim-ali) and GitHub (samim29). Currently open to opportunities! 📧",
    nav: "/contact",
  },
  {
    patterns: ["github", "code", "repository"],
    reply: "Samim's GitHub is github.com/samim29 — check out his projects and contributions there! 🐙",
  },
  {
    patterns: ["linkedin"],
    reply: "Find Samim on LinkedIn at linkedin.com/in/sk-samim-ali for professional updates and connections. 💼",
  },
  {
    patterns: ["location", "where", "from", "india", "west bengal"],
    reply: "Samim is based in West Bengal, India. 📍",
  },
  {
    patterns: ["available", "job", "internship", "opportunity", "hire", "freelance"],
    reply: "Yes! Samim is currently open to internships, freelance projects, and full-time roles starting 2026. Reach out at samimalisk000@gmail.com 🟢",
    nav: "/contact",
  },
  {
    patterns: ["navigate", "go to", "take me", "show me", "open"],
    reply: "Sure! Where would you like to go? Try: 'take me to projects', 'go to about', 'open contact'.",
  },
  {
    patterns: ["go to about", "take me to about", "open about", "navigate about"],
    reply: "Taking you to the About page! 👤",
    nav: "/about",
  },
  {
    patterns: ["go to project", "take me to project", "open project", "navigate project", "show me project"],
    reply: "Taking you to the Projects page! 🚀",
    nav: "/projects",
  },
  {
    patterns: ["go to contact", "take me to contact", "open contact", "navigate contact"],
    reply: "Taking you to the Contact page! 📧",
    nav: "/contact",
  },
  {
    patterns: ["go home", "take me home", "home page", "navigate home"],
    reply: "Taking you to the Home page! 🏠",
    nav: "/",
  },
  {
    patterns: ["hello", "hi", "hey", "sup", "what's up", "howdy"],
    reply: "Hey there! 👋 I'm Samim's portfolio assistant. Ask me about his projects, skills, education, or say 'take me to projects' to navigate!",
  },
  {
    patterns: ["thank", "thanks", "great", "awesome", "nice", "cool"],
    reply: "You're welcome! Let me know if you have any other questions about Samim. 😊",
  },
  {
    patterns: ["bye", "goodbye", "see you", "cya"],
    reply: "Goodbye! Feel free to come back anytime. Have a great day! 👋",
  },
];

const getReply = (input) => {
  const lower = input.toLowerCase().trim();
  for (const rule of rules) {
    if (rule.patterns.some((p) => lower.includes(p))) {
      return { text: rule.reply, nav: rule.nav || null };
    }
  }
  return {
    text: "Hmm, I'm not sure about that. Try asking about Samim's projects, skills, education, or contact info! 🤔",
    nav: null,
  };
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Hey! 👋 I'm Samim's assistant. Ask me about his projects, skills, or say 'take me to projects' to navigate!" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");

    const { text, nav } = getReply(userText);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "model", text },
    ]);
    if (nav) setTimeout(() => navigate(nav), 1000);
  };

  const quickPrompts = [
    "Tell me about Samim",
    "Show me projects",
    "What are his skills?",
    "Take me to contact",
  ];

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={20} className="text-paper" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={20} className="text-paper" /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] flex flex-col glass-card border-paper/20 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-paper/10 bg-paper/5">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Bot size={14} className="text-accent" />
              </div>
              <div>
                <p className="font-body text-sm font-medium text-paper">Samim's Assistant</p>
                <p className="font-mono text-xs text-electric flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse inline-block" />online
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl font-body text-sm leading-relaxed ${
                    m.role === "user" ? "bg-accent text-paper rounded-br-sm" : "bg-paper/10 text-paper/80 rounded-bl-sm"
                  }`}>{m.text}</div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {quickPrompts.map((p) => (
                  <button key={p} onClick={() => setInput(p)}
                    className="font-mono text-xs px-2.5 py-1 rounded-full border border-paper/20 text-paper/50 hover:border-accent/50 hover:text-accent transition-colors">
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-paper/10 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything..."
                className="flex-1 bg-paper/10 rounded-full px-4 py-2 font-body text-sm text-paper placeholder-paper/30 outline-none focus:ring-1 focus:ring-accent/50 border border-paper/10"
              />
              <button onClick={send} disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-accent flex items-center justify-center disabled:opacity-40 hover:bg-accent/80 transition-colors">
                <Send size={14} className="text-paper" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}