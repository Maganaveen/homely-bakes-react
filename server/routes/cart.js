const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get cart items
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, cakeId, name, price, image } = req.body;
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    
    const existingItem = cart.items.find(item => item.cakeId === cakeId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ cakeId, name, price, image, quantity: 1 });
    }
    
    cart.updatedAt = new Date();
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/:userId/:cakeId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.cakeId !== req.params.cakeId);
      cart.updatedAt = new Date();
      await cart.save();
    }
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;