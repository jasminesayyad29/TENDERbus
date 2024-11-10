import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BidDetailsPage.css';
import { fetchbidsbymail } from '../../services/bidService';

const BidDetailsPage = () => {
  const { tenderId, bidderID } = useParams();
  const navigate = useNavigate();
  const [bidDetails, setBidDetails] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve email from user object in localStorage and log it
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const email = storedUser?.email;
    console.log("Email from localStorage:", email);

    if (!email) {
      setError("User email not found in localStorage.");
      return;
    }

    // Fetch tenders based on email
    const getBids = async () => {
      try {
        const data = await fetchbidsbymail(email);
        setBidDetails(data);
      } catch (err) {
        setError(`No Bids found for email: ${email}`);
        console.error("Error fetching bids:", err);
      }
    };

    getBids();
  }, []);

  const openModal = (bid) => {
    setSelectedBid(bid);
  };

  const closeModal = () => {
    setSelectedBid(null);
  };

  if (error) return <p className="bid-details-page-error-message">{error}</p>;
  if (!bidDetails) return <p>Loading bid details...</p>;

  return (
    <>
      {/* Title Container */}
      <div className="bid-details-page-title-container">
        <button className="bid-details-page-back-button" onClick={() => navigate(-1)}> ← Back</button>
        <h2 className="bid-details-page-bidtitle">Your Bids</h2>
      </div>

      <div className="bid-details-page-bid-details-container">
        {bidDetails.map((bid) => (
          <div key={bid._id} className="bid-details-page-card" onClick={() => openModal(bid)}>
          <h2>Bid Details for Tender-Id: <span>{bid.tenderId}</span></h2>
          <h3>Bid ID: <span>{bid._id}</span></h3>
          <h3>Tender: <span>{bid.tenderId}</span></h3>
        </div>
        
        ))}

        {selectedBid && (
          <div className="bid-details-page-modal-overlay" onClick={closeModal}>
            <div className="bid-details-page-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="bid-details-page-close-button" onClick={closeModal}>X</button>
              <p><strong>Bid Details for Tender-Id:</strong> <span className="highlighted-field">{selectedBid.tenderId}</span></p>
<p><strong>Bid ID:</strong> <span className="highlighted-field">{selectedBid._id}</span></p>
<p><strong>Tender:</strong> <span className="highlighted-field">{selectedBid.tenderId}</span></p>

              <p><strong>Bidder Name:</strong> <span>{selectedBid.bidderName}</span></p>
              <p><strong>Company Name:</strong> <span>{selectedBid.companyName}</span></p>
              <p><strong>Company Registration Number:</strong> <span>{selectedBid.companyRegNumber}</span></p>
              <p><strong>Email:</strong> <span>{selectedBid.email}</span></p>
              <p><strong>Phone Number:</strong> <span>{selectedBid.phoneNumber}</span></p>
              <p><strong>Bid Amount:</strong> <span>${selectedBid.bidAmount}</span></p>
              <p><strong>Bid Description:</strong> <span>{selectedBid.description}</span></p>
              <p><strong>Additional Notes:</strong> <span>{selectedBid.additionalNotes || "None"}</span></p>
              <p><strong>Expiry Date:</strong> <span>{new Date(selectedBid.expiryDate).toLocaleDateString()}</span></p>

              {selectedBid.filePath && (
                <p>
                  <a href={`http://localhost:5000/${selectedBid.filePath}`} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BidDetailsPage;
