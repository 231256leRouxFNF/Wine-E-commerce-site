// seedProducts.js (in your backend folder)
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product'); // adjust path if needed

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    await Product.insertMany([
      {
        title: "Cabernet Sauvignon",
        description: "A full-bodied red wine",
        price: 29.99,
        image: "https://your-url.com/cab.jpg",
        category: "Red Wine",
        inStock: true
      },
      {
        title: "Chardonnay",
        description: "A crisp white wine",
        price: 22.99,
        image: "https://your-url.com/chard.jpg",
        category: "White Wine",
        inStock: true
      }
    ]);

    console.log('✅ Products inserted!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error inserting products:', err);
    process.exit(1);
  });
