router.post("/login", async (req, res) => {
  try {
    const { email, password, labelSequence } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials (email)" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials (password)" });

    // ✅ Compare labelSequence
    const isSequenceMatch =
      Array.isArray(labelSequence) &&
      Array.isArray(user.labelSequence) &&
      labelSequence.length === user.labelSequence.length &&
      labelSequence.every((val, index) => val === user.labelSequence[index]);

    if (!isSequenceMatch)
      return res.status(401).json({ message: "Invalid card sequence" });

    // ✅ Passed all checks
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});
