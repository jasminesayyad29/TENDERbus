// routes/notification.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Endpoint for admins to create notifications
router.post('/send', async (req, res) => {
  try {
    const { message, recipientRole } = req.body;
    const notification = new Notification({
      message,
      senderRole: 'admin',
      recipientRole,
    });
    await notification.save();

    // Emit the notification using Socket.IO
    req.app.get('io').emit('newNotification', notification);
    
    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to send notification' });
  }
});

// Endpoint for bidders to fetch notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipientRole: 'bidder' });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
