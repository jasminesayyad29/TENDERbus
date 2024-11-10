// src/components/Tender/ModifyTenderPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifyTenderPage.css';
import Swal from 'sweetalert2';

const ModifyTenderPage = () => {
  const navigate = useNavigate();
  const [tenderId, setTenderId] = useState('');
  const [tenderDetails, setTenderDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTenderIdChange = (e) => {
    setTenderId(e.target.value);
  };

  const fetchTenderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tenders/id/${tenderId}`);
      setTenderDetails(response.data);  // Populate form fields with fetched tender details
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching tender details:', error);
      setErrorMessage('Error fetching tender details. Please check the Tender ID.');
      setTenderDetails(null);  // Clear form if fetching fails
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenderDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDocumentChange = (e) => {
    setTenderDetails((prevState) => ({
      ...prevState,
      document: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', tenderDetails.email);
    formData.append('title', tenderDetails.title);
    formData.append('eligibility', tenderDetails.eligibility);
    formData.append('description', tenderDetails.description);
    formData.append('type', tenderDetails.type);
    formData.append('status', 'Active');
    formData.append('startDate', tenderDetails.startDate);
    formData.append('endDate', tenderDetails.endDate);
    if (tenderDetails.document) {
      formData.append('document', tenderDetails.document);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/tenders/${tenderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        title: "Tender Modified Successfully!",
        icon: "success",
        confirmButtonText: "OK"
      });
      setSuccessMessage('Tender has been successfully modified!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/admin/tender-management');
      }, 2000);
    } catch (error) {
      Swal.fire({
        title: "OOPs!!Error while Modifying this tender",
        icon: "error",
        confirmButtonText: "OK"
      });
      console.error('Error updating tender:', error);
      setErrorMessage('Failed to update the tender.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="modify-tender-page">
      <h1>Modify Tender</h1>

      {/* Step 1: Tender ID Input */}
      <div className="form-group">
        <label htmlFor="tenderId">Enter Tender ID:</label>
        <input
          type="text"
          id="tenderId"
          value={tenderId}
          onChange={handleTenderIdChange}
          required
        />
        <button onClick={fetchTenderDetails}>Modify this Tender</button>
      </div>

      {/* Step 2: Display Messages */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Step 3: Tender Modification Form (displayed only if tenderDetails is loaded) */}
      {tenderDetails && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={tenderDetails.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eligibility">Eligibility</label>
            <textarea
              id="eligibility"
              name="eligibility"
              value={tenderDetails.eligibility}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={tenderDetails.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={tenderDetails.type}
              onChange={handleInputChange}
              required
            >
              <option value="Open">Open</option>
              <option value="Limited">Limited</option>
              <option value="Negotiated">Negotiated</option>
              <option value="Restricted">Restricted</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={tenderDetails.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={tenderDetails.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="document">Upload Document</label>
            <input
              type="file"
              id="document"
              onChange={handleDocumentChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit">Update Tender</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ModifyTenderPage;
