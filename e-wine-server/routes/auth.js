const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const saltRounds = 10;

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cardSequence } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      cardSequence
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password, cardSequence } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    //const isPasswordValid = await bcrypt.compare(password, user.password);
    //if (!isPasswordValid)
      //return res.status(401).json({ message: "Invalid credentials" });

    //const isCardMatch =
      //Array.isArray(cardSequence) &&
      //Array.isArray(user.cardSequence) &&
      //cardSequence.length === user.cardSequence.length &&
      //cardSequence.every((card, i) => card === user.cardSequence[i]);

    //if (!isCardMatch)
      //eturn res.status(401).json({ message: "Invalid card sequence" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
