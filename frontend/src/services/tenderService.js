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
