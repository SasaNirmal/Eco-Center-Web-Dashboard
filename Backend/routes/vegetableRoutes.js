// routes/vegetableRoutes.js
const express = require('express');
const router = express.Router();
const Vegetable = require('../models/vegetableModel'); // Make sure this path is correct
const mongoose = require('mongoose');


module.exports = (upload) => {
  // Route to create a new vegetable
  router.post('/add', async (req, res) => {
    const { code, name, unitprice, quantity, image } = req.body;
  
    const newVegetable = new Vegetable({ 
      code, 
      name, 
      unitprice, 
      quantity, 
      image 
    });
    
    try {
      await newVegetable.save();
      res.status(201).json({ message: 'Vegetable added successfully!', vegetable: newVegetable });
    } catch (error) {
      res.status(500).json({ message: 'Error adding vegetable', error });
    }
  });



 // Route to get all vegetables
router.get('/allvegetables', async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.status(200).json(vegetables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vegetables', error });
  }
});
 
// Route to update a vegetable by ID

router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedVegetable = await Vegetable.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true } // Return the updated vegetable
    );

    if (!updatedVegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }

    res.status(200).json(updatedVegetable);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vegetable', error });
  }
});



  // Route to delete a vegetable by ID

router.delete('/:id', async (req, res) => {
  try {
    const deletedVegetable = await Vegetable.findByIdAndDelete(req.params.id);
    if (!deletedVegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }
    res.status(200).json({ message: 'Vegetable deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vegetable', error });
  }
});




  return router;
};
