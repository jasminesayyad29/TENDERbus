import React, { useState, useEffect } from 'react'; // Added useEffect
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import './BidderDashboard.css';
import { fetchbidsbymail } from '../../services/bidService'; // Import fetchbidsbymail
import { fetchScoreByBidId } from '../../services/tenderService'; // Import fetchScoreByBidId

const BidderDashboard = () => {
  const [bidderId, setBidderId] = useState('');
  const [bids, setBids] = useState([]);
  const [error, setError] = useState('');
  const [showTable, setShowTable] = useState(false); // State to control table visibility
  const [bidScores, setBidScores] = useState({}); // New state for scores
  const [userName, setUserName] = useState(''); // New state for user name
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Retrieve user data from localStorage and log it
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const email = storedUser?.email;
    const name = storedUser?.name; // Retrieve the name from localStorage
    console.log("Email from localStorage:", email);
    console.log("Name from localStorage:", name);

    if (!email || !name) {
      setError("User information not found in localStorage.");
      return;
    }

    // Set the user name
    setUserName(name);

    // Fetch bids based on email
    const getBids = async () => {
      try {
        const data = await fetchbidsbymail(email);
        setBids(data);
        data.forEach(bid => {
          fetchAndSetBidScore(bid._id); // Fetch and set the bid scores after fetching the bids
        });
      } catch (err) {
        setError(`No Bids found for email: ${email}`);
        console.error("Error fetching bids:", err);
      }
    };

    getBids();
  }, []); // Empty dependency array to run this effect only once on component mount

  const fetchAndSetBidScore = async (bidId) => {
    try {
      const evaluationData = await fetchScoreByBidId(bidId);
      if (evaluationData) {
        const score = evaluationData.evaluationScore || 0;
        setBidScores(prevScores => ({ ...prevScores, [bidId]: score }));
      }
    } catch (error) {
      console.error('Error fetching bid score:', error);
    }
  };

  const handleBidderIdSubmit = (e) => {
    e.preventDefault();
    if (bidderId) {
      // Handle Bidder ID submission logic if necessary (could be related to fetching data)
      navigate('/tender/bid-details');  // Navigate to /tender/bid-details after fetching bids
    }
  };

  const handleDeleteBid = async (bidderId) => {
    try {
      await axios.delete(`/api/bids/${bidderId}`);
      setBids(bids.filter((bid) => bid._id !== bidderId)); // Remove deleted bid from the list
    } catch (err) {
      setError('Failed to delete the bid.');
    }
  };

  const handleEditBid = (bidderId) => {
    window.location.href = `/tender/edit/${bidderId}`;
  };

  const toggleTableVisibility = () => {
    setShowTable(prevState => !prevState); // Toggle the table visibility
  };

  return (
    <div className="bidder-dashboard-container">
      <pre style={{ fontSize: '25px' }}>Welcome To<h2>Bidder Dashboard</h2></pre>
      <img src="/bidder.png" alt="TENDERbus Logo" class="bidder-logo" />
      <h2 style={{ fontSize: '20px' }}>{userName}</h2> 
      

      <form onSubmit={handleBidderIdSubmit} className="bidder-dashboard-form">
        
        <label htmlFor="bidderId" className="bidder-dashboard-label">Enter Your Bidder ID:</label>
        <input
          type="text"
          id="bidderId"
          value={bidderId}
          onChange={(e) => setBidderId(e.target.value)}
          required
          className="bidder-dashboard-input"
        />
        <button type="submit" className="bidder-dashboard-button">Fetch Bids</button>
      </form>

      {error && <p className="bidder-dashboard-error-message">{error}</p>}

      <div className="bidder-dashboard-options">
        <h2>Manage Your Bids</h2>
        <ul>
        <li>
            <Link to="/tender/tenders" className="bidder-dashboard-link">All Tenders</Link>
          </li>
          <li>
            <Link to="/tender/view" className="bidder-dashboard-link">Submit Bid</Link>
          </li>
          <li>
            <Link to="/tender/bid-details" className="bidder-dashboard-link">Your Bids</Link>
          </li>
        </ul>
      </div>

      {/* Section to display bids and points */}
      <div className="bidder-dashboard-bids">
        <h2>Your Bids and Points</h2>
        <button onClick={toggleTableVisibility} className="bidder-dashboard-toggle-button">
          {showTable ? 'Hide Bid Table' : 'Show Bid Table'}
        </button>

        {showTable && bids.length > 0 && (
          <table className="bidder-dashboard-table">
            <thead>
              <tr>
                <th>Bid ID</th>
                <th>Evaluation Score</th>
              </tr>
            </thead>
            <tbody>
              {bids.map(bid => (
                <tr key={bid._id}>
                  <td>{bid._id}</td>
                  <td>{bidScores[bid._id] ? bidScores[bid._id].toFixed(1) : 'Not Scored'}</td>
                  {/* Display Evaluation Score or 'Not available' */}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showTable && bids.length === 0 && <p className="bidder-dashboard-no-bids">No bids found for this Bidder ID.</p>}
      </div>
    </div>
  );
};

export default BidderDashboard;
