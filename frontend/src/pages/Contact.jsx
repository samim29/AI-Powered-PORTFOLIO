import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone, Send, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Opens email client as a simple no-backend approach
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:samimalisk000@gmail.com?subject=${subject}&body=${body}`);
    toast.success("Opening your email client...");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  const contacts = [
    { icon: Mail, label: "Email", val: "samimalisk000@gmail.com", href: "mailto:samimalisk000@gmail.com" },
    { icon: Phone, label: "Phone", val: "+91 7501563483", href: "tel:+917501563483" },
    { icon: Github, label: "GitHub", val: "github.com/samim29", href: "https://github.com/samim29" },
    { icon: Linkedin, label: "LinkedIn", val: "sk-samim-ali", href: "https://linkedin.com/in/sk-samim-ali" },
    { icon: MapPin, label: "Location", val: "West Bengal, India", href: null },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">Say hello</p>
        <h1 className="font-display text-7xl md:text-[10vw] leading-none text-paper">CONTACT</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — contact info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <p className="font-body text-paper/60 leading-relaxed text-lg max-w-md">
            I'm always open to interesting conversations, project collaborations, or new opportunities.
            Drop me a message — I typically respond within 24 hours.
          </p>

          <div className="space-y-3">
            {contacts.map(({ icon: Icon, label, val, href }) => (
              <motion.div
                key={label}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 py-3 border-b border-paper/10 last:border-0"
              >
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-accent" />
                </div>
                <div>
                  <p className="font-mono text-xs text-paper/30">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer"
                      className="font-body text-sm text-paper/70 hover:text-accent transition-colors">
                      {val}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-paper/70">{val}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="glass-card p-6 border-electric/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              <span className="font-mono text-xs text-electric">Available for opportunities</span>
            </div>
            <p className="font-body text-sm text-paper/50">
              Open to internships, freelance projects, and full-time roles starting 2026.
            </p>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Your Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-paper/5 border border-paper/20 rounded-xl px-4 py-3 font-body text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Email Address</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-paper/5 border border-paper/20 rounded-xl px-4 py-3 font-body text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-paper/40 mb-2 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Hey Samim, I'd love to collaborate on..."
                className="w-full bg-paper/5 border border-paper/20 rounded-xl px-4 py-3 font-body text-paper placeholder-paper/30 outline-none focus:border-accent/50 transition-colors resize-none"
              />
            </div>
            <button type="submit" disabled={sending} className="btn-primary w-full flex items-center justify-center gap-2">
              <Send size={15} /> Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
