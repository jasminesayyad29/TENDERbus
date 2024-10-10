// src/components/Tender/DeleteTenderPage.js
import React, { useState } from 'react';
import './DeleteTenderPage.css'; // Import the CSS file

const DeleteTenderPage = () => {
  const [tenderId, setTenderId] = useState('');
  const [reason, setReason] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false); // State for confirmation

  const handleDelete = (e) => {
    e.preventDefault();
    // Logic for deleting the tender goes here
    console.log(`Deleting Tender ID: ${tenderId} for reason: ${reason}`);
  };

  const handleConfirmation = (e) => {
    e.preventDefault();
    setConfirmDelete(true); // Show confirmation options
  };

  return (
    <div className="delete-tender-page">
      <h1>Delete Tender</h1>
      <form onSubmit={confirmDelete ? handleDelete : handleConfirmation}>
        <div>
          <label htmlFor="tenderId">Tender ID:</label>
          <input
            type="text"
            id="tenderId"
            value={tenderId}
            onChange={(e) => setTenderId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for Deleting:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder="Please provide the reason for deletion..."
          />
        </div>
        
        {confirmDelete ? (
          <div>
            <h3>Are you sure you want to delete this tender?</h3>
            <button type="submit">Yes, Delete</button>
            <button type="button" onClick={() => setConfirmDelete(false)}>No, Cancel</button>
          </div>
        ) : (
          <button type="submit">Confirm Deletion</button>
        )}
      </form>
    </div>
  );
};

export default DeleteTenderPage;
