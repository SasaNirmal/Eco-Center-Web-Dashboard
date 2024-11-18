// models/driverModel.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  vehicleType: { type: String, required: true }
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
