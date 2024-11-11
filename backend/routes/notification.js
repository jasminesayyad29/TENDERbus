const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

// Configure the transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint for admins to create notifications
router.post('/send', async (req, res) => {
  try {
    const { message, recipientEmail, notificationType, priority } = req.body;

    // Check for missing fields
    if (!message || !recipientEmail || !notificationType || !priority) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newNotification = new Notification({
      message,
      recipientEmail,
      notificationType,
      priority,
    });

    await newNotification.save();

    res.status(201).json({ success: true, notification: newNotification });
  } catch (error) {
    console.error('Error in /send route:', error);  // Log specific server error
    res.status(500).json({ success: false, error: error.message || 'Failed to send notification' });
  }
});

// Endpoint for bidders to fetch notifications
router.get('/notifications', async (req, res) => {
  const { recipientEmail } = req.query;  // Get the recipientEmail from the query string

  if (!recipientEmail) {
    return res.status(400).json({ error: 'Recipient email is required' });
  }

  try {
    // Fetch notifications for the specified recipientEmail
    const notifications = await Notification.find({ recipientEmail }).sort({ createdAt: -1 });
    
    if (notifications.length === 0) {
      return res.status(404).json({ error: 'No notifications found for this email' });
    }

    // Respond with the list of notifications
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
  }
});

module.exports = router;


