import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';
import './CreateTenderPage.css';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const CreateTenderPage = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('Active');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [document, setDocument] = useState(null);
  const [tenderId, setTenderId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email) {
      setEmail(storedUser.email);
    }
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) >= new Date(endDate)) {
      Swal.fire({
        title: "End date must be greater than start date",
        text: "Failed to create the tender",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('title', title);
    formData.append('eligibility', eligibility);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('status', status);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('document', document);

    try {
      const response = await axios.post('http://localhost:5000/api/tenders', formData, {
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
      }).then(() => {
        window.location.reload(); // Reloads the page after clicking "OK"
      });
      setTenderId(createdTenderId);

      // Fetch emails of all bidders and send acknowledgment email
      await sendAcknowledgmentEmail(createdTenderId);

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
  };

  const sendAcknowledgmentEmail = async () => {
    try {
      // Fetch all bidder emails
      const biddersResponse = await axios.get('http://localhost:5000/api/bidders/emails');
      const bidderEmails = biddersResponse.data.emails;
      console.log('bidder mails', bidderEmails);
  
      // Include the form filler’s email in the list
      const recipients = [email, ...bidderEmails, ];  // Add form filler email to the recipients
      console.log('all receipants mails', recipients);
  
      // Ensure emails are joined by commas as a string
      const recipientsString = recipients.join(',');
      console.log('All ', recipientsString);

  
      const emailParams = {
        to_emails: recipientsString,  // Comma-separated list of emails
        user_email: email,
        tender_title: title,
        tender_eligibility: eligibility,
        tender_description: description,
        tender_type: type,
        tender_status: status,
        tender_startDate: startDate,
        tender_endDate: endDate,
      };
  
      await emailjs.send('service_vnehurc', 'template_4qpjzma', emailParams, 'fn2uxIMhd1q5E1SW9');
      console.log('Email sent successfully to all bidders and the form filler!');
    } catch (error) {
      console.error('Error fetching bidder emails or sending email:', error);
    }
  };
  

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  return (
    <div className="create-tender">
      <h1>Create Tender</h1>
      <form onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={
              const localmail = json.parse(localStorage.getItem('user').email);
              (e) => setEmail(localmailmail);
            }
            required
          />
        </div> */}
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
          <label htmlFor="eligibility">Eligibility Criteria</label>
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
