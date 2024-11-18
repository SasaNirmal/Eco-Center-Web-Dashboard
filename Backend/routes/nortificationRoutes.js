const express = require('express');
const router = express.Router();
const Alet = require('../models/nortificationModel'); // Make sure this path is correct


// Route to get all vegetables
router.get('/aletveg', async (req, res) => {
   try {
     const vegetables = await Alet.find({},'name quantity');
     res.status(200).json(vegetables);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching vegetables', error });
   }
});

module.exports = router;
