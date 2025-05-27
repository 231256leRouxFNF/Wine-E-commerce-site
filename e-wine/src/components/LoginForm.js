// src/components/LoginForm.js
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
import "./LoginForm.css";

const LoginForm = () => {
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
    <Grid container justifyContent="center" className="loginContainer">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box className="loginBox">
          <Typography variant="h4" className="loginTitle">
            Sign In
          </Typography>

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
              className="loginField"
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
              className="loginField"
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
              className="loginButton"
            >
              Sign In
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

            <Box className="createBox">
              <Typography variant="body2" className="createText">
                Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                  className="createLink"
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
