// src/components/Dashboard/BidderDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './BidderDashboard.css';

const BidderDashboard = () => {
  return (
    <div className="bidder-dashboard">
      <h1>Bidder Dashboard</h1>
      <div className="bidder-options">
        <h2>Manage Your Bids</h2>
        <ul>
          <li>
            <Link to="/tender/view">View Tenders</Link>
          </li>
          <li>
            <Link to="/tender/submit">Submit a Bid</Link>
          </li>
          <li>
            <Link to="/tender/bid-details">Bid Details</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/settings">Account Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BidderDashboard;
