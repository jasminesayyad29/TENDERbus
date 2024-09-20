import React from 'react';
import './CreateTenderPage.css';

const CreateTenderPage = () => {
  return (
    <div className="create-tender-container">
      <h2>Create Tender</h2>
      <form>
        <input type="text" placeholder="Tender Title" />
        <textarea placeholder="Tender Description"></textarea>
        <input type="date" placeholder="Submission Deadline" />
        <button type="submit">Create Tender</button>
      </form>
    </div>
  );
};

export default CreateTenderPage;
