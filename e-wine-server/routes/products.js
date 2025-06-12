const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { requireRole } = require('../middleware/auth');

// POST /api/products → Add a product
router.post("/", requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const status = req.user.role === 'superadmin' ? 'approved' : 'pending';
    const newProduct = new Product({ ...req.body, status });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products → Get all approved products
router.get("/", async (req, res) => {
  try {
    const role = req.user?.role;
    const filter = role === 'admin' || role === 'superadmin' ? {} : { status: 'approved' };
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/pending → List pending products
router.get('/pending', requireRole('superadmin'), async (req, res) => {
  try {
    const products = await Product.find({ status: 'pending' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/products/:id/approve → Approve a pending product
router.put('/:id/approve', requireRole('superadmin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET /api/products/:id → Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/products/:id → Delete a product by ID
router.delete("/:id", requireRole(['admin', 'superadmin']), async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
