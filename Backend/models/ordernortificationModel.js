const mongoose = require('mongoose');

const ordernortificationSchema = new mongoose.Schema({
  message: { type: String, required: true, unique: true },
  amount: { type: String, required: true },
  name: { type: String, required: true }, // Ensure to hash this before saving if sensitive
  dateTime: { type: String, required: true },
  orderId:{ type: String, required: true },
  userId:{ type: String, required: true },
});

const OrderNotification = mongoose.model('OrderNotification', ordernortificationSchema);

module.exports = OrderNotification;