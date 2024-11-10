import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CreateTenderPage.css'; // You can add your own styles here
import Swal from 'sweetalert2';

const CreateTenderPage = () => {
  const[email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [eligibility,setEligibility] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('Active');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [document, setDocument] = useState(null);
  const [tenderId, setTenderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email',email);
    formData.append('title', title);
    formData.append('eligibility',eligibility);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('status', status);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('document', document);

    try {
       const response=await axios.post('http://localhost:5000/api/tenders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const createdTenderId = response.data._id;
      Swal.fire({
        title: "Tender Created Successfully!",
        text: `Tender Created Successfully! with tenderId ${createdTenderId}`,
        icon: "success",
        confirmButtonText: "OK"
      });
      // alert(`Tender created successfully! ID: ${createdTenderId}`);
      setTenderId(createdTenderId);

      // Reset the form
      setEmail('');
      setTitle('');
      setEligibility('');
      setDescription('');
      setType('');
      setStatus('Active');
      setStartDate('');
      setEndDate('');
      setDocument(null);
    } catch (error) {
      console.error('Error creating tender', error);
      Swal.fire({
        title: "Tender Creation Failed!",
        text: `Failed to create the tender`,
        icon: "error",
        confirmButtonText: "OK"
      });
    }
    if (new Date(startDate) >= new Date(endDate)) {
      Swal.fire({
        title: "End date must be greater than start",
        text: `Failed to create the tender`,
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
  }
  
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  return (
    <div className="create-tender">
      <h1>Create Tender</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Eligibility Criteria</label>
          <textarea
            id="eligibility"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="document">Upload Document</label>
          <input type="file" id="document" onChange={handleDocumentChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Create Tender</button>
        </div>
      </form>
       {/* Conditionally render the tender ID if it exists */}
       {tenderId && (
        <div>
          <h2>Tender Created!</h2>
          <p>Your tender ID is: <strong>{tenderId}</strong></p>
          <p>Save it for Later!!</p>
        </div>
      )}
      <Link to="/admin/tender-management">Manage Tenders</Link>
    </div>
  );
};

export default CreateTenderPage;
