// src/components/Bidder/NotificationsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// Connect to the backend's Socket.IO
const socket = io('http://localhost:5000'); // Replace with your server URL

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch past notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Listen for real-time notifications
    socket.on('newNotification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.off('newNotification');
    };
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.map((notif, index) => (
        <div key={index} className="notification">
          <p>{notif.message}</p>
          <small>{new Date(notif.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
