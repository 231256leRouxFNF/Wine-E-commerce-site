// src/components/RegisterForm.js
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import "./RegisterForm.css";

import Wine1 from "../assets/WineBottleAuth1.svg";
import Wine2 from "../assets/WineBottleAuth2.svg";
import Wine3 from "../assets/WineBottleAuth3.svg";
import Wine4 from "../assets/WineBottleAuth4.svg";
import Wine5 from "../assets/WineBottleAuth5.svg";

const wineImages = [Wine1, Wine2, Wine3, Wine4, Wine5];

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Invalid email";
    tempErrors.password =
      formData.password.length >= 6
        ? ""
        : "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

  return (
    <Grid container justifyContent="center" className="registerContainer">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box className="registerBox">
          <Typography variant="h4" className="registerTitle">
            Sign Up
          </Typography>

          {/* 🍷 Label Image Grid */}
          <Box className="wineImageGrid">
            {wineImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Wine Bottle ${index + 1}`}
                className="wineAuthImage"
              />
            ))}
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
              className="registerField"
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
              className="registerField"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              className="registerButton"
            >
              Sign Up
            </Button>

            <Box className="forgotBox">
              <Link
                component={RouterLink}
                to="/forgot-password"
                className="forgotLink"
              >
                Forgot Password?
              </Link>
            </Box>

            <Box className="loginBox">
              <Typography variant="body2" className="loginText">
                Already have an account?{" "}
                <Link component={RouterLink} to="/login" className="loginLink">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
