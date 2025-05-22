const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Your API routes go here
app.listen(5000, () => console.log('Server is running on port 5000'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});
