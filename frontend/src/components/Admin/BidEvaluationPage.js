
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BidEvaluationPage.css';
import { CSVLink } from "react-csv";

const BidDetailModal = ({ bid, onClose, onRate, onCommentChange }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Bid Details</h2>
        <p><strong>Bidder Name:</strong> {bid.bidderName}</p>
        <p><strong>Company Name:</strong> {bid.companyName}</p>
        <p><strong>Bid Amount:</strong> ${bid.bidAmount}</p>
        <p><strong>Description:</strong> {bid.description}</p>
        <p><strong>Expiry Date:</strong> {new Date(bid.expiryDate).toLocaleDateString()}</p>

        <h3>Rate the Bid:</h3>
        {['bidAmount', 'timeliness', 'quality', 'reliability'].map((criterion) => (
          <div key={criterion}>
            <label>{criterion.charAt(0).toUpperCase() + criterion.slice(1)}: </label>
            <input
              type="number"
              min="1"
              max="10"
              onChange={(e) => onRate(bid._id, criterion, e.target.value)}
            />
          </div>
        ))}
        
        <h3>Comment:</h3>
        <textarea
          rows="4"
          placeholder="Add any feedback or notes here"
          onChange={(e) => onCommentChange(bid._id, e.target.value)}
        ></textarea>
        
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const BidEvaluationPage = () => {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [comments, setComments] = useState({});
  const [sortCriterion, setSortCriterion] = useState('bidAmount');

  const criteria = [
    { name: 'bidAmount', weight: 0.4 },
    { name: 'timeliness', weight: 0.2 },
    { name: 'quality', weight: 0.2 },
    { name: 'reliability', weight: 0.2 },
  ];

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bids');
        setBids(response.data);
      } catch (err) {
        setError('Failed to fetch bids. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  const evaluateBid = (bid) => {
    let totalScore = 0;
    let totalWeight = 0;

    criteria.forEach((criterion) => {
      const score = bid.ratings && bid.ratings[criterion.name] ? bid.ratings[criterion.name] : 0;
      const weightedScore = score * criterion.weight;
      totalScore += weightedScore;
      totalWeight += criterion.weight;
    });

    return totalWeight > 0 ? (totalScore / totalWeight).toFixed(2) : '0.00';
  };

  const handleRowClick = (bid) => {
    setSelectedBid(bid);
    setModalOpen(true);
  };

  const handleRateBid = async (bidId, criterion, rating) => {
    try {
      await axios.put(`http://localhost:5000/api/bids/${bidId}`, {
        ratings: { [criterion]: rating },
      });
      setBids((prevBids) =>
        prevBids.map((bid) =>
          bid._id === bidId ? {
            ...bid,
            ratings: {
              ...bid.ratings,
              [criterion]: rating
            }
          } : bid
        )
      );
    } catch (error) {
      console.error("Failed to save rating:", error);
    }
  };

  const handleCommentChange = (bidId, comment) => {
    setComments((prevComments) => ({ ...prevComments, [bidId]: comment }));
  };

  const sortedBids = [...bids].sort((a, b) => a[sortCriterion] - b[sortCriterion]);

  const exportToCSV = () => {
    const csvData = sortedBids.map((bid) => ({
      "Bidder Name": bid.bidderName,
      "Company Name": bid.companyName,
      "Bid Amount": bid.bidAmount,
      "Description": bid.description,
      "Evaluation Score": evaluateBid(bid),
      "Comment": comments[bid._id] || "",
    }));
    return csvData;
  };

  return (
    <div className="bid-evaluation-page">
      <h1>Bid Evaluation</h1>
      <div className="controls">
        <label>Sort By: </label>
        <select onChange={(e) => setSortCriterion(e.target.value)}>
          <option value="bidAmount">Bid Amount</option>
          <option value="timeliness">Timeliness</option>
          <option value="quality">Quality</option>
          <option value="reliability">Reliability</option>
        </select>
        <CSVLink data={exportToCSV()} filename={"bid-evaluation.csv"}>
          Export to CSV
        </CSVLink>
      </div>
      {loading && <p>Loading bids...</p>}
      {error && <p className="error-message">{error}</p>}
      {sortedBids.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bidder Name</th>
              <th>Company Name</th>
              <th>Bid Amount</th>
              <th>Evaluation Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedBids.map(bid => (
              <tr key={bid._id} onClick={() => handleRowClick(bid)}>
                <td>{bid.bidderName}</td>
                <td>{bid.companyName}</td>
                <td>${bid.bidAmount}</td>
                <td>{evaluateBid(bid)}</td>
                <td>
                  {evaluateBid(bid) >= 7.0 ? (
                    <span role="img" aria-label="accepted" style={{color: 'green'}}>✔️</span>
                  ) : (
                    <span role="img" aria-label="rejected" style={{color: 'red'}}>❌</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bids available for evaluation.</p>
      )}
      {modalOpen && selectedBid && (
        <BidDetailModal 
          bid={selectedBid} 
          onClose={() => setModalOpen(false)} 
          onRate={handleRateBid} 
          onCommentChange={handleCommentChange} 
        />
      )}
    </div>
  );
};

export default BidEvaluationPage;
