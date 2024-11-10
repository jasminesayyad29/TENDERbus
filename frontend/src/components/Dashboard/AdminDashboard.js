import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS

const AdminDashboard = () => {
  return (
    <div className="unique-dashboard-wrapper">
      {/* Parent Container Card */}
      <div className="unique-parent-card">
        <h1>Tender Officer's Dashboard</h1>

        <div className="unique-admin-options">
          <div className="unique-card">
            <h2>Manage</h2>
            <ul>
              <li>
                <Link to="/tender/create" className="unique-dashboard-link">Create Tender</Link>
              </li>
              <li>
                <Link to="/admin/tender-management" className="unique-dashboard-link">Manage Tenders</Link>
              </li>
              <li>
                <Link to="/admin/bid-evaluation" className="unique-dashboard-link">Bid Evaluation</Link>
              </li>
              <li>
                <Link to="/admin/reports" className="unique-dashboard-link">Reports & Analytics</Link>
              </li>
              <li>
                <Link to="/admin/admin-send-notifications" className="unique-dashboard-link">Notify Bidder</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
