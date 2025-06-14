import React, { useState, useContext } from "react";
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
import Favourites from "./../pages/Favourites";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FavouritesContext } from "../context/FavouritesContext";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Add this line
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);
  const liked = favourites.length > 0;

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
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
        <ListItem
          button
          component={Link}
          to="/login"
          sx={{
            fontFamily: "Montserrat",
            color: "#900639",
            fontWeight: 600,
            border: "2px solid #900639",
            borderRadius: "999px",
            mt: 2,
            mx: 2,
            justifyContent: "center",
            height: 36,
            "&:hover": {
              backgroundColor: "#90063910",
            },
          }}
        >
          Login
        </ListItem>
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
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
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
            pl: 3,
          }}
        >
          Pour Decisions
        </Typography>

        {/* Center Nav Links */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: 2,
            justifyContent: "center",
            flexGrow: 1,
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
                fontWeight: 500,
                fontSize: "0.875rem",
                textTransform: "none",
                border: "2px solid transparent",
                borderRadius: "999px",
                px: 2.5,
                py: 0.25,
                height: 36,
                minWidth: "auto",
                "&:hover": {
                  border: "2px solid #900639",
                  backgroundColor: "#ffffff",
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>

        {/* Action Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, pr: 3 }}>
          {/* Add Product Icon (admin only) */}
          {user?.role === 'admin' && (
            <IconButton
              component={Link}
              to="/add-product"
              sx={{
                color: "#900639",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          )}

          {/* Heart Icon */}
          <IconButton
            onClick={() => {
              navigate("/favourites");
            }}
            sx={{
              color: liked ? "#900639" : "#900639",
              fontSize: "22px",
              padding: "4px",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.2)",
                color: "#600022",
              },
            }}
            aria-label="wishlist"
          >
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </IconButton>

          {/* Cart Icon */}
          <IconButton component={Link} to="/cart" sx={{ color: "#900639" }}>
            <Badge
              badgeContent={cartItems.length}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#900639",
                  color: "#fff",
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

          {/* Login/Logout Button */}
          {user ? (
            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
              variant="contained"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: "#900639",
                borderRadius: "999px",
                px: 2.5,
                py: 0.25,
                height: 36,
                fontSize: "0.875rem",
                "&:hover": {
                  backgroundColor: "#6d002e",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: "#900639",
                borderRadius: "999px",
                px: 2.5,
                py: 0.25,
                height: 36,
                fontSize: "0.875rem",
                "&:hover": {
                  backgroundColor: "#6d002e",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <IconButton
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ display: { sm: "none" }, color: "#1c1c1c", ml: 2 }}
        >
          <Menu />
        </IconButton>
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
