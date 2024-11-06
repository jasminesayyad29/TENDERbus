// src/components/Tender/ModifyTenderPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ModifyTenderPage.css';

const ModifyTenderPage = () => {
  const [tenderID, setTenderID] = useState('');
  const [tenderDetails, setTenderDetails] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [reason, setReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleModify = (e) => {
    e.preventDefault();
    // Logic to modify the tender goes here (e.g., API call)
    setConfirmation(true); // Show reason input after form submission
  };

  const handleConfirmModification = () => {
    // Logic to finalize the modification could go here (e.g., API call)
    setSuccessMessage("Your tender has been successfully modified!"); // Show success message
  };

  return (
    <div className="modify-tender-page">
      <h1>Modify Tender</h1>
      {!confirmation ? (
        <form onSubmit={handleModify}>
          <label htmlFor="tenderID">Tender ID:</label>
          <input
            type="text"
            id="tenderID"
            value={tenderID}
            onChange={(e) => setTenderID(e.target.value)}
            required
          />

          <label htmlFor="tenderDetails">Tender Details:</label>
          <textarea
            id="tenderDetails"
            value={tenderDetails}
            onChange={(e) => setTenderDetails(e.target.value)}
            required
          ></textarea>

          <button type="submit">Modify Tender</button>
        </form>
      ) : (
        <div>
          <label htmlFor="reason">Reason for modification:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason for modification..."
            required
          ></textarea>
          <div>
            <button type="button" onClick={() => setConfirmation(false)}>
              Go Back
            </button>
            <button type="button" onClick={handleConfirmModification}>
              Confirm Modification
            </button>
          </div>
        </div>
      )}
      {successMessage && <h3>{successMessage}</h3>} {/* Show success message */}
    </div>
  );
};

export default ModifyTenderPage;
