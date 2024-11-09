import React, { useEffect, useState } from 'react';
import { fetchTendersbymail, fetchBidsByTenderId , fetchScoreByBidId} from '../../services/tenderService';
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
  const [noBidsMessage, setNoBidsMessage] = useState('');

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
        setNoBidsModalOpen(true);
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
  
//function to get the evaluation score form bidId

const getBidScore = async (bidId) => {
  try {
    // Fetch the evaluation data using the API
    const evaluationData = await fetchScoreByBidId(bidId);

    // Check if evaluationData contains a valid score
    if (evaluationData && evaluationData.evaluationScore) {
      return evaluationData.evaluationScore;
    } else {
      // If no score is available, return a default score (e.g., 0)
      return 0;
    }
  } catch (error) {
    // Log the error and return a default score (e.g., 0)
    console.error('Error fetching bid evaluation:', error);
    return 0;
  }
};

  const handleRowClick = (bid) => {
    setSelectedBid(bid);
    setModalOpen(true);
  };

  const handleRateBid = (criterion, rating) => {
    if (rating < 1 || rating > 10) {
      alert('Rating must be between 1 and 10');
      return;
    }
    setSelectedBid((prevBid) => ({
      ...prevBid,
      ratings: { ...prevBid.ratings, [criterion]: rating }
    }));
  };

  const handleCommentChange = (comment) => {
    setComments((prevComments) => ({ ...prevComments, [selectedBid._id]: comment }));
  };

  const submitEvaluation = async () => {
    if (!selectedBid || !selectedBid.ratings) {
      alert('Please rate all criteria before submitting.');
      return;
    }
  
    const evaluationData = {
      ratings: selectedBid.ratings, // Make sure ratings is passed correctly
      id: selectedBid._id,
      bidId: selectedBid.bidId,
      comments: comments[selectedBid._id] || "", // Check if comments exist
      evaluationScore: evaluateBid(selectedBid), // Calculate score based on ratings
      createdAt: new Date().toISOString(),
      _v: 0
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/bids/${selectedBid._id}/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluationData),
      });
      
      if (!response.ok) throw new Error('Failed to submit evaluation');
      
      setModalOpen(false);
      alert('Evaluation submitted successfully!');
    } catch (error) {
      setError('Failed to submit evaluation. Please try again later.');
      console.error('Error submitting evaluation:', error);
    }
  };
  

  const evaluateBid = (evaluationData) => {
    console.log('Bid data:', evaluationData); 

    const bidAmountScore = evaluationData.ratings?.bidAmount || 0;
    console.log("BidAmount",bidAmountScore);
    const timelinessScore = evaluationData.ratings?.timeliness || 0;
    console.log("timeliness",timelinessScore);
    const qualityScore = evaluationData.ratings?.quality || 0;
    console.log("quality",qualityScore);
    const reliabilityScore = evaluationData.ratings?.reliability || 0;
    console.log("reliability",reliabilityScore);
  
    // Calculate the weighted evaluation score
    const evaluationScore = (bidAmountScore * 0.40) +
                            (timelinessScore * 0.20) +
                            (qualityScore * 0.20) +
                            (reliabilityScore * 0.20);
  
    // Return the score formatted to two decimal places
    return evaluationScore.toFixed(2);
  };

  const sortedBids = [...bids].sort((a, b) => a[sortCriterion] - b[sortCriterion]);

  const exportToCSV = () => {
    const csvData = sortedBids.map((bid) => ({
      "Bidder Name": bid.bidderName,
      "Company Name": bid.companyName,
      "Bid Amount": bid.bidAmount,
      "Description": bid.description,
      "Evaluation Score": getBidScore(bid._id),
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

      {noBidsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{noBidsMessage}</h2>
            <button onClick={() => setNoBidsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {modalOpen && selectedBid && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Rate Bid for {selectedBid.bidderName}</h2>

            {criteria.map((criterion) => (
              <div key={criterion.name}>
                <label>{criterion.name}: </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={selectedBid.ratings?.[criterion.name] || ''}
                  onChange={(e) => handleRateBid(criterion.name, e.target.value)}
                />
              </div>
            ))}

            <textarea
              placeholder="Add your comments here..."
              value={comments[selectedBid._id] || ''}
              onChange={(e) => handleCommentChange(e.target.value)}
            ></textarea>

            <div className="modal-actions">
              <button onClick={submitEvaluation}>Submit</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidEvaluationPage;
