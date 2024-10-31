import React, { useState } from 'react'; // Removed useEffect
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BidderDashboard.css';

const BidderDashboard = () => {
  const [bidderId, setBidderId] = useState('');
  const [bids, setBids] = useState([]);
  const [error, setError] = useState('');

  const fetchBids = async (id) => {
    try {
      const response = await axios.get(`/api/bids?bidder=${id}`);
      setBids(response.data);
      setError(''); // Clear error if fetch is successful
    } catch (err) {
      setError('Failed to fetch bids. Please check your Bidder ID.');
      setBids([]); // Clear bids on error
    }
  };

  const handleBidderIdSubmit = (e) => {
    e.preventDefault();
    if (bidderId) {
      fetchBids(bidderId);
    }
  };

  return (
    <div className="bidder-dashboard">
      <h1>Bidder Dashboard</h1>

      <form onSubmit={handleBidderIdSubmit} className="bidder-id-form">
        <label htmlFor="bidderId">Enter Your Bidder ID:</label>
        <input
          type="text"
          id="bidderId"
          value={bidderId}
          onChange={(e) => setBidderId(e.target.value)}
          required
        />
        <button type="submit">Fetch Bids</button>
      </form>

      {error && <p className="error-message">{error}</p>}

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
            <Link to="Bidder/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/settings">Account Settings</Link>
          </li>
        </ul>
      </div>

      {/* Section to display bids and points */}
      <div className="bidder-bids">
        <h2>Your Bids and Points</h2>
        {bids.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Tender Title</th>
                <th>Price</th>
                <th>Points</th>
                <th>Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {bids.map(bid => (
                <tr key={bid._id}>
                  <td>{bid.title}</td>
                  <td>${bid.price}</td>
                  <td>{bid.points}</td>
                  <td>{new Date(bid.submissionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bids found for this Bidder ID.</p>
        )}
      </div>
    </div>
  );
};

export default BidderDashboard;
