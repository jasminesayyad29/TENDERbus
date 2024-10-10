import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTenderPage.css';

const ViewTenderPage = () => {
  const { tenderId } = useParams(); // Get tender ID from URL
  const [bids, setBids] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`/api/bids/${tenderId}`);
        setBids(response.data);
      } catch (err) {
        setError('Failed to fetch bids for this tender');
      }
    };
    fetchBids();
  }, [tenderId]);

  return (
    <div className="view-tender-container">
      <h2>Bids for Tender: {tenderId}</h2>
      {error && <p className="error">{error}</p>}
      {bids.length > 0 ? (
        <table className="bids-table">
          <thead>
            <tr>
              <th>Bidder Name</th>
              <th>Bid Amount</th>
              <th>Description</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid._id}>
                <td>{bid.bidderName}</td>
                <td>${bid.bidAmount}</td>
                <td>{bid.description}</td>
                <td>{new Date(bid.submissionDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bids available for this tender.</p>
      )}
    </div>
  );
};

export default ViewTenderPage;
