# 🧠 Real-Time Collaborative To-Do Board

A web-based real-time collaborative Kanban board built using **MERN Stack** + **Socket.IO**.  
It allows multiple users to log in, create tasks, and manage them live with smart collaboration features.

---

## 🔥 Features

- 👤 **Authentication**
  - Register and Login (JWT + Cookies)
  - Protected routes using `Redux` state and server `checkAuth`
- 📋 **Dashboard**
  - Personalized user dashboard
  - Add new tasks to “To Do” column
- 🧠 **Real-Time Collaboration**
  - WebSocket connection established via **Socket.IO**
  - Real-time UI sync for future task assignment and updates
- 🔁 **Smart Task Assignment (In Progress)**
  - Logic implemented in backend
  - UI work and full feature rollout upcoming
- 🧾 **Activity Log Panel (Planned)**
  - Task assignment, changes, and logs will be shown live

---

## 🛠️ Tech Stack

**Frontend**  
- React (Vite)  
- Redux Toolkit  
- Axios  
- Socket.IO Client  

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT (stored in cookies)  
- Socket.IO Server  

---

## ⚙️ Installation

### Backend:
```bash
cd backend
npm install
npm run dev
