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

  if (error) return <p className="error-message">{error}</p>;
  if (!bidDetails) return <p>Loading bid details...</p>;

  return (
    <>
      {/* Title Container */}
      <div className="title-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <h2 className="bidtitle">Your Bids</h2>
      </div>

      <div className="bid-details-container">
        {bidDetails.map((bid) => (
          <div key={bid._id} className="card" onClick={() => openModal(bid)}>
            <h2>Bid Details for Tender: {bid.tenderId}</h2>
            <h3>Bid ID: {bid._id}</h3>
            <h3>Tender: {bid.tenderId}</h3>
          </div>
        ))}

        {selectedBid && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>X</button>
              <h2>Bid Details for Tender: {selectedBid.tenderId}</h2>
              <h3>Bid ID: {selectedBid._id}</h3>
              <h3>Tender: {selectedBid.tenderId}</h3>
              <p><strong>Bidder Name:</strong> {selectedBid.bidderName}</p>
              <p><strong>Company Name:</strong> {selectedBid.companyName}</p>
              <p><strong>Company Registration Number:</strong> {selectedBid.companyRegNumber}</p>
              <p><strong>Email:</strong> {selectedBid.email}</p>
              <p><strong>Phone Number:</strong> {selectedBid.phoneNumber}</p>
              <p><strong>Bid Amount:</strong> ${selectedBid.bidAmount}</p>
              <p><strong>Bid Description:</strong> {selectedBid.description}</p>
              <p><strong>Additional Notes:</strong> {selectedBid.additionalNotes || "None"}</p>
              <p><strong>Expiry Date:</strong> {new Date(selectedBid.expiryDate).toLocaleDateString()}</p>
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
