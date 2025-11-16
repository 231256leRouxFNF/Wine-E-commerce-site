const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

// Check if model exists before compiling to avoid OverwriteModelError with nodemon
module.exports = mongoose.models.Favourite || mongoose.model('Favourite', favouriteSchema);
