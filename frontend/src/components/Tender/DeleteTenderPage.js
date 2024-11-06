// src/components/Tender/DeleteTenderPage.js
import React, { useState } from 'react';
import './DeleteTenderPage.css'; // Import the CSS file
import axios from 'axios';

const DeleteTenderPage = () => {
  const [tenderId, setTenderId] = useState('');
  const [reason, setReason] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false); // State for confirmation

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/tenders/${tenderId}`);
      console.log(`Tender ID: ${tenderId} deleted for reason: ${reason}`);
      alert('Tender deleted successfully');
      setTenderId(''); // Clear the form fields after deletion
      setReason('');
      setConfirmDelete(false);
    } catch (error) {
      console.error('Error deleting tender:', error);
      alert('Failed to delete the tender');
    }
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
            <button type="submit" >Yes, Delete</button>
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
