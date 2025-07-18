import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AgeGate from "./components/AgeGate";

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
import Contact from "./pages/Contact";
import CheckoutPage from "./pages/CheckoutPage";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import ProtectedRoute from "./components/ProtectedRoute";


import theme from "./theme";

function App() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  if (!ageConfirmed) {
    return <AgeGate onConfirm={() => setAgeConfirmed(true)} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
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
          <Route
            path="/add-product"
            element={
              <ProtectedRoute role="admin">
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer />
        </Router>
          </FavouritesProvider>
      </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
