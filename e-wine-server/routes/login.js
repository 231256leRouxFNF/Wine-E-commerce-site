// Login route (email only)
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // ✅ Skip password and cardSequence checks
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});
