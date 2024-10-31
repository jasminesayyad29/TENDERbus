// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './SubmitBidPage.css';

// const SubmitBidPage = () => {
//     const { tenderId } = useParams(); // Get tender ID from URL
//     const [bidderName, setBidderName] = useState('');
//     const [bidAmount, setBidAmount] = useState('');
//     const [description, setDescription] = useState('');
//     const [success, setSuccess] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const bid = { tenderId, bidderName, bidAmount: Number(bidAmount), description };
//             const response = await axios.post('http://localhost:5000/api/bids', bid);
//             setSuccess('Bid submitted successfully!');
//             setError('');
//             console.log(response.data); // Optional: Log the response for debugging
//         } catch (err) {
//             // Improved error handling
//             const message = err.response && err.response.data && err.response.data.message
//                 ? err.response.data.message
//                 : err.message;
//             setError('Failed to submit bid: ' + message);
//             setSuccess('');
//         }
//     };

//     return (
//         <div className="submit-bid-container">
//             <h2>Submit Bid for Tender: {tenderId}</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Your Name"
//                     value={bidderName}
//                     onChange={(e) => setBidderName(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="number"
//                     placeholder="Bid Amount"
//                     value={bidAmount}
//                     onChange={(e) => setBidAmount(e.target.value)}
//                     required
//                 />
//                 <textarea
//                     placeholder="Bid Description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                 ></textarea>
//                 <button type="submit">Submit Bid</button>
//             </form>
//             {success && <p className="success-message">{success}</p>}
//             {error && <p className="error-message">{error}</p>}
//         </div>
//     );
// };

// export default SubmitBidPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faIdCard, faEnvelope, faPhone, faDollarSign, faFile, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './SubmitBidPage.css';

const SubmitBidPage = () => {
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

            setSuccess('Bid submitted successfully!');
            setError('');
            console.log(response.data);
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            setError('Failed to submit bid: ' + message);
            setSuccess('');
        }
    };

    return (
        <div className="submit-bid-container">
            <h2>Submit Bid for Tender: {tenderId}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input
                        type="text"
                        placeholder="Bidder's Full Name"
                        value={bidderName}
                        onChange={(e) => setBidderName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon={faBuilding} className="icon" />
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon={faIdCard} className="icon" />
                    <input
                        type="text"
                        placeholder="Company Registration Number"
                        value={companyRegNumber}
                        onChange={(e) => setCompanyRegNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon={faDollarSign} className="icon" />
                    <input
                        type="number"
                        placeholder="Bid Amount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        required
                    />
                </div>
                <textarea
                    placeholder="Bid Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <textarea
                    placeholder="Additional Notes (Optional)"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                ></textarea>
                <label className="form-group">
                    <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                    Expiry Date:
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </label>
                <div className="form-group">
                    <FontAwesomeIcon icon={faFile} className="icon" />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                    />
                </div>
                <label className="terms">
                    <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={() => setAcceptTerms(!acceptTerms)}
                    />
                    I agree to the <Link to="/terms-of-service">terms and conditions</Link>
                </label>
                <button type="submit">Submit Bid</button>
            </form>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SubmitBidPage;
