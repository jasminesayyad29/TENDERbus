import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BidEvaluationPage.css';
import { saveAs } from 'file-saver';
import { CSVLink } from "react-csv";

const BidDetailModal = ({ bid, onClose, onRate, onCommentChange }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Bid Details</h2>
        <p><strong>Bidder ID:</strong> {bid.bidderId}</p>
        <p><strong>Tender Title:</strong> {bid.title}</p>
        <p><strong>Price:</strong> ${bid.price}</p>
        <p><strong>Quality:</strong> {bid.quality}</p>
        <p><strong>Delivery Time:</strong> {bid.deliveryTime}</p>
        <p><strong>Submission Date:</strong> {new Date(bid.submissionDate).toLocaleDateString()}</p>

        <h3>Rate the Bid:</h3>
        <div>
          {['Price', 'Quality', 'Delivery Time'].map((criterion) => (
            <div key={criterion}>
              <label>{criterion}: </label>
              <input
                type="number"
                min="1"
                max="10"
                onChange={(e) => onRate(bid._id, criterion.toLowerCase(), e.target.value)}
              />
            </div>
          ))}
        </div>
        
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
  const [criteria] = useState([
    { name: 'Price', weight: 0.5 },
    { name: 'Quality', weight: 0.3 },
    { name: 'Delivery Time', weight: 0.2 },
  ]);
  const [comments, setComments] = useState({});
  const [sortCriterion, setSortCriterion] = useState('price');

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bids');
        setBids(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch bids. Please try again later.');
        setBids([]);
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
      const score = bid.ratings && bid.ratings[criterion.name.toLowerCase()] ? bid.ratings[criterion.name.toLowerCase()] : 0;
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
      "Bidder ID": bid.bidderId,
      "Tender Title": bid.title,
      "Price": bid.price,
      "Quality": bid.quality,
      "Delivery Time": bid.deliveryTime,
      "Evaluation Score": evaluateBid(bid),
      "Submission Date": new Date(bid.submissionDate).toLocaleDateString(),
      "Comment": comments[bid._id] || "",
    }));
    const csvBlob = new Blob([JSON.stringify(csvData)], { type: "text/csv;charset=utf-8;" });
    saveAs(csvBlob, "bid-evaluation.csv");
  };

  return (
    <div className="bid-evaluation-page">
      <h1>Bid Evaluation</h1>
      <div className="controls">
        <label>Sort By: </label>
        <select onChange={(e) => setSortCriterion(e.target.value)}>
          <option value="price">Price</option>
          <option value="quality">Quality</option>
          <option value="deliveryTime">Delivery Time</option>
        </select>
        <button onClick={exportToCSV}>Export to CSV</button>
      </div>
      {loading && <p>Loading bids...</p>}
      {error && <p className="error-message">{error}</p>}
      {sortedBids.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bidder ID</th>
              <th>Tender Title</th>
              <th>Price</th>
              <th>Quality</th>
              <th>Delivery Time</th>
              <th>Evaluation Score</th>
              <th>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedBids.map(bid => (
              <tr key={bid._id} onClick={() => handleRowClick(bid)}>
                <td>{bid.bidderId}</td>
                <td>{bid.title}</td>
                <td>${bid.price}</td>
                <td>{bid.quality}</td>
                <td>{bid.deliveryTime}</td>
                <td>{evaluateBid(bid)}</td>
                <td>{new Date(bid.submissionDate).toLocaleDateString()}</td>
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
