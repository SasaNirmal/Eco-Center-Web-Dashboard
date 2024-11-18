const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema({
  code: { type: String, required: false },
  name: { type: String, required: true },
  unitprice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },  // Ensure image is a URL string
});


const Vegetable = mongoose.model('Vegetable', vegetableSchema);
module.exports = Vegetable;
