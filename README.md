# 🚀 Bishwajit.dev | Developer Portfolio

A modern full-stack developer portfolio and content platform showcasing real-world projects, blogs, and system-level features.
Built as a solo MERN application with a focus on scalability, clean architecture, and production-grade implementation.

---

## ✨ Highlights

- 🧑‍💻 About / Bio section – professional intro, journey, and milestones
- 🛠️ Skills & Tech Stack – structured and categorized display
- 📂 Projects Showcase
  - 🖼️ Multiple screenshots per project (category-based)
  - 💻 Tech stack per project
  - 🔗 GitHub & live demo links
  - 🔐 Admin-controlled visibility system
- 📝 Blog Platform
  - Category & tag-based filtering
  - Detailed blog pages with structured content
- 🔖 Bookmark System – save and manage favorite blogs
- 📡 RSS Feed Integration – external content consumption
- 📢 Notice System – admin-controlled announcements
- 🖼️ Image Upload System – multiple screenshots with captions
- 📱 Fully Responsive Design – mobile, tablet, desktop
- 🌙 Dark Mode support
- ⚡ Smooth UX – loaders, modals, toasts

---

## 🧱 Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Icons](https://img.shields.io/badge/React%20Icons-61DAFB?style=flat-square&logo=react&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF2D20?style=flat-square)

- React Query – server state management & caching

### Authentication

- JWT Authentication
  - Access & Refresh token strategy
  - Persistent login system

### System Architecture

- Role-Based Access Control (RBAC)
- Separation of Public / User / Admin APIs
- Modular and scalable folder structure

### File Handling

- Multer for image uploads
- Planned migration to cloud storage (Cloudinary / S3)

---

## 🧪 Project Structure

### Client

client/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ layouts/
│ ├─ hooks/
│ ├─ utils/
│ └─ App.jsx

### Server

server/
├─ controllers/
├─ routes/
├─ uploads/
├─ data/
└─ index.js


---

## 📸 Projects & Screenshots

- Category-based screenshot system (UI / Dashboard / Mobile)
- Each project includes:
  - Images with captions
  - Category tags
  - Tech stack details
  - Clean presentation for scalability

---

## 🧠 Key Design Decisions

- 📂 Category-based screenshots for scalability
- 👁️ Visibility flags for admin control
- 🧑‍💻 Solo-friendly architecture
- 🎨 UI-first development approach
- 🔄 Clean separation of concerns

---

## 🚀 Future Enhancements

- SEO optimization (meta tags, OG tags)
- SSR / pre-rendering
- Analytics integration
- Contact form with email service
- Cloud image storage (Cloudinary / S3)
- Advanced CMS-style admin system

---

## 🧪 How to Run Locally

### Frontend Start

cd client
npm install
npm run dev

### Backend Start

cd server
npm install
node index.js

👤 Author
Bishwajit Paul
Solo full-stack developer
Designed, developed, and deployed end-to-end
Focused on real-world scalable application architecture
Built with production-level thinking, not tutorial-based learning