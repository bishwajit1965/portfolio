# 🚀 Bishwajit Paul | Developer Portfolio

A **modern, full-stack developer portfolio + content platform** showcasing real-world projects, blogs, and system-level features.
Built as a **solo MERN application** with focus on scalability, clean architecture, and production-style implementation.

---

## ✨ Highlights

- 🧑‍💻 **About / Bio section** – professional intro, journey, and milestones
- 🛠️ **Skills & Tech Stack** – structured and categorized tech display
- 📂 **Projects Showcase**
  - 🖼️ Multiple screenshots per project (category-based)
  - 💻 Tech stack per project
  - 🔗 GitHub & Live demo links
  - 🔐 Admin-controlled visibility system
- 📝 **Full Blog Platform**
  - Category & tag-based filtering
  - Blog detail pages with structured content
- 🔖 **Bookmark System** – save & manage favorite blogs
- 📡 **RSS Feed Integration** – external content consumption
- 📢 **Notice System** – admin-controlled announcements
- 🖼️ **Image Uploads** – multiple screenshots with captions
- 📱 **Responsive Design** – mobile, tablet, desktop
- 🌙 **Dark Mode** – user preference toggle
- ⚡ **Smooth UX** – loaders, modals, toasts

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
![Multer](https://img.shields.io/badge/Multer-FF2D20?style=flat-square&logoColor=white)

- **React Query** – server state management & caching

### Authentication

- **JWT Authentication**
  - Access Token + Refresh Token strategy
  - Persistent login & session handling

### System Architecture

- Role-Based Access Control (RBAC)
- Separation of **Public / User / Admin APIs**
- Modular and scalable folder structure

### File Handling

- **Multer** for image uploads
- Planned migration to **cloud/CDN storage**

---

### Others

- REST API architecture
- Modular component structure
- Clean folder organization

---

## 🗂️ Project Structure (Simplified)

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

- Supports **category-wise screenshots** (UI, Dashboard, Mobile)
- Each screenshot includes:
  - Image
  - Caption
  - Category
  - Tech Stack
  - Designed for **scalable project presentation**
  - Clean and scalable presentation for each project

---

## 🧠 Key Design Decisions

- 📂 **Category-based screenshots** → scalable & organized
- 👁️ **Visibility flags for projects** → soft delete / easy control
- 🧑‍💻 **Solo-friendly architecture** → maintainable & extendable
- 🎨 **UI-first mindset** → clarity and polished experience
- 🔄 **Separation of concerns** → maintainable architecture

## 🚀 Future Enhancements

- 🔍 SEO optimization (meta tags, OG tags)
- ⚡ SSR (Server-side rendering) / pre-rendering
- 📊 Analytics integration
- ✉️ Contact form with email service
- ☁️ Cloud image storage (Cloudinary / S3)
- 👥 CMS-style role separation for admin users

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

### Bishwajit Paul

- Built & maintained by a solo developer
- End-to-end design, development, and integration handled independently.
- on real-world application architecture and scalable systems
- This project reflects practical development experience — including debugging, system design, and feature implementation — not tutorial-based code.
