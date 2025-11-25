const express = require('express');
const { body, validationResult } = require('express-validator');
const Cake = require('../models/Cake');

const router = express.Router();

// GET /cakes - fetch all cakes
router.get('/', async (req, res) => {
  try {
    const cakes = await Cake.find();
    console.log(`Found ${cakes.length} cakes in database`);
    res.json(cakes);
  } catch (error) {
    console.error('Error fetching cakes:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /cakes - add a new cake
router.post('/', [
  body('name').notEmpty().withMessage('Cake name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('image').notEmpty().withMessage('Image URL is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const cake = new Cake(req.body);
    const savedCake = await cake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;