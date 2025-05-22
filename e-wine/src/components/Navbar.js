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
    <Box sx={{ width: 250, backgroundColor: "#900639", height: "100%" }}>
      <List>
        {navLinks.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.title}
            sx={{
              fontFamily: "Montserrat",
              color: "#FFFFFF",
              "&:hover": {
                color: "#FFFEFC",
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
        backgroundColor: "#900639",
        color: "#FFFFFF",
        px: { xs: 2, sm: 6 },
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ display: { sm: "none" }, color: "#FFFFFF" }}
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
            color: "#FFFFFF",
            flexGrow: 1,
            px: 2,
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
                color: "#FFFFFF",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#FFFEFC",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Cart Icon */}
        <IconButton component={Link} to="/cart" sx={{ color: "#FFFFFF" }}>
          <Badge
            badgeContent={cartItems}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#FFFEFC",
                color: "#900639",
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
