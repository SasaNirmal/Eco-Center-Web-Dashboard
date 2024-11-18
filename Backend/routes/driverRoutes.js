// Import necessary modules
const express = require('express');
const router = express.Router();
const Driver = require('../models/driverModel'); // Adjust the path as needed


// diver router
// Route to fetch all drivers with selected fields
router.get('/all-drivers', async (req, res) => {
    try {
      const drivers = await Driver.find({}, 'name address vehicleType'); // Only retrieve specified fields
      res.status(200).json(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      res.status(500).json({ message: 'Failed to fetch drivers' });
    }
  });


module.exports = router;
