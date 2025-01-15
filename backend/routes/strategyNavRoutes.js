
// routes/strategyNavRoutes.js
const express = require('express');
const router = express.Router();
const { StrategyNav } = require('../models');

// Example: GET all StrategyNav records
router.get('/', async (req, res) => {
  try {
    const records = await StrategyNav.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add additional routes (POST, PUT, DELETE) as needed

module.exports = router;
