# 🍷 E-Wine: Boutique Wine E-Commerce Platform

E-Wine is a full-stack MERN application that showcases boutique wines. Users can browse collections, maintain a cart, save favourites, and manage products if they are admins. Login uses a memorable label sequence for added security.

---

## 🎯 Purpose

This project aims to deliver a modern, secure wine-shopping experience that:

- Dynamically displays wines stored in MongoDB
- Allows admins to add and remove wines through a dedicated interface
- Adds a creative layer of authentication using selectable wine labels

---

## 🔐 Authentication System

During registration, users select **3–5 labels** from six wine bottle icons. The same sequence must be provided at login along with the password. This simple image-based step acts as a lightweight form of two-factor authentication.

---

## 🚀 Running Locally

### 📦 Prerequisites

- Node.js (v18 LTS recommended)
- MongoDB instance (Atlas or local)
- npm

### 🛠 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/e-wine.git
   cd e-wine
   ```
2. **Install backend dependencies**
   ```bash
   cd e-wine-server
   npm install
   ```
3. **Create `.env` inside `e-wine-server/`**
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5050
   ```
4. **Install frontend dependencies**
   ```bash
   cd ../e-wine
   npm install
   ```

### 💻 Start the app

Start the backend:
```bash
cd ../e-wine-server
npm run dev
```

In a new terminal, start the frontend:
```bash
cd ../e-wine
npm start
```
Then visit [http://localhost:3000](http://localhost:3000)

---

## ✨ Features

- Age verification overlay before accessing the site
- Registration with password and label-sequence authentication
- Secure password hashing via `bcrypt`
- Add/remove wines through an admin-only page
- Shopping cart with persistent storage for guests and logged-in users
- Favourite wines list stored per user
- Mock checkout page for payment demonstration
- Responsive UI built with Material UI and Bootstrap

---

## 📁 Project Structure (simplified)

```
root/
├── e-wine/          # React frontend
│   └── src/         # Components, pages and context
├── e-wine-server/   # Express backend
│   ├── models/      # Mongoose schemas
│   ├── routes/      # REST API endpoints
│   └── server.js    # Entry point
```

---

## 🧠 Future Improvements

- Replace mock checkout with real Stripe integration
- JWT-based sessions
- Order history tracking
- Rich admin dashboard

---

## 📝 License

MIT License – use freely and modify respectfully.