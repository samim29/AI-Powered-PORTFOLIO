import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const BASE = import.meta.env.VITE_API_URL || "";

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("portfolio_token");
    if (token) {
      axios
        .get(`${BASE}/api/auth/verify`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setIsAdmin(res.data.valid))
        .catch(() => localStorage.removeItem("portfolio_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (password) => {
    const res = await axios.post(`${BASE}/api/auth/login`, { password });
    localStorage.setItem("portfolio_token", res.data.token);
    setIsAdmin(true);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("portfolio_token");
    setIsAdmin(false);
  };

  const getToken = () => localStorage.getItem("portfolio_token");

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);