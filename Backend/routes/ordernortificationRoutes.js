// routes/ordernortificationRoutes.js
const express = require('express');
const router = express.Router();
const OrderNotification = require('../models/ordernortificationModel'); 

// Get all notifications
router.get('/all-ordersnortification', async (req, res) => {
  try {
    const notifications = await OrderNotification.find(); // Fetch all notifications from MongoDB
    res.json(notifications); // Return the list of notifications in JSON format
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications', details: error.message });
  }
});

module.exports = router;
