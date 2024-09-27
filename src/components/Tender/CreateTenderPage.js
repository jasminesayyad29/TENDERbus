// src/components/Tender/CreateTenderPage.js
import React, { useState, useContext } from 'react';
import { TenderContext } from '../../context/TenderContext';
import { Link } from 'react-router-dom';
import './CreateTenderPage.css';

const CreateTenderPage = () => {
  const { createTender } = useContext(TenderContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('Active');
  const [document, setDocument] = useState(null); // State for document

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare form data to include the document
    const tenderData = {
      title,
      description,
      type,
      status,
      document
    };

    createTender(tenderData);
    
    // Clear form after submission
    setTitle('');
    setDescription('');
    setType('');
    setStatus('Active');
    setDocument(null);
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]); // Store the uploaded file
  };

  return (
    <div className="create-tender">
      <h1>Create Tender</h1>
      <form onSubmit={handleSubmit}>
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
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Open">Open</option>
            <option value="Limited">Limited</option>
            <option value="Negotiated">Negotiated</option>
            <option value="Restricted">Restricted</option>
            <option value="Emergency">Emergency</option>
            {/* Add more types as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="document">Upload Document</label>
          <input
            type="file"
            id="document"
            onChange={handleDocumentChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Create Tender</button>
        </div>
      </form>
      <Link to="/admin/tender-management">Manage Tenders</Link>
    </div>
  );
};

export default CreateTenderPage;
