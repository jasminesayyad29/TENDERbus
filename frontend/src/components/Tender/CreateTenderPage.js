import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CreateTenderPage.css'; // You can add your own styles here

const CreateTenderPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [sectorType, setSectorType] = useState('');
  const [tenderID, setTenderID] = useState('');
  const [city, setCity] = useState('');
  const [time, setTime] = useState('');
  const [quotation, setQuotation] = useState('');
  const [status, setStatus] = useState('Active');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [document, setDocument] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('sectorType', sectorType);
    formData.append('tenderID', tenderID);
    formData.append('city', city);
    formData.append('time', time);
    formData.append('quotation', quotation);
    formData.append('status', status);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('document', document);

    try {
      await axios.post('http://localhost:5000/api/tenders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Reset the form
      setTitle('');
      setDescription('');
      setType('');
      setSectorType('');
      setTenderID('');
      setCity('');
      setTime('');
      setQuotation('');
      setStatus('Active');
      setStartDate('');
      setEndDate('');
      setDocument(null);
      alert('Tender created successfully');
    } catch (error) {
      console.error('Error creating tender', error);
      alert('Error creating tender');
    }
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  return (
    <div className="create-tender">
      <h1>Create Tender</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
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

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Sector Type */}
        <div className="form-group">
          <label htmlFor="sectorType">Sector Type</label>
          <select
            id="sectorType"
            value={sectorType}
            onChange={(e) => setSectorType(e.target.value)}
            required
          >
            <option value="">Select Sector Type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
          </select>
        </div>

        {/* Tender ID */}
        <div className="form-group">
          <label htmlFor="tenderID">Tender ID</label>
          <input
            type="text"
            id="tenderID"
            value={tenderID}
            onChange={(e) => setTenderID(e.target.value)}
            required
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        {/* Time */}
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* Quotation */}
        <div className="form-group">
          <label htmlFor="quotation">Quotation</label>
          <input
            type="number"
            id="quotation"
            value={quotation}
            onChange={(e) => setQuotation(e.target.value)}
            required
          />
        </div>

        {/* Type */}
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

        {/* Start Date */}
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

        {/* End Date */}
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

        {/* Upload Document */}
        <div className="form-group">
          <label htmlFor="document">Upload Document</label>
          <input type="file" id="document" onChange={handleDocumentChange} required />
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit">Create Tender</button>
        </div>
      </form>
      <Link to="/admin/tender-management">Manage Tenders</Link>
    </div>
  );
};

export default CreateTenderPage;
