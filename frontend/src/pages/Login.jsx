import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(password);
      toast.success("Welcome back, Samim! 👋");
      navigate("/admin");
    } catch {
      toast.error("Wrong password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-electric/10 border border-electric/20 flex items-center justify-center mx-auto mb-6">
            <Lock size={20} className="text-electric" />
          </div>
          <h1 className="font-display text-4xl text-paper mb-2">ADMIN LOGIN</h1>
          <p className="font-mono text-xs text-paper/30">This area is only for Samim</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-paper/5 border border-paper/20 rounded-xl px-4 py-3 pr-12 font-mono text-sm text-paper placeholder-paper/30 outline-none focus:border-electric/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/30 hover:text-paper/60 transition-colors"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-electric/20 border border-electric/30 text-electric font-body font-medium rounded-xl hover:bg-electric/30 transition-all disabled:opacity-40"
          >
            {loading ? "Verifying..." : "Enter Admin Panel"}
          </button>
        </form>

        <p className="text-center font-mono text-xs text-paper/20 mt-6">
          Not Samim? <a href="/" className="text-paper/40 hover:text-paper/60">Go home</a>
        </p>
      </motion.div>
    </div>
  );
}
