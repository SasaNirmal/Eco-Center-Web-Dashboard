// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Adjust the path if necessary

// Admin Signup Route
router.post('/signup', adminController.addAdmin);

// Admin Signin Route (Add this if you have it defined)
router.post('/signin', async (req, res) => {
  // Your signin logic here
});

module.exports = router;
