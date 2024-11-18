// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Make sure to hash this before saving
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
