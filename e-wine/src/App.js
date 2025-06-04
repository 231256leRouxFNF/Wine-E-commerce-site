// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import About from "./pages/About";
import Offerings from "./components/Offerings";
import Testimonials from "./components/Testimonials";
import Favourites from "./pages/Favourites"; 

import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/favourites" element={<Favourites />} />{" "}
          {/* ✅ New route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
