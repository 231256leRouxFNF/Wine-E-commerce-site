const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Favourite = require('../models/Favourite');

// Add a product to favourites
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId: rawUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rawUser) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    const userId = new mongoose.Types.ObjectId(rawUser);
    const prodId = new mongoose.Types.ObjectId(productId);
    let fav = await Favourite.findOne({ userId });
    if (!fav) {
      fav = new Favourite({ userId, products: [] });
    }
    if (!fav.products.some((p) => p.equals(prodId))) {
      fav.products.push(prodId);
    }
    await fav.save();
    await fav.populate('products');
    res.json(fav);
  } catch (err) {
    console.error('Failed to add favourite', err);
    res.status(500).json({ message: 'Failed to add favourite' });
  }
});

// Remove a product from favourites
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const { userId: rawUser, productId: rawProd } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rawUser) || !mongoose.Types.ObjectId.isValid(rawProd)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    const userId = new mongoose.Types.ObjectId(rawUser);
    const prodId = new mongoose.Types.ObjectId(rawProd);
    const fav = await Favourite.findOne({ userId });
    if (fav) {
      fav.products = fav.products.filter((p) => !p.equals(prodId));
      await fav.save();
      await fav.populate('products');
    }
    res.json(fav || { products: [] });
  } catch (err) {
    console.error('Failed to remove favourite', err);
    res.status(500).json({ message: 'Failed to remove favourite' });
  }
});

// Get favourites for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId: rawUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rawUser)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    const userId = new mongoose.Types.ObjectId(rawUser);
    const fav = await Favourite.findOne({ userId }).populate('products');
    if (!fav) return res.json({ products: [] });
    res.json(fav);
  } catch (err) {
    console.error('Failed to fetch favourites', err);
    res.status(500).json({ message: 'Failed to fetch favourites' });
  }
});

module.exports = router;
