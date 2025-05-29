# 🍷 E-Wine: Boutique Wine E-Commerce Platform

E-Wine is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce website designed for wine enthusiasts and boutique retailers. It enables users to browse curated wine collections, register securely, and experience a creative two-factor authentication method during login.

---

## 🎯 Purpose

The goal of this project is to create a modern, secure, and visually appealing wine shopping experience that:

- Showcases product cards dynamically pulled from a MongoDB database
- Enables product management through an admin interface
- Provides a unique authentication experience beyond traditional username/password login

---

## 🔐 Creative Authentication System

E-Wine uses a **two-level authentication mechanism**:

1. **Standard Login Credentials**  
   Users register with their name, email, and password.

2. **Card-Based Security Grid**  
   During registration, users choose a 3-card sequence from a 3x3 grid labeled (A1–C3).  
   During login, users must correctly enter this sequence as their second layer of identity verification.

✅ This method introduces a memorable, visual, and fun twist on 2FA without requiring external devices.

---

## 🚀 How to Run the Project Locally

### 📦 Prerequisites

- Node.js (v18 LTS or compatible)
- MongoDB (Atlas or local)
- npm

---

### 🛠 Installation Steps

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/e-wine.git
cd e-wine
```

2. **Install Backend Dependencies**

```bash
cd e-wine-server
npm install
```

3. **Set Up Environment Variables**

Create a `.env` file in `e-wine-server/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4. **Install Frontend Dependencies**

```bash
cd ../e-wine
npm install
```

---

### 💻 Running the Project

**Start Backend Server**

```bash
cd ../e-wine-server
npm run dev
```

**Start Frontend React App**

```bash
cd ../e-wine
npm start
```

Access the site at:  
[http://localhost:3000](http://localhost:3000)

---

## ✨ Features

- User registration with two-factor authentication (card grid)
- Secure password storage using `bcrypt`
- Add products via admin panel
- Fetch/display wines dynamically from MongoDB
- Clean, responsive UI using Material UI and custom CSS
- Image upload support for new wines

---

## 📁 Folder Structure (Simplified)

```
e-wine/
├── client/             # React frontend
├── e-wine-server/      # Express backend
│   ├── routes/         # API endpoints
│   ├── models/         # Mongoose schemas
│   └── server.js       # Entry point
```

---

## 🧠 Future Improvements

- JWT-based login tokens
- Full admin dashboard
- Order history & cart system
- Stripe payment integration

---

## 📝 License

MIT License – use freely, modify respectfully.
