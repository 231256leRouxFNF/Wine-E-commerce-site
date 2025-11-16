# 🍷 Pour Decisions – Boutique Wine E-Commerce Platform

<img width="2880" height="1620" alt="Pour Decisions Screenshot" src="https://github.com/user-attachments/assets/1ef72586-1077-4445-ab9a-dfe82329ad1b" />

> A full-stack MERN wine store with a creative two-level authentication system and dynamic product management.

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-3C873A?logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Express-000000?logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/UI-Material%20UI-007FFF?logo=mui&logoColor=white" />
  <img src="https://img.shields.io/badge/Carousel-react--slick-CC0000" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## 2.1 Project Header

### Project title block

- **Name:** Pour Decisions – Boutique Wine E-Commerce Platform  
- **Type of digital solution:** Full stack MERN e-commerce website  
- **Primary purpose:** Provide a modern, secure, and visually engaging way to browse and manage boutique wines online  
- **Authors:** Keagan Boucher, Anika de Beer, Francois le Roux  

### Table of contents

1. [2.1 Project Header](#21-project-header)  
2. [2.2 About The Project](#22-about-the-project)  
3. [2.3 Getting Started](#23-getting-started)  
4. [2.4 Project Features](#24-project-features)  
5. [2.4 Development Process](#24-development-process)  
6. [2.5 Final Outcome](#25-final-outcome)  
7. [2.6 Conclusion](#26-conclusion)  
8. [2.7 Footer](#27-footer)

---

## 2.2 About The Project

### Short project description

**Pour Decisions** is a boutique wine e-commerce platform built as a MERN (MongoDB, Express, React, Node.js) application. It allows users to explore curated wine collections, sign up with secure credentials, and log in using a memorable **card-based second factor**. Administrators can add wines to the catalogue, manage product details, and control what appears on the storefront.

The core goal of the project is to combine standard e-commerce patterns with a more creative and user-friendly take on two-factor authentication, while keeping the interface clean, responsive, and visually aligned with a premium wine brand.

### Built with

- **React** – user interface and component-based front-end  
- **React Router DOM** – client-side routing and navigation  
- **Material UI (MUI)** – UI components and layout styling  
- **React Slick / Slick Carousel** – hero sliders and product carousels  
- **Axios** – HTTP client for API requests  
- **Node.js & Express** – backend server and REST API  
- **MongoDB + Mongoose** – database and schema modelling  
- **bcrypt** – password hashing for secure user credentials  

---

## 2.3 Getting Started

This section explains how to clone and run the project locally.

### Prerequisites

- Node.js (v18 LTS or compatible)  
- npm (comes with Node)  
- MongoDB (local instance or MongoDB Atlas connection string)  

### How to install

1. **Clone the repository**

   ```bash
   git clone https://github.com/231256leRouxFNF/Wine-E-commerce-site.git
   cd Wine-E-commerce-site
   ```

2. **Install backend dependencies**

   ```bash
   cd e-wine-server
   npm install
   ```

3. **Set up backend environment variables**

   Create a `.env` file in `e-wine-server/`:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Install frontend dependencies**

   ```bash
   cd ../e-wine
   npm install
   ```

5. **Install additional frontend packages (if not already installed)**

   ```bash
   npm install axios
   npm install react-router-dom
   npm install @mui/material @emotion/react @emotion/styled
   npm install react-slick slick-carousel
   ```

6. **Import Slick Carousel styles**

   In your `index.js` or `App.js`, import the Slick styles:

   ```js
   import "slick-carousel/slick/slick.css";
   import "slick-carousel/slick/slick-theme.css";
   ```

### Running the project

1. **Start the backend server**

   ```bash
   cd ../e-wine-server
   npm run dev
   ```

2. **Start the frontend React app**

   ```bash
   cd ../e-wine
   npm start
   ```

3. **Open the app**

   Visit:

   ```text
   http://localhost:3000
   ```

---

## 2.4 Project Features

### Main features and functionality

#### Creative authentication system

- Standard user registration with **name, email, and password**.  
- Passwords are securely hashed using `bcrypt` before being stored in MongoDB.  
- During registration, users choose a **3-card sequence** from a 3x3 grid labelled `A1`–`C3`.  
- During login, users must re-enter this exact sequence as a second layer of verification.  
- This card grid acts as a visual, easy-to-remember second factor without needing SMS codes or authenticator apps.

#### Wine catalogue and product display

- Dynamic wine listings fetched from MongoDB using Express routes.  
- Product cards show key information such as name, price, and short description.  
- Wine images are displayed in a clean, responsive layout suitable for desktop and smaller screens.  
- Carousel/slider sections implemented with **react-slick** to highlight featured wines or promotions.

#### Admin product management

- Admin interface (route-protected) for adding new wines.  
- Support for storing product details such as name, price, region, grape varietal, and image URL.  
- New wines added via the admin panel appear dynamically on the front-end.

#### General platform behaviour

- Navigation built with React Router DOM for a smooth SPA experience.  
- Reusable React components for headers, footers, product cards, and forms.  
- Frontend and backend communicate via a REST API layer built in Express.

<img width="1802" height="1618" alt="Frame 14" src="https://github.com/user-attachments/assets/cdf41236-fcae-408e-a149-977ab08035e4" />

### Future improvements

Potential extensions for a more complete e-commerce experience:

- JWT-based login tokens and role management (user vs admin).  
- Shopping cart, checkout flow, and order history.  
- Payment integration (e.g. Stripe) to support real transactions.  
- Additional filtering and search by price, region, or wine style.

---

## 2.4 Development Process

This section outlines key design and technical decisions made during development.

### Architecture overview

The project follows a standard **MERN stack** split between client and server:

- **Frontend (`e-wine/`):** React application, UI components, routes, and Axios calls.  
- **Backend (`e-wine-server/`):** Express server that exposes API routes for users and wines.  
- **Database:** MongoDB database accessed via Mongoose models.

The separation of client and server makes it easier to scale and potentially host them on different platforms in the future.

### Data and models

- **User model:** Stores user details, bcrypt-hashed password, and card-based grid sequence for second-factor verification.  
- **Product/Wine model:** Stores name, price, description, category/region, and image reference.  

Mongoose is used to define schemas and enforce structure on MongoDB collections.

### Authentication and security

- Passwords are never stored in plain text.  
- Bcrypt is used to hash passwords before they are saved.  
- The **card-based grid** acts as a second verification step, making it harder for an attacker to log in with only the email and password.  
- Environment variables (`MONGO_URI`, `PORT`) are kept in `.env` to avoid committing secrets.

### Frontend implementation

- Material UI provides consistent, accessible components that help maintain a professional visual style.  
- React Slick handles carousel behaviour for featured wines and promotions.  
- Axios abstracts API calls, keeping service logic separate from UI components.  

### Folder structure (simplified)

```bash
Wine-E-commerce-site/
├── e-wine/           # React frontend
└── e-wine-server/    # Express backend
    ├── routes/       # API endpoints
    ├── models/       # Mongoose schemas
    └── server.js     # Entry point
```

---

## 2.5 Final Outcome

This project delivers a functioning prototype of a boutique wine e-commerce site with a distinctive authentication concept. It demonstrates:

- A working MERN stack setup.  
- A creative, visual second-factor login experience.  
- Dynamic product management and front-end display.

If a live deployment or demo video is created, it can be linked here for future reference:

- _Video walkthrough:_ `Add when available`  

---

## 2.6 Conclusion

**Pour Decisions** explores how a standard e-commerce pattern can be made more engaging and secure through creative interaction design. The card-based authentication grid turns a typically invisible security step into something more playful and memorable, while still grounding the experience in best practices like password hashing and structured data storage.

From a development perspective, the project strengthened understanding of:

- Coordinating a MERN stack across a **group project**.  
- Designing and implementing a custom two-step authentication flow.  
- Structuring React, Express, and MongoDB to support future features like carts and orders.

With more time, the next steps would include integrating secure payments, adding richer admin analytics, and expanding user flows (favourites, reviews, and personalised recommendations).

---

## 2.7 Footer

### License

This project is licensed under the **MIT License**.  
See the `LICENSE` file in this repository for the full license text and usage terms.

### Authors

- **Keagan Boucher** 
- **Anika de Beer**  
- **Francois le Roux** 

### Acknowledgements

- MongoDB, Express, React, and Node.js communities for documentation and examples.  
- Material UI and React Slick for enabling a polished front-end experience.  
- Lecturers and peers who provided feedback and guidance during the project.
