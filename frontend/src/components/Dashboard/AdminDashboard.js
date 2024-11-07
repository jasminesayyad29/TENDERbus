// src/components/Dashboard/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-options">
        <h2>Tender Management</h2>
        <ul>
          <li>
            <Link to="/tender/create">Create Tender</Link>
          </li>
          
          <li>
            <Link to="/admin/tender-management">Manage Tenders</Link>
          </li>
          <li>
            <Link to="/admin/bid-evaluation">Bid Evaluation</Link>
          </li>
          <li>
            <Link to="/admin/reports">Reports & Analytics</Link>
          </li>
          <li>
            <Link to="/admin/admin-send-notifications">Notify Bidder</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
