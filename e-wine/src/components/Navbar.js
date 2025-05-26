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
import { ShoppingCart, Menu, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = ({ cartItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const drawer = (
    <Box sx={{ width: 250, backgroundColor: "#FFFEFC", height: "100%" }}>
      <List>
        {[...navLinks, { title: "Login", path: "/login" }].map((item) => (
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
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left: Logo */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontFamily: "Playfair Display",
              fontWeight: 700,
              textDecoration: "none",
              color: "#1c1c1c",
            }}
          >
            Pour Decisions
          </Typography>
        </Box>

        {/* Center: Nav Links */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            gap: 2,
            flex: 1,
          }}
        >
          {navLinks.map((item) => (
            <Button
              key={item.title}
              component={Link}
              to={item.path}
              sx={{
                fontFamily: "Montserrat",
                color: "#900639",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "999px",
                px: 3,
                height: "36px",
                border: "2px solid transparent", // Always keep 2px border width
                backgroundColor: "transparent",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  border: "2px solid #900639", // Same width, now colored
                  backgroundColor: "#ffffff",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Right: Login + Heart + Cart */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { sm: "none" }, color: "#1c1c1c" }}
          >
            <Menu />
          </IconButton>

          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{
              backgroundColor: "#900639",
              color: "#ffffff",
              fontFamily: "Montserrat",
              fontWeight: 600,
              textTransform: "none",
              px: 2.5,
              height: "36px",
              borderRadius: "999px",
              "&:hover": {
                backgroundColor: "#600022",
              },
            }}
          >
            Login
          </Button>

          <IconButton component={Link} to="/wishlist" sx={{ color: "#900639" }}>
            <Badge
              badgeContent={0}
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
              <FavoriteBorder />
            </Badge>
          </IconButton>

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
        </Box>
      </Toolbar>

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
