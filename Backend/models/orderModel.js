const mongoose = require('mongoose');

const nortificationSchema = new mongoose.Schema({
  items: { type: String, required: true, unique: true },
  totalAmount: { type: String, required: true },
  orderDate: { type: String, required: true }, // Ensure to hash this before saving if sensitive
  userId: { type: String, required: true },
});

const Notification = mongoose.model('Notification', nortificationSchema);

module.exports = Notification;
