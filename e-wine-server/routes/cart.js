const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// Add single item
router.post('/:userId/add', async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId: rawUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rawUser) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    const userId = new mongoose.Types.ObjectId(rawUser);
    const prodId = new mongoose.Types.ObjectId(productId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existing = cart.items.find((i) => i.productId.equals(prodId));
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.items.push({ productId: prodId, quantity: 1 });
    }
    await cart.save();
    await cart.populate('items.productId');
    res.json(cart);
  } catch (err) {
    console.error('Failed to add item', err);
    res.status(500).json({ message: 'Failed to add item' });
  }
});

// Remove an item
router.delete('/:userId/:itemId', async (req, res) => {
  try {
    const { userId: rawUser, itemId: rawItem } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rawUser) || !mongoose.Types.ObjectId.isValid(rawItem)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    const userId = new mongoose.Types.ObjectId(rawUser);
    const itemId = new mongoose.Types.ObjectId(rawItem);
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter((i) => !i.productId.equals(itemId));
      await cart.save();
      await cart.populate('items.productId');
    }
    res.json(cart || { items: [] });
  } catch (err) {
    console.error('Failed to remove item', err);
    res.status(500).json({ message: 'Failed to remove item' });
  }
});

// Get cart for user
router.get('/:userId', async (req, res) => {
  try {
    const { userId: rawUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rawUser)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    const userId = new mongoose.Types.ObjectId(rawUser);
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error('Failed to fetch cart', err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// Replace entire cart (used for syncing)
router.post('/:userId', async (req, res) => {
  try {
    const { items } = req.body;
    const { userId: rawUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rawUser)) {
      return res.status(400).json({ message: 'Invalid ID supplied' });
    }
    const userId = new mongoose.Types.ObjectId(rawUser);
    const formatted = (items || []).reduce((arr, i) => {
      if (mongoose.Types.ObjectId.isValid(i.productId)) {
        arr.push({
          productId: new mongoose.Types.ObjectId(i.productId),
          quantity: i.quantity,
        });
      }
      return arr;
    }, []);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: formatted });
    } else {
      cart.items = formatted;
    }
    await cart.save();
    await cart.populate('items.productId');
    res.json(cart);
  } catch (err) {
    console.error('Failed to save cart', err);
    res.status(500).json({ message: 'Failed to save cart' });
  }
});

module.exports = router;
