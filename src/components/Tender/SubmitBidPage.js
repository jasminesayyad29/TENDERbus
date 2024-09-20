import React from 'react';
import './SubmitBidPage.css';

const SubmitBidPage = () => {
  return (
    <div className="submit-bid-container">
      <h2>Submit Bid</h2>
      <form>
        <textarea placeholder="Bid Description"></textarea>
        <input type="number" placeholder="Bid Amount" />
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
};

export default SubmitBidPage;
