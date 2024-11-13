import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-wrapper">
      {/* Parent Container Card */}
      <div className="admin-dashboard-card">
        <h1>Tender Officer's Dashboard</h1>

        <div className="admin-dashboard-options">
          {/* Flex container for card and logo */}
          <div className="admin-dashboard-content">
          <img src="/tendero.png" alt="TENDERbus Logo" className="admin-dashboard-logo" />
            <div className="admin-dashboard-card-inner">
              <h2>Manage</h2>
              <ul className="admin-dashboard-link-list">
                <li>
                  <Link to="/tender/create" className="admin-dashboard-link">Create Tender</Link>
                </li>
                <li>
                  <Link to="/admin/tender-management" className="admin-dashboard-link">Manage Tenders</Link>
                </li>
                <li>
                  <Link to="/admin/bid-evaluation" className="admin-dashboard-link">Bid Evaluation</Link>
                </li>
                <li>
                  <Link to="/admin/reports" className="admin-dashboard-link">Reports & Analysis</Link>
                </li>
                <li>
                 <Link className="admin-dashboard-link" to="/admin/admin-send-notifications">Notify Bidder</Link>
                </li>
              </ul>
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
