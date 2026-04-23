import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Cursor from "./components/common/Cursor";
import Chatbot from "./components/chatbot/Chatbot";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Cursor />
        <Navbar />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: "#1a1a22",
              color: "#f5f0e8",
              border: "0.5px solid rgba(245,240,232,0.1)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
            },
          }}
        />
        <Chatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
