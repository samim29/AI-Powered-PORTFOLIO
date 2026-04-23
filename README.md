# Sk Samim Ali — Portfolio (MERN Stack)

A dark, brutalist, editorial-style portfolio built with MongoDB, Express.js, React.js, and Node.js.

## ✨ Features

- **Multi-page React app** — Home, About, Projects, Contact, Admin
- **Rule-based Chatbot** — Instant responses, no API needed, works offline
- **Admin Panel** — Password-protected, secret URL only you know
- **Project Cards** — Upload photo, title, description, GitHub, Live URL, Video URL
- **Cloudinary image uploads** — Images stored in the cloud
- **Framer Motion animations** — Smooth transitions and micro-interactions
- **Custom cursor** — Orange dot + ring cursor with hover effects
- **Dark brutalist design** — Bebas Neue + DM Sans, orange accent, noise texture

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account (free tier is fine)

---

### 1. Enter the project

```bash
cd samim-portfolio/portfolio
```

---

### 2. Set up environment files

**Backend** — create `backend/.env` (copy from `backend/.env.example`):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=any_random_long_string_here
ADMIN_PASSWORD=your_chosen_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

**Frontend** — create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` files to GitHub — they are already in `.gitignore`

---

### 3. Get Cloudinary credentials (free)

1. Sign up at https://cloudinary.com
2. Go to Dashboard → copy Cloud Name, API Key, API Secret
3. Paste into `backend/.env`

---

### 4. Install dependencies

```bash
# From root portfolio/ folder

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

---

### 5. Run the app locally

Open **2 terminals**:

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# Runs on http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

### 6. Access your portfolio

| URL | Purpose |
|-----|---------|
| `http://localhost:5173` | Portfolio (public) |
| `http://localhost:5173/login` | Admin panel — secret URL, don't share! |
| `http://localhost:5000/api/health` | Backend health check |

**Admin password** = whatever you set as `ADMIN_PASSWORD` in `backend/.env`

> 🔒 The admin login is intentionally hidden — no link on the site. Only you know the URL.

---

## 📁 Project Structure

```
portfolio/
├── .gitignore
├── package.json
│
├── backend/
│   ├── middleware/
│   │   ├── auth.js               # JWT protect middleware
│   │   └── cloudinary.js         # Multer + Cloudinary storage
│   ├── models/
│   │   └── Project.js            # MongoDB schema
│   ├── routes/
│   │   ├── auth.js               # Login + JWT verify
│   │   └── projects.js           # CRUD + image upload
│   ├── server.js                 # Express entry point
│   ├── .env                      # Your secrets (create this, never commit)
│   └── .env.example              # Template
│
└── frontend/
    ├── .env                      # Frontend env (create this, never commit)
    └── src/
        ├── components/
        │   ├── admin/
        │   │   └── ProjectForm.jsx   # Add/edit project modal (admin only)
        │   ├── chatbot/
        │   │   └── Chatbot.jsx       # Rule-based chatbot (no API needed)
        │   ├── common/
        │   │   ├── Cursor.jsx        # Custom animated cursor
        │   │   └── Navbar.jsx        # Navigation bar
        │   └── sections/
        │       ├── Hero.jsx          # Landing hero section
        │       ├── ProjectCard.jsx   # Project card component
        │       └── Skills.jsx        # Skills grid section
        ├── context/
        │   └── AuthContext.jsx       # Admin auth state
        ├── pages/
        │   ├── About.jsx             # About page with timeline
        │   ├── Admin.jsx             # Admin dashboard
        │   ├── Contact.jsx           # Contact form
        │   ├── Home.jsx              # Home page
        │   ├── Login.jsx             # Admin login (secret URL)
        │   ├── ProjectDetail.jsx     # Single project view
        │   └── Projects.jsx          # All projects with filters
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` (ink) |
| Text | `#f5f0e8` (paper) |
| Accent | `#ff4d00` (orange-red) |
| Admin | `#00ff88` (electric green) |
| Display font | Bebas Neue |
| Body font | DM Sans |
| Mono font | JetBrains Mono |

---

## 🤖 Chatbot

The chatbot is **fully rule-based** — no API, no rate limits, no cost, works offline.

It understands questions about:
- Samim's background, education, CGPA
- Projects (Wanderlust, Conversa, Lung Cancer Prediction)
- Skills and tech stack
- Achievements and certifications
- Contact info
- Navigation commands ("take me to projects", "go to contact")

To add more responses, edit the `rules` array in `frontend/src/components/chatbot/Chatbot.jsx`.

---

## 🔒 Admin Panel

Access at `/login` — **secret URL, no link on the public site**.

**Features:**
- View all projects in a dashboard table
- Add new project with image upload, tech stack tags, GitHub/Live/Video URLs
- Edit existing projects
- Toggle featured status (featured projects appear on Home page)
- Set display order
- Delete projects (also removes image from Cloudinary)

**Admin password** is set in `backend/.env` as `ADMIN_PASSWORD`.

---

## 🚢 Deployment

### Frontend → Netlify (recommended, free)

1. Push project to GitHub
2. Connect repo to Netlify
3. Set build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. No environment variables needed for frontend (chatbot has no API)
5. Deploy!

### Backend → Render (free tier)

1. Create new Web Service at https://render.com
2. Point to the `backend/` folder
3. Add all `backend/.env` variables in Render dashboard:
   - `MONGO_URI`, `JWT_SECRET`, `ADMIN_PASSWORD`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `CLIENT_URL` = your Netlify site URL
4. Deploy

### Database → MongoDB Atlas (free)

1. Create free cluster at https://cloud.mongodb.com
2. Get connection string
3. Replace `MONGO_URI` in backend env variables

### Images → Cloudinary (free)

Free tier: 25GB storage — more than enough for a portfolio.

---

## 📧 Contact Form

Opens the user's email client via `mailto:` — no backend needed.

---

## ⚠️ Common Issues

| Problem | Fix |
|---------|-----|
| `/api/projects` 500 error | Check MongoDB is running and `backend/.env` exists |
| Admin login fails | Check `ADMIN_PASSWORD` in `backend/.env` |
| Images not uploading | Check Cloudinary credentials in `backend/.env` |
| Page not found on refresh (Netlify) | Add `_redirects` file in `frontend/public`: `/* /index.html 200` |
| CORS error | Check `CLIENT_URL` in `backend/.env` matches your frontend URL |

---

Built with ❤️ by Sk Samim Ali.