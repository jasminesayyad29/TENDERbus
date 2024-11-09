import React, { useEffect, useState } from 'react';
import { fetchTendersbymail, fetchBidsByTenderId } from '../../services/tenderService';
import { CSVLink } from "react-csv";
import './BidEvaluationPage.css';

const BidEvaluationPage = () => {
  const [tenders, setTenders] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [comments, setComments] = useState({});
  const [sortCriterion, setSortCriterion] = useState('bidAmount');
  const [bidError, setBidError] = useState(null);
  const [fetchedBidsForTender, setFetchedBidsForTender] = useState(new Set());
  const [noBidsModalOpen, setNoBidsModalOpen] = useState(false);
  const [noBidsMessage, setNoBidsMessage] = useState('');  // Track the no bids message

  const criteria = [
    { name: 'bidAmount', weight: 0.4 },
    { name: 'timeliness', weight: 0.2 },
    { name: 'quality', weight: 0.2 },
    { name: 'reliability', weight: 0.2 },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const email = storedUser?.email;

    if (!email) {
      setError("User email not found in localStorage.");
      setLoading(false);
      return;
    }

    const getTenders = async () => {
      try {
        const tendersData = await fetchTendersbymail(email);
        const updatedTenders = tendersData.map((tender) => {
          const endDate = new Date(tender.endDate);
          const currentDate = new Date();

          if (endDate < currentDate && tender.status !== 'Inactive') {
            return { ...tender, status: 'Inactive' };
          }
          return tender;
        });

        setTenders(updatedTenders);
      } catch (err) {
        setError(`Failed to fetch tenders: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };

    getTenders();
  }, []);

  const getBidsForTender = async (tenderId) => {
    if (fetchedBidsForTender.has(tenderId)) return;

    try {
      const fetchedBids = await fetchBidsByTenderId(tenderId);

      if (fetchedBids.length === 0) {
        setNoBidsMessage('No Bids for this Tender Yet');
        setNoBidsModalOpen(true); // Open the modal to show no bids message
      }

      setBids((prevBids) => [
        ...prevBids,
        ...fetchedBids.map((bid) => ({ ...bid, tenderId })),
      ]);

      setFetchedBidsForTender((prev) => new Set(prev.add(tenderId)));
    } catch (err) {
      setBidError("Failed to fetch bids for this tender.");
    }
  };

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
    if (rating < 1 || rating > 10) {
      alert('Rating must be between 1 and 10');
      return;
    }

    try {
      await fetchBidsByTenderId(bidId, {
        ratings: { [criterion]: rating },
      });
      setBids((prevBids) =>
        prevBids.map((bid) =>
          bid._id === bidId ? {
            ...bid,
            ratings: {
              ...bid.ratings,
              [criterion]: rating,
            },
          } : bid
        )
      );
    } catch (error) {
      setError('Failed to save rating. Please try again later.');
      console.error('Failed to save rating:', error);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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

      {tenders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Tender Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender) => (
              <tr key={tender._id}>
                <td>{tender.title}</td>
                <td>{new Date(tender.startDate).toLocaleDateString()}</td>
                <td>{new Date(tender.endDate).toLocaleDateString()}</td>
                <td>{tender.status}</td>
                <td>
                  <button onClick={() => getBidsForTender(tender._id)} disabled={fetchedBidsForTender.has(tender._id)}>
                    {fetchedBidsForTender.has(tender._id) ? 'Bids Fetched' : 'View Bids'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tenders available.</p>
      )}

      {bids.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bidder Name</th>
              <th>Company Name</th>
              <th>Bid Amount</th>
              <th>Evaluation Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBids.map((bid) => (
              <tr key={bid._id}>
                <td>{bid.bidderName}</td>
                <td>{bid.companyName}</td>
                <td>{bid.bidAmount}</td>
                <td>{evaluateBid(bid)}</td>
                <td>
                  <button onClick={() => handleRowClick(bid)}>Rate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bids available for evaluation.</p>
      )}

      {/* Modal Pop-up for no bids */}
      {noBidsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{noBidsMessage}</h2>
            <button onClick={() => setNoBidsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal Pop-up for bid details */}
      {modalOpen && selectedBid && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Bid Details</h2>
            <p><strong>Bidder Name:</strong> {selectedBid.bidderName}</p>
            <p><strong>Company Name:</strong> {selectedBid.companyName}</p>
            <p><strong>Bid Amount:</strong> {selectedBid.bidAmount}</p>
            <p><strong>Description:</strong> {selectedBid.description}</p>
            <div>
              <h4>Rate Bid</h4>
              {criteria.map((criterion) => (
                <div key={criterion.name}>
                  <label>{criterion.name} (Weight: {criterion.weight * 100}%)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={selectedBid.ratings?.[criterion.name] || ''}
                    onChange={(e) =>
                      handleRateBid(selectedBid._id, criterion.name, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <div>
              <h4>Comments</h4>
              <textarea
                value={comments[selectedBid._id] || ''}
                onChange={(e) => handleCommentChange(selectedBid._id, e.target.value)}
              />
            </div>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidEvaluationPage;
