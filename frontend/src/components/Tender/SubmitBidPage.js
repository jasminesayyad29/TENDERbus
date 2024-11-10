import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faIdCard, faEnvelope, faPhone, faDollarSign, faFile, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './SubmitBidPage.css';
import Swal from 'sweetalert2';

const SubmitBidPage = () => {
    const navigate = useNavigate();
    const { tenderId } = useParams();
    const [bidderName, setBidderName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyRegNumber, setCompanyRegNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [description, setDescription] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [file, setFile] = useState(null);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [bidderId, setBidderId] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            setError('You must agree to the terms and conditions.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('tenderId', tenderId);
            formData.append('bidderName', bidderName);
            formData.append('companyName', companyName);
            formData.append('companyRegNumber', companyRegNumber);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('bidAmount', Number(bidAmount));
            formData.append('description', description);
            formData.append('additionalNotes', additionalNotes);
            formData.append('expiryDate', expiryDate);
            if (file) formData.append('file', file);

            const response = await axios.post('http://localhost:5000/api/bids', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const createdBidderId = response.data.bid._id;
            console.log(createdBidderId);
            setSuccess('Bid submitted successfully!');
            Swal.fire({
                title: "Bid Submitted Successfully!",
                text:`Bid submitted successfully! Bid-id :${createdBidderId}  by Email-id :${email}`,
                icon: "success",
                confirmButtonText: "OK"
              });
            setBidderId(createdBidderId);
            setError('');
            console.log(response.data);
           
            setBidderName('');
            setCompanyName('');
            setCompanyRegNumber('');
            setEmail('');
            setPhoneNumber('');
            setBidAmount('');
            setDescription('');
            setAdditionalNotes('');
            setExpiryDate('');
            setFile(null);
            setAcceptTerms(false);
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            setError('Failed to submit bid: ' + message);
            setSuccess('');
        }
    };

    return ( <div className='submit-bid-page-mega'>
        <div className="submit-bid-page-container">
            <h2>Submit Bid for Tender-id: {tenderId}</h2>
            <form onSubmit={handleSubmit}>
                <div className="submit-bid-form-group submit-bid-form-group-name">
                    <FontAwesomeIcon icon={faUser} className="form-icon" />
                    <input
                        type="text"
                        placeholder="Bidder's Full Name"
                        value={bidderName}
                        onChange={(e) => setBidderName(e.target.value)}
                        required
                    />
                </div>
                <div className="submit-bid-form-group submit-bid-form-group-company">
                    <FontAwesomeIcon icon={faBuilding} className="form-icon" />
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className="submit-bid-form-group submit-bid-form-group-regnumber">
                    <FontAwesomeIcon icon={faIdCard} className="form-icon" />
                    <input
                        type="text"
                        placeholder="Company Registration Number"
                        value={companyRegNumber}
                        onChange={(e) => setCompanyRegNumber(e.target.value)}
                    />
                </div>
                <div className="submit-bid-form-group submit-bid-form-group-email">
                    <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="submit-bid-form-group submit-bid-form-group-phone">
                    <FontAwesomeIcon icon={faPhone} className="form-icon" />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="submit-bid-form-group submit-bid-form-group-amount">
                    <FontAwesomeIcon icon={faDollarSign} className="form-icon" />
                    <input
                        type="number"
                        placeholder="Bid Amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                    />
                </div>
                <textarea
                    className="submit-bid-textarea submit-bid-textarea-description"
                    placeholder="Bid Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <textarea
                    className="submit-bid-textarea submit-bid-textarea-notes"
                    placeholder="Additional Notes (Optional)"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                ></textarea>
                <label className="submit-bid-form-group submit-bid-form-group-expirydate">
                    <FontAwesomeIcon icon={faCalendarAlt} className="form-icon" />
                    Expiry Date:
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </label>
                <div className="submit-bid-form-group submit-bid-form-group-fileupload">
                    <FontAwesomeIcon icon={faFile} className="form-icon" />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                    />
                </div>
                <label className="submit-bid-form-group submit-bid-form-group-terms">
                    <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={() => setAcceptTerms(!acceptTerms)}
                    />
                    <pre>I agree to the </pre><Link to="/terms-of-service">terms and conditions</Link>
                </label>
                <button type="submit" className="submit-bid-button" onClick={() => navigate(`/tender/submit/${tenderId}`)}>
                    Submit Bid
                </button>
            </form>
            {success && <p className="submit-bid-success-message">{success}</p>}
            {error && <p className="submit-bid-error-message">{error}</p>}
            {bidderId && (
                <div className="submit-bid-id-container">
                    <h2>Bid submitted!</h2>
                    <p>Your Bidder ID is: <strong>{bidderId}</strong></p>
                    <p>Save it for later!</p>
                </div>
            )}
            <Link to={`/tender/bid-details`} className="submit-bid-details-link">
                See bid details
            </Link>
        </div>
       
        </div> );
   
};

export default SubmitBidPage;
