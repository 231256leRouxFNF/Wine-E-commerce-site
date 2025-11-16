const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  heading: {
    type: String,
    required: true,
    maxlength: 100,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  photos: {
    type: [String], // Array of base64 or URLs
    default: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2'],
  },
  tastingNotes: {
    color: { type: String, maxlength: 100 },
    nose: { type: String, maxlength: 150 },
    mouthfeel: { type: String, maxlength: 150 },
    aciditySugar: { type: String, maxlength: 100 },
    flavors: { type: String, maxlength: 200 },
    tannins: { type: String, maxlength: 100 },
    finish: { type: String, maxlength: 150 },
  },
  pairings: {
    type: String,
    maxlength: 300,
  },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 2;
}

module.exports = mongoose.model('Review', reviewSchema);
