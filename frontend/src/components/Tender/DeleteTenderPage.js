import React, { useState } from 'react';
import './DeleteTenderPage.css'; // Import the CSS file
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DeleteTenderPage = () => {
  const [tenderId, setTenderId] = useState('');
  const [reason, setReason] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false); // State for confirmation

  // Get token from local storage or context
  const token = localStorage.getItem('token'); // Adjust as needed

  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios.delete('http://localhost:5000/api/tenders', {
        data: { id: tenderId }
      });
      Swal.fire({
        title: "Tender deleted Successfully!",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate('/admin/tender-management'); // Navigate after successful deletion
      });
      setTenderId(''); // Clear form fields after deletion
      setReason('');
    } catch (error) {
      console.error('Error deleting tender:', error);
      Swal.fire({
        title: "Failed to delete Tender",
        icon: "error",
        confirmButtonText: "OK"
      });
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
            <a href='/admin/tender-management'><button type="button" >No, Cancel</button></a>
          </div>
        ) : (
          <button type="submit">Confirm Deletion</button>
        )}
      </form>
    </div>
  );
};

export default DeleteTenderPage;
