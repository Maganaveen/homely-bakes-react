const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// POST /orders - create new order with user registration (without email)
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('cakeName').notEmpty().withMessage('Cake name is required'),
  body('selectedOption').notEmpty().withMessage('Option selection is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('totalPrice').isNumeric().withMessage('Total price is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, address, cakeName, selectedOption, quantity, totalPrice, message } = req.body;

    console.log('Received order data:', { name, email, phone, address, cakeName, selectedOption, quantity, totalPrice });

    // Check if user exists, if not create new user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        phone,
        address
      });
      await user.save();
      console.log('Created new user:', user._id);
    } else {
      console.log('Found existing user:', user._id);
    }

    // Create order
    const order = new Order({
      userId: user._id,
      cakeName,
      selectedOption,
      quantity,
      totalPrice,
      message: message || ''
    });

    await order.save();
    console.log('Order saved successfully:', order._id);

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: order._id
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      message: 'Failed to place order',
      error: error.message 
    });
  }
});

// GET /orders - get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email phone');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;