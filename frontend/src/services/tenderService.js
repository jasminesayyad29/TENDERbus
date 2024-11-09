// src/services/tenderService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tenders'; // Update this URL based on your backend configuration

// Fetch all tenders
export const fetchTenders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the list of tenders
  } catch (error) {
    console.error('Error fetching tenders:', error);
    throw error;
  }
};

// Fetch bids by tenderId
export const fetchBidsByTenderId = async (tenderId) => {
  if (!tenderId) {
    console.error('Error: tenderId is missing');
    throw new Error('tenderId is missing');
  }
  try {
    console.log("tenderid4=>" , tenderId) ;
    console.log("type of tenderId:", typeof(tenderId));
    console.log("url=>" , `http://localhost:5000/api/bids/tender/${tenderId}`) ;

    const response = await axios.get(`http://localhost:5000/api/bids/tender/${tenderId}`);
    console.log("response=>" , response ? response : "nothing");
    return response.data; // Return the list of bids for the specified tender
  } catch (error) {
    console.error('Error fetching bids by tenderId:', error);
    throw error;    
  }
};

export const fetchTendersbymail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`); // Corrected API URL
    return response.data; // Return the list of tenders
  } catch (error) {
    console.error('Error fetching tenders:', error);
    throw error;
  }
};
