const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for image uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ Mount your routes
const productRoutes = require('./routes/products'); // or './products' depending on location
app.use('/api/products', productRoutes);
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);
const favRoutes = require('./routes/favourites');
app.use('/api/favourites', favRoutes);
const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);
const userProfileRoutes = require('./routes/userProfile');
app.use('/api/user-profile', userProfileRoutes);

// ✅ MongoDB connection (already configured correctly)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
