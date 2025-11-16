const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'South Africa' },
});

const paymentMethodSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  cardNumber: { type: String, required: true }, // Store encrypted or tokenized
  cardholderName: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cardType: { type: String }, // Visa, Mastercard, etc.
});

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: { type: String, required: true, unique: true },
  password: String,
  cardSequence: [String],
  role: { type: String, default: 'user' },
  shippingAddresses: [addressSchema],
  paymentMethods: [paymentMethodSchema],
  profilePhoto: { type: String }, // base64 or URL
});

// Check if model exists before compiling to avoid OverwriteModelError with nodemon
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
