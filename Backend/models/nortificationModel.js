const mongoose = require('mongoose');

const nortificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});


const Alet = mongoose.model('Vegetables', nortificationSchema);
module.exports = Alet;
