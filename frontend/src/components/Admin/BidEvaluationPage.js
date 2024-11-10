import React, { useEffect, useState } from 'react';
import { fetchTendersbymail, fetchBidsByTenderId, fetchScoreByBidId } from '../../services/tenderService';
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
  const [bidScores, setBidScores] = useState({}); // New state for scores
  const [visibleBids, setVisibleBids] = useState({}); // Tracks visibility for each tender

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
    if (visibleBids[tenderId]) {
      // If bids are already visible, hide them by setting it to false
      setVisibleBids((prevState) => ({ ...prevState, [tenderId]: false }));
    } else {
      // If bids are not visible, fetch them and show them
      if (!fetchedBidsForTender.has(tenderId)) {
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

          // Fetch and set scores for each bid
          fetchedBids.forEach((bid) => fetchAndSetBidScore(bid._id));
        } catch (err) {
          setBidError("Failed to fetch bids for this tender.");
        }
      }

      // Toggle visibility of bids
      setVisibleBids((prevState) => ({ ...prevState, [tenderId]: true }));
    }
  };
  const getBidScore = async (bidId) => {
    try {
      const evaluationData = await fetchScoreByBidId(bidId);
      if (evaluationData) {
        const score = evaluationData.evaluationScore || 0;
        const comment = evaluationData.comments || ''; // Fetch comment
        return { score, comment };
      } else {
        return { score: 0, comment: '' };
      }
    } catch (error) {
      console.error('Error fetching bid evaluation:', error);
      return { score: 0, comment: '' };
    }
  };
  
  const fetchAndSetBidScore = async (bidId) => {
    const { score, comment } = await getBidScore(bidId);
    setBidScores((prevScores) => ({ ...prevScores, [bidId]: score }));
    setComments((prevComments) => ({ ...prevComments, [bidId]: comment })); // Store comment in state
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

  const handleEvaluateClick = (bid) => {
    setSelectedBid(bid); // Set the bid to be evaluated
    setModalOpen(true);  // Open the modal
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
      ratings: selectedBid.ratings,
      id: selectedBid._id,
      bidId: selectedBid.bidId,
      comments: comments[selectedBid._id] || "",
      evaluationScore: evaluateBid(selectedBid),
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
  
      // Close the modal
      setModalOpen(false);
  
      // Reload the page to reflect changes
      window.location.reload(); // This reloads the page
  
      // Show success message
      alert('Evaluation submitted successfully!');
    } catch (error) {
      setError('Failed to submit evaluation. Please try again later.');
      console.error('Error submitting evaluation:', error);
    }
  };
  
  const evaluateBid = (evaluationData) => {
    const bidAmountScore = evaluationData.ratings?.bidAmount || 0;
    const timelinessScore = evaluationData.ratings?.timeliness || 0;
    const qualityScore = evaluationData.ratings?.quality || 0;
    const reliabilityScore = evaluationData.ratings?.reliability || 0;

    const evaluationScore = (bidAmountScore * 0.40) +
      (timelinessScore * 0.20) +
      (qualityScore * 0.20) +
      (reliabilityScore * 0.20);

    return evaluationScore.toFixed(2);
  };

  const sortedBids = [...bids].sort((a, b) => a[sortCriterion] - b[sortCriterion]);
  const exportToCSV = () => {
    const csvData = sortedBids.map((bid) => {
      const tender = tenders.find(tender => tender._id === bid.tenderId);
  
      return {
        "Bid_id": bid._id,
        "Tender ID": bid.tenderId,
        "Tender Title": tender ? tender.title : 'N/A',
        "Bidder Name": bid.bidderName,
        "Company Name": bid.companyName,
        "Company Reg Number": bid.companyRegNumber,
        "Email": bid.email,
        "Bidder Contact": bid.phoneNumber,
        "Bid Amount": bid.bidAmount,
        "Description": bid.description,
        "Additional Notes": bid.additionalNotes,
        "Expiry Date": new Date(bid.expiryDate).toLocaleDateString(),
        "Created At": new Date(bid.createdAt).toLocaleDateString(),
        "Evaluation Score": bidScores[bid._id] || 'Not Scored',
        "Status": bidScores[bid._id] && bidScores[bid._id] > 6 ? '✔' : bidScores[bid._id] ? '❌' : 'N/A',
        "Comments": comments[bid._id] || '', // Include Comments fetched from the database
      };
    });
  
    return csvData;
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bep-container">
      <h1 className="bep-header">Bid Evaluation</h1>
      <h4 className="bep-header" style={{ color: 'red', fontWeight: 'bold' }}>View The Bids To Be Included in the Csv File and click Export Here 👉 </h4>
      <div className="bep-controls">
        <label>Sort By: </label>
        <select onChange={(e) => setSortCriterion(e.target.value)}>
          <option value="bidAmount">Bid Amount</option>
          <option value="timeliness">Timeliness</option>
          <option value="quality">Quality</option>
          <option value="reliability">Reliability</option>
        </select>
        <CSVLink
          data={exportToCSV()}
          filename={`bid-evaluation-for-${JSON.parse(localStorage.getItem('user'))?.email || 'unknown'}.csv`}
          className="csv-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-csv" viewBox="0 0 16 16">
            <path d="M13 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 12a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1zM6 9h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5zM12 9h1a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5zM9.5 12a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
          </svg>
          Export to CSV
        </CSVLink>

      </div>

      {tenders.length > 0 ? (
        <table className="bep-table">
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
                  <button
                    className={`bep-button ${visibleBids[tender._id] ? 'hide-bids' : 'view-bids'}`}
                    onClick={() => getBidsForTender(tender._id)}
                  >
                    {visibleBids[tender._id] ? 'Hide Bids' : 'View Bids'}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tenders available.</p>
      )}
   {bids.length > 0 && Object.keys(visibleBids).some((tenderId) => visibleBids[tenderId]) && (
  <table className="bep-table">
    <thead>
      <tr>
        <th>Tender Title</th> {/* New column header for Tender Title */}
        <th>Bidder Name</th>
        <th>Company Name</th>
        <th>Bid Amount</th>
        <th>Evaluation Score</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {sortedBids
        .filter((bid) => visibleBids[bid.tenderId]) // Filter bids based on visibility
        .map((bid) => (
          <tr key={bid._id}>
            <td>{tenders.find(tender => tender._id === bid.tenderId)?.title || 'N/A'}</td> {/* Display tender title */}
            <td>{bid.bidderName}</td>
            <td>{bid.companyName}</td>
            <td>{bid.bidAmount}</td>
            <td>{bidScores[bid._id] || 'Not Scored'}</td>
            <td>
              {/* Conditional rendering for Status */}
              {bidScores[bid._id] && bidScores[bid._id] > 6 ? (
                <span style={{ color: 'green' }}>✔</span> // Green tick if score > 6
              ) : bidScores[bid._id] ? (
                <span style={{ color: 'red' }}>❌</span> // Red cross if score <= 6
              ) : (
                'N/A' // If score is not available
              )}
            </td>
            <td>
              <button
                className="bep-button"
                disabled={bidScores[bid._id] && bidScores[bid._id] !== 'Not Scored'}
                onClick={() => handleEvaluateClick(bid)} // Trigger modal only on Evaluate button click
              >
                Evaluate
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
)}

     {modalOpen && selectedBid && (
  <div className="bep-modal open">  {/* Add 'open' class when modal is visible */}
    <div className="bep-modal-content">
      <h2>Rate Bid</h2>
      {criteria.map((criterion) => (
        <div key={criterion.name} className="bep-rating-input">
          <label>{criterion.name}</label>
          <input
            type="number"
            min="1"
            max="10"
            value={selectedBid.ratings?.[criterion.name] || ''}
            onChange={(e) =>
              handleRateBid(criterion.name, parseInt(e.target.value, 10))
            }
          />
        </div>
      ))}
      <div className="bep-comment-input">
        <textarea
          value={comments[selectedBid._id] || ''}
          onChange={(e) => handleCommentChange(e.target.value)}
          placeholder="Enter your comments here..."
        />
      </div>
      <button className="bep-button" onClick={submitEvaluation}>Submit Evaluation</button>
      <button className="bep-button-close" onClick={() => setModalOpen(false)}>Close</button>
    </div>
  </div>
)}


      {noBidsModalOpen && (
        <div className="bep-no-bids-modal">
          <div className="bep-no-bids-message">
            <p>{noBidsMessage}</p>
            <button className="bep-button" onClick={() => setNoBidsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidEvaluationPage;
