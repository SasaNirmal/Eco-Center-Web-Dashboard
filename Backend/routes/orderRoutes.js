// In your Express backend, add a route to get notifications
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel'); // Import the model
const Vegetable = require('../models/vegetableModel'); 


async function getOrderNotification(orderId) {
    try {
        // Find the order by its ID
        const order = await Order.findById(orderId);

        // Get the item IDs
        const itemIds = order.items.map(item => item.itemId);

        // Find the vegetable names corresponding to the item IDs
        const vegetables = await Vegetable.find({ _id: { $in: itemIds } });

        // Map each item in the order to its vegetable name
        const itemDetails = order.items.map(item => {
            const vegetable = Vegetables.find(veg => veg._id.equals(item.itemId));
            return {
                itemId: item.itemId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                vegetableName: vegetable ? vegetable.name : 'Unknown'  // Add vegetable name
            };
        });

        // Construct the notification message
        const notificationMessage = itemDetails.map(item => `${item.vegetableName}: ${item.quantity} x ${item.unitPrice}`).join(', ');
        
        return notificationMessage;  // This message can be displayed in your notification component

    } catch (error) {
        console.error('Error fetching order notification:', error);
    }
};


// Get all notifications
router.get('/all-orders', async (req, res) => {
    try {
      const orders = await Order.find({},'items totalAmount orderDate userId'); // Fetch all notifications
      res.json(orders); // Return the list of notifications
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });

  module.exports = router;