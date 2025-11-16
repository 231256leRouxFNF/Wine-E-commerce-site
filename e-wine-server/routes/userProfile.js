const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile (basic info)
router.put('/:userId', async (req, res) => {
  try {
    const { name, surname, profilePhoto } = req.body;
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (profilePhoto !== undefined) user.profilePhoto = profilePhoto;
    
    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add shipping address
router.post('/:userId/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.shippingAddresses.push(req.body);
    await user.save();
    
    res.status(201).json(user.shippingAddresses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update shipping address
router.put('/:userId/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const address = user.shippingAddresses.id(req.params.addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    Object.assign(address, req.body);
    await user.save();
    
    res.json(user.shippingAddresses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete shipping address
router.delete('/:userId/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.shippingAddresses.pull(req.params.addressId);
    await user.save();
    
    res.json({ message: 'Address deleted', addresses: user.shippingAddresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add payment method
router.post('/:userId/payment-methods', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // In production, card number should be encrypted/tokenized
    user.paymentMethods.push(req.body);
    await user.save();
    
    res.status(201).json(user.paymentMethods);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update payment method
router.put('/:userId/payment-methods/:methodId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const method = user.paymentMethods.id(req.params.methodId);
    if (!method) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    
    Object.assign(method, req.body);
    await user.save();
    
    res.json(user.paymentMethods);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete payment method
router.delete('/:userId/payment-methods/:methodId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.paymentMethods.pull(req.params.methodId);
    await user.save();
    
    res.json({ message: 'Payment method deleted', paymentMethods: user.paymentMethods });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
