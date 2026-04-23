import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, message: "Welcome back, Samim!" });
});

router.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ valid: false });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

export default router;
