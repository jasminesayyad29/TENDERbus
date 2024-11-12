const mongoose = require('mongoose');

// Define the Notification schema
const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },               // The notification message
  recipientEmail: { type: String, required: true },        // Recipient's email address
  notificationType: {                                      // Type of notification (e.g., info, warning, alert)
    type: String,
    enum: ['info', 'warning', 'alert'],
    default: 'info', // Default to 'info' if no type is provided
    required: true,
  },
  priority: {                                               // Priority level of the notification (normal, high)
    type: String,
    enum: ['normal', 'high'],
    default: 'normal',  // Default to 'normal' priority
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },        // Timestamp for when the notification was created
});

module.exports = mongoose.model('Notification', NotificationSchema);
