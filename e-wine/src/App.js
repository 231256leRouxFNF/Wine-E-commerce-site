// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Products from './pages/Products';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';  // Added this import
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';

import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />  {/* Add this route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;