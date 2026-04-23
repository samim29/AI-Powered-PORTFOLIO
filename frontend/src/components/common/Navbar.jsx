import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-ink/80 backdrop-blur-xl border-b border-paper/5" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl tracking-widest text-paper hover:text-accent transition-colors">
          SA<span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm tracking-wide transition-all duration-300 relative group ${
                location.pathname === link.to ? "text-accent" : "text-paper/60 hover:text-paper"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
          {isAdmin && (
            <>
              <Link to="/admin" className="font-mono text-xs text-electric border border-electric/30 px-3 py-1.5 rounded-full hover:bg-electric/10 transition-colors">
                Admin
              </Link>
              <button onClick={logout} className="font-mono text-xs text-paper/40 hover:text-paper/70 transition-colors">
                logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-6 h-px bg-paper" />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-px bg-paper" />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-paper" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ink/95 backdrop-blur-xl border-t border-paper/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body text-lg ${location.pathname === link.to ? "text-accent" : "text-paper/70"}`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" className="font-mono text-sm text-electric">Admin Panel</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
