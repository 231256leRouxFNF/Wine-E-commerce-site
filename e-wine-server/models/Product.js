const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  style: {
    type: [String], // stored as array after split
    default: [],
  },
  tag: {
    type: [String], // stored as array after split
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // base64-encoded or URL string
    required: true,
  }
}, { timestamps: true });

// Check if model exists before compiling to avoid OverwriteModelError with nodemon
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
