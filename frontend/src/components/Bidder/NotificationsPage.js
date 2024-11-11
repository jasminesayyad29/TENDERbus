import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './BidderNotifications.css'; // Import the CSS file

const BidderNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.email) {
          setError('No user information found');
          setLoading(false);
          return;
        }

        const recipientEmail = user.email;

        // Fetch notifications for the specific email
        const response = await Axios.get('http://localhost:5000/api/notifications/notifications', {
          params: { recipientEmail },
        });

        setNotifications(response.data.notifications);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch notifications');
        setLoading(false);
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="bidder-notifications-loading-state">Loading notifications...</div>;
  }

  return (
    <div className="bidder-notifications-container">
      <h1>Notifications</h1>
      {error && <p className="bidder-notifications-error-message">{error}</p>}
      <ul className="bidder-notifications-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification._id} className="bidder-notifications-item">
              <p><strong>Message:</strong> {notification.message}</p>
              <p><strong>Type:</strong> 
                <span className={`bidder-notifications-type ${notification.notificationType}`}>
                  {notification.notificationType}
                </span>
              </p>
              <p><strong>Priority:</strong> {notification.priority}</p>
              <p><strong>Received At:</strong> {new Date(notification.createdAt).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p className="bidder-notifications-no-notifications">No notifications available.</p>
        )}
      </ul>
    </div>
  );
};

export default BidderNotifications;
