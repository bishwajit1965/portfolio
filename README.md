# 🚀 Developer Portfolio

A modern, responsive developer portfolio built to showcase projects, skills, and real-world development experience.
Designed and developed as a **solo full-stack project** with focus on clean UI, structured data, and scalable architecture.

---

## ✨ Features

- 🧑‍💻 About / Bio section
- 🛠️ Skills & Tech Stack display
- 📂 Projects with:
  - Multiple screenshots (category-based)
  - Tech stack listing
  - GitHub & Live links
- 🔐 Admin panel for managing content
- 🖼️ Image upload support (projects & screenshots)
- 👁️ Visibility control (show / hide projects)
- 📱 Fully responsive UI
- 🌙 Dark mode support
- ⚡ Smooth UX with loading states & toasts

---

## 🧱 Tech Stack

### Frontend

- React
- Tailwind CSS
- Vite
- React Icons
- Axios

### Backend

- Node.js
- Express
- File-based storage (JSON)
- Multer (image uploads)

### Others

- REST API architecture
- Modular component structure
- Clean folder organization

---

## 🗂️ Project Structure (Simplified)

client/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ layouts/
│ ├─ hooks/
│ ├─ utils/
│ └─ App.jsx

server/
├─ controllers/
├─ routes/
├─ uploads/
├─ data/
└─ index.js

---

## 📸 Project Screenshots Handling

Projects support **multiple screenshots grouped by category**, for example:

- UI Screens
- Dashboard
- Mobile View

Each screenshot includes:

- Image
- Caption
- Category grouping

This allows scalable and clean project presentation.

---

## 🧠 Key Design Decisions

- **Category-based screenshots** instead of flat arrays
  → Keeps projects organized and future-proof
- **Visibility flags** for projects
  → No hard delete needed
- **Solo-friendly architecture**
  → Easy to maintain, extend, and debug
- **UI-first mindset**
  → Portfolio prioritizes clarity and presentation

---

## 🚧 Known Improvements (Future Scope)

- SEO optimization with meta tags
- Server-side rendering / pre-rendering
- Analytics integration
- Contact form with email service
- CMS-style role separation

---

## 🧪 How to Run Locally

### Frontend

cd client
npm install
npm run dev

### Backend

cd server
npm install
node index.js

👤 Author

Bishwajit Paul

Built & maintained by a solo developer
End-to-end design, development, and integration handled independently.

This portfolio reflects real project experience, not tutorial code.
