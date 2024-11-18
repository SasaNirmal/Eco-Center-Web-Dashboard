const Vegetable = require('./models/vegetableModel');

// Add new vegetable
exports.addVegetable = async (req, res) => {
  try {
    const { code, name,unitprice, quantity, image } = req.body;
    const vegetable = new Vegetable({ code, name, unitprice, quantity, image });
    await vegetable.save();
    res.status(201).json(vegetable);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add vegetable', error });
  }
};


// Get all vegetables
exports.getVegetables = async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve vegetables', error });
  }
};

// Remove a vegetable by ID
exports.removeVegetable = async (req, res) => {
  try {
    await Vegetable.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Vegetable removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove vegetable', error });
  }
};
