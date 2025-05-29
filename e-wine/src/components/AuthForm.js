// src/components/AuthForm.js
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Avatar,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LockResetIcon from "@mui/icons-material/LockReset";

// Wine bottle SVG illustrations
import Wine1 from "../assets/WineBottleAuth1.svg";
import Wine2 from "../assets/WineBottleAuth2.svg";
import Wine3 from "../assets/WineBottleAuth3.svg";
import Wine4 from "../assets/WineBottleAuth4.svg";
import Wine5 from "../assets/WineBottleAuth5.svg";
import Wine6 from "../assets/WineBottleAuth6.svg";

const wineLabels = [
  { id: 1, name: "Vintage Red", img: Wine1 },
  { id: 2, name: "Sunset Valley", img: Wine2 },
  { id: 3, name: "Moonlight Blend", img: Wine3 },
  { id: 4, name: "Royal Reserve", img: Wine4 },
  { id: 5, name: "Golden Harvest", img: Wine5 },
  { id: 6, name: "Ancient Roots", img: Wine6 },
];

// Hash function using SHA-256
async function hashSequence(email, sequence) {
  const data = email + ":" + sequence.join("-");
  const encoder = new TextEncoder();
  const hashBuffer = await window.crypto.subtle.digest(
    "SHA-256",
    encoder.encode(data)
  );
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const AuthForm = ({ mode = "login" }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSequence, setSelectedSequence] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateEmail(email)) {
      setError(
        "Please enter a valid email from a supported provider (gmail, outlook, mweb, etc.)"
      );
      setLoading(false);
      return;
    }

    if (
      mode === "register" &&
      (selectedSequence.length < 3 || selectedSequence.length > 5)
    ) {
      setError("Please select 3 to 5 labels");
      setLoading(false);
      return;
    }

    if (mode === "login" && selectedSequence.length < 1) {
      setError("Please select your label sequence");
      setLoading(false);
      return;
    }

    const hash = await hashSequence(email.toLowerCase(), selectedSequence);

  if (mode === "register") {
    try {
      await axios.post("/api/register", {
        name,
        surname,
        email,
        password,
        labelSequence: selectedSequence,
      });
      console.log("✅ Registered successfully");
      setLoading(false);
      window.location.href = "/login";
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setLoading(false);
    }
} else {
  try {
    const res = await axios.post("/api/login", {
      email
    });
    console.log("✅ Login successful:", res.data);
    setLoading(false);

    // ✅ Move this inside the try block
    window.location.href = "/";
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Login failed. Please check your credentials."
    );
    setLoading(false);
  }
}
  
};

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const approvedDomains = [
      "gmail.com",
      "outlook.com",
      "mweb.co.za",
      "yahoo.com",
      "icloud.com",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return pattern.test(email) && approvedDomains.includes(domain);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <LockResetIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4" sx={{ mt: 1 }}>
            {mode === "register" ? "Create Account" : "Welcome Back"}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          {mode === "register" && (
            <>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Surname"
                variant="outlined"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
            </>
          )}

          <Typography variant="h6" sx={{ mb: 2 }}>
            {mode === "register"
              ? "Create your label sequence (3-5 labels)"
              : "Select your label sequence"}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            {wineLabels.map((label) => (
              <Grid item xs={4} key={label.id}>
                <IconButton
                  onClick={() => {
                    if (selectedSequence.includes(label.id)) {
                      setSelectedSequence(
                        selectedSequence.filter((id) => id !== label.id)
                      );
                    } else if (selectedSequence.length < 5) {
                      setSelectedSequence([...selectedSequence, label.id]);
                    }
                  }}
                  sx={{
                    p: 1,
                    border: selectedSequence.includes(label.id)
                      ? "3px solid #900639"
                      : "none",
                    borderRadius: 2,
                    width: "100%",
                    height: "100%",
                    opacity: selectedSequence.includes(label.id) ? 0.5 : 1,
                    transition: "transform 0.2s ease, border 0.2s ease",
                    "&:hover": {
                      transform: "rotate(-5deg) scale(1.05)",
                    },
                  }}
                >
                  <Avatar
                    src={label.img}
                    alt={label.name}
                    variant="square"
                    sx={{
                      width: "100%",
                      height: 100,
                      borderRadius: 2,
                      backgroundColor: "transparent",
                      objectFit: "contain",
                    }}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => setSelectedSequence([])}
            sx={{ mb: 2 }}
          >
            Clear Selection
          </Button>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{ mb: 2 }}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "register"
                ? "Create Account"
                : "Sign In"}
          </Button>

          <Typography variant="body2" align="center">
            {mode === "register" ? (
              <>
                Already have an account?{" "}
                <Link component={RouterLink} to="/login">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link component={RouterLink} to="/register">
                  Register
                </Link>
              </>
            )}
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
