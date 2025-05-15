import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Google,
  Facebook,
  Twitter,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Invalid email";
    tempErrors.password =
      formData.password.length >= 6
        ? ""
        : "Password must be at least 6 characters";
    tempErrors.confirmPassword =
      formData.confirmPassword === formData.password
        ? ""
        : "Passwords do not match";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registered:", formData);
      setTimeout(() => {
        window.location.href = "/login"; // Redirect after fake registration
      }, 1000);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ minHeight: "80vh", py: 8 }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Create Account
          </Typography>

          {/* Social Registration */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <IconButton
              fullWidth
              variant="outlined"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                color: "text.primary",
              }}
            >
              <Google />
            </IconButton>
            <IconButton
              fullWidth
              variant="outlined"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                color: "text.primary",
              }}
            >
              <Facebook />
              <Twitter />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }}>OR</Divider>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
            />

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

            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
            >
              Register
            </Button>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{ fontWeight: "bold" }}
                >
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
