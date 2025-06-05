import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { ShoppingCart, Menu, Add as AddIcon } from "@mui/icons-material";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

let user = null;
let isAdmin = false;

try {
  const stored = localStorage.getItem("user");
  if (stored) {
    user = JSON.parse(stored);
    isAdmin = user.role === "admin";
  }
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
}

const Navbar = ({ cartItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const drawer = (
    <Box className="navbar-drawer">
      <List>
        {navLinks.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.title} className="navbar-drawer-link">
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem button onClick={isLoggedIn ? handleLogout : () => navigate("/login")} className="navbar-drawer-login">
          {isLoggedIn ? "Logout" : "Login"}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">
        <Typography component={Link} to="/" className="navbar-logo">
          Pour Decisions
        </Typography>

        <Box className="navbar-links">
          {navLinks.map((item) => (
            <Button
              key={item.title}
              component={Link}
              to={item.path}
              className="navbar-link-button"
            >
              {item.title}
            </Button>
          ))}
        </Box>

        <Box className="navbar-actions">
          {isAdmin && (
          <IconButton component={Link} to="/add-product" className="navbar-icon-button">
            <AddIcon />
          </IconButton>
          )}

          <IconButton onClick={() => { setLiked(!liked); navigate("/favourites"); }} className="navbar-icon-button">
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </IconButton>

          <IconButton component={Link} to="/cart" className="navbar-icon-button">
            <Badge badgeContent={cartItems} className="navbar-cart-badge">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <Button
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
            className="navbar-login-button"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Box>

        <IconButton edge="start" onClick={() => setMobileOpen(!mobileOpen)} className="navbar-menu-button">
          <Menu />
        </IconButton>
      </Toolbar>

      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
