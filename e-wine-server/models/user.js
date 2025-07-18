const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, required: true, unique: true },
  password: String,
  cardSequence: [String],
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model("User", userSchema);
