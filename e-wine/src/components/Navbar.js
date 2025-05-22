import React, { useState } from "react";
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
import { ShoppingCart, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = ({ cartItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Login", path: "/login" },
  ];

  const drawer = (
    <Box sx={{ width: 250, backgroundColor: "#FFFEFC", height: "100%" }}>
      <List>
        {navLinks.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.title}
            sx={{
              fontFamily: "Montserrat",
              color: "#1c1c1c",
              "&:hover": {
                color: "#900639",
              },
            }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: "#FFFEFC",
        color: "#1c1c1c",
        px: { xs: 2, sm: 6 },
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ display: { sm: "none" }, color: "#1c1c1c" }}
        >
          <Menu />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontFamily: "Playfair Display",
            fontWeight: 700,
            textDecoration: "none",
            color: "#1c1c1c",
            flexGrow: 1,
          }}
        >
          Pour Decisions
        </Typography>

        {/* Desktop Nav Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
          {navLinks.map((item) => (
            <Button
              key={item.title}
              component={Link}
              to={item.path}
              sx={{
                fontFamily: "Montserrat",
                color: "#1c1c1c",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#900639",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Cart Icon */}
        <IconButton component={Link} to="/cart" sx={{ color: "#900639" }}>
          <Badge
            badgeContent={cartItems}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#900639",
                color: "white",
                fontFamily: "Montserrat",
                fontSize: "0.75rem",
                fontWeight: 600,
                borderRadius: "50%",
              },
            }}
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
