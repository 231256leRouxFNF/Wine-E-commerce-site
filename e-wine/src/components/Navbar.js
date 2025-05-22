// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../src/assets/Winelogo.png";
import { ShoppingCart } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";

const Navbar = ({ cartItems = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo */}
        <img src={logo} alt="Pour Decisions Logo" className={styles.logo} />

        {/* Hamburger Icon */}
        <div
          className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
          <Link
            to="/"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/login"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/cart"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}
          >
            <IconButton sx={{ color: "#900639" }}>
              <Badge
                badgeContent={cartItems}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#900639",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    borderRadius: "50%",
                  },
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </nav>

      {/* Content shift when menu is open */}
      <div className={isOpen ? styles.contentShift : ""}></div>
    </>
  );
};

export default Navbar;
