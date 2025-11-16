const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      quantity: Number,
    }
  ],
  amount: Number,
  address: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

// Check if model exists before compiling to avoid OverwriteModelError with nodemon
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
