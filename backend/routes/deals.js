const express = require('express');
const axios = require('axios');
const Deal = require('../models/Deal');

const router = express.Router();

// Fetch game deals from external API and store in MongoDB
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://www.cheapshark.com/api/1.0/deals');
    const deals = response.data;

    // Save deals to MongoDB
    await Deal.insertMany(deals);

    res.status(200).json({ msg: 'Deals fetched and stored successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all game deals from MongoDB
router.get('/', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.status(200).json(deals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
