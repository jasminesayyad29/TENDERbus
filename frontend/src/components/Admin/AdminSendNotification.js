// src/components/Admin/AdminSendNotification.js
import React, { useState } from 'react';
import axios from 'axios';


const AdminSendNotification = () => {
  const [message, setMessage] = useState('');

  const sendNotification = async () => {
    try {
      await axios.post('/api/notifications/send', {
        message,
        recipientRole: 'bidder',  // Set to "bidder" for bidders to receive notifications
      });
      setMessage('');
      alert('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter notification message"
      />
      <button onClick={sendNotification}>Send</button>
    </div>
  );
};

export default AdminSendNotification;
