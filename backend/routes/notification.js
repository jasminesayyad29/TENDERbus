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
    const { sendername,
      senderemail, message, recipientEmail, notificationType, priority } = req.body;

    // Check for missing fields
    if (!message || !recipientEmail || !notificationType || !priority) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newNotification = new Notification({
      sendername,
      senderemail,
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
  const { recipientEmail, unread } = req.query;

  if (!recipientEmail) {
    return res.status(400).json({ error: 'Recipient email is required' });
  }

  try {
    const filter = { recipientEmail };
    if (unread === 'true') {
      filter.isRead = false; // Only fetch unread notifications if specified
    }

    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
  }
});

// Mark notifications as read
router.put('/notifications/mark-read', async (req, res) => {
  const { notificationIds } = req.body; // Array of notification IDs

  try {
    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { isRead: true } }
    );
    res.status(200).json({ success: true, message: 'Notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ success: false, error: 'Failed to mark notifications as read' });
  }
});





router.delete('/notifications', async (req, res) => {
  const { recipientEmail } = req.query;

  if (!recipientEmail) {
    return res.status(400).json({ error: 'Recipient email is required' });
  }

  try {
    // The filter now targets only read notifications (isRead: true)
    const filter = { recipientEmail, isRead: true };

    const deleteResult = await Notification.deleteMany(filter);

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No read notifications found to delete' });
    }

    res.status(200).json({ success: true, message: `${deleteResult.deletedCount} read notification(s) deleted` });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ success: false, error: 'Failed to delete notifications' });
  }
});

module.exports = router;
