const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  inStock: Boolean,
});

module.exports = mongoose.model('Product', productSchema);
