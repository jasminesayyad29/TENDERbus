// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './ViewTenderPage.css';

// const ViewTenderPage = () => {
//   const { tenderId } = useParams(); // Get tender ID from URL
//   const [bids, setBids] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchBids = async () => {
//       try {
//         const response = await axios.get(`/api/bids/${tenderId}`);
//         setBids(response.data);
//       } catch (err) {
//         setError('Failed to fetch bids for this tender');
//       }
//     };
//     fetchBids();   
//   }, [tenderId]);

//   return (
//     <div className="view-tender-container">
//       <h2>Bids for Tender: {tenderId}</h2>
//       {error && <p className="error">{error}</p>}
//       {bids.length > 0 ? (
//         <table className="bids-table">
//           <thead>
//             <tr>
//               <th>Bidder Name</th>
//               <th>Bid Amount</th>
//               <th>Description</th>
//               <th>Submission Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bids.map((bid) => (
//               <tr key={bid._id}>
//                 <td>{bid.bidderName}</td>
//                 <td>${bid.bidAmount}</td>
//                 <td>{bid.description}</td>
//                 <td>{new Date(bid.submissionDate).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No bids available for this tender.</p>
//       )}
//     </div>
//   );
// };

// export default ViewTenderPage;
// src/components/Tender/ViewTenderPage.js
import React, { useEffect, useState } from 'react';
import {fetchTenders} from '../../services/tenderService';
import { useParams } from 'react-router-dom';
import './ViewTenderPage.css';

const ViewTenderPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tenderId } = useParams();


  useEffect(() => {
    const getTenders = async () => {
      try {
        const data = await fetchTenders();
        setTenders(data); // Update state with fetched tenders
      } catch (err) {
        // Set a more informative error message
        setError(`Failed to fetch tenders: ${err.message || err}`);
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false); // Ensure loading is set to false in any case
      }
    };

    getTenders(); // Fetch tenders on component load
  }, [tenderId]);

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>{error}</p>; // Display error message

  return (
    <div className="view-tender-container">
      <h1>Tenders Open Now!</h1>
      {tenders.length === 0 ? (
        <p>No tenders available.</p>
      ) : (
        <div className="tender-card-container">
          {tenders.map((tender) => (
            <div key={tender._id} className="tender-card">
              <h2>Tender ID: {tenderId}</h2>
              <h2>{tender.title}</h2>
              <p>{tender.description}</p>
              <p className="type">Type: {tender.type}</p>
              <p className="status">Status: {tender.status}</p>
              <p>Start Date: {new Date(tender.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(tender.endDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default ViewTenderPage;

