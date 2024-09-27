// src/components/TermsOfService.js
import React from 'react';
import './TermsOfService.css'; 

const TermsOfService = () => {
  return (
    <>
    <div className="header">
        <h1>Terms and Conditions</h1>
        <p>Welcome to TENDERbus! These terms and conditions outline the rules and regulations for the use of our Tender Management System platform.</p>
      </div>
        <div className="container">

     <div className='term'>

      <div className="card">
        <h2>Definitions</h2>
        <p><strong>"System"</strong> refers to the Tender Management System provided by TENDERbus.</p>
        <p><strong>"User"</strong> refers to individuals or entities using the system to either submit or evaluate tenders.</p>
        <p><strong>"Bidder"</strong> refers to an entity submitting a proposal in response to a tender.</p>
        <p><strong>"Tendering Authority"</strong> refers to the entity that issues the tender.</p>
        <p><strong>"Contract"</strong> refers to the agreement between the tendering authority and the successful bidder.</p>
      </div>

      <div className="card">
        <h2>1. Eligibility to Bid</h2>
        <p>Only companies or individuals registered and pre-qualified with the Tender Management System may submit bids. Proof of eligibility must be provided as outlined in the tender document.</p>
      </div>

      <div className="card">
        <h2>2. Bid Submission</h2>
        <p>All bids must be submitted through the Tender Management System’s online portal by the deadline specified in the tender notice. The system will automatically reject incomplete or late bids.</p>
      </div>

      <div className="card">
        <h2>3. Bid Security</h2>
        <p>Bidders are required to submit bid security in the form of a bank guarantee or earnest money deposit (EMD). Failure to provide bid security will result in automatic rejection.</p>
      </div>

      <div className="card">
        <h2>4. Non-Disclosure Agreement (NDA)</h2>
        <p>All information exchanged through the Tender Management System is confidential. Bidders must sign an NDA before accessing tender documents. Breach of confidentiality may result in legal action.</p>
      </div>

      <div className="card">
        <h2>5. Bid Evaluation and Decision</h2>
        <p>Bids will be evaluated based on technical merit, financial proposal, and compliance with the tender document. Automated and committee evaluations will ensure fairness.</p>
      </div>

      <div className="card">
        <h2>6. Bid Withdrawal and Modification</h2>
        <p>Bidders can withdraw or modify bids before the submission deadline via the system portal. After the deadline, modifications are not allowed.</p>
      </div>

      <div className="card">
        <h2>7. Tender Cancellation</h2>
        <p>The tendering authority reserves the right to cancel the tender at any stage. Bidders will be notified via the system portal.</p>
      </div>

      <div className="card">
        <h2>8. Contract Award and Performance</h2>
        <p>Successful bidders must sign the contract within the specified timeframe. Non-compliance may lead to penalties.</p>
      </div>

      <div className="card">
        <h2>9. Payment Terms</h2>
        <p>Payment schedules will be outlined in the contract. All transactions will be recorded within the Tender Management System, and payment disputes must be resolved through the system.</p>
      </div>

      <div className="card">
        <h2>10. Dispute Resolution</h2>
        <p>Disputes arising during the tender process must be resolved through the system’s dispute resolution framework.</p>
      </div>

      <div className="card">
        <h2>11. Compliance with Legal Standards</h2>
        <p>Bidders must comply with all applicable laws, including labor laws and environmental regulations. Non-compliance may result in disqualification.</p>
      </div>

      <div className="card">
        <h2>12. Digital Signature</h2>
        <p>Bidders must use verified digital signatures for submission and authentication of documents.</p>
      </div>

      <div className="card">
        <h2>13. Force Majeure</h2>
        <p>Neither party will be liable for delays due to unforeseen circumstances, such as natural disasters or government restrictions.</p>
      </div>

      <div className="card">
        <h2>14. Amendments to the Tender Documents</h2>
        <p>The tender authority may amend the tender documents, and bidders will be notified via the system.</p>
      </div>

      <div className="card">
        <h2>15. Communication and Notifications</h2>
        <p>All communication will be handled through the Tender Management System. Bidders must check the portal regularly for updates.</p>
      </div>

      <div className="card">
        <h2>16. Privacy Policy</h2>
        <p>TENDERbus is committed to protecting the privacy of its users. User data will only be used in accordance with our privacy policy, which outlines how we collect, store, and protect personal information.</p>
      </div>

      <div className="card">
        <h2>17. Intellectual Property Rights</h2>
        <p>All content, documents, and proposals submitted through the Tender Management System remain the intellectual property of the respective authors. However, the tendering authority retains rights to use the submitted documents for evaluation and decision-making purposes.</p>
      </div>

      <div className="card">
        <h2>18. Limitation of Liability</h2>
        <p>In no event shall TENDERbus or the tendering authority be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the system.</p>
      </div>

      <div className="card">
        <h2>19. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the tendering authority operates.</p>
      </div>

      <div className="card">
        <h2>20. Severability</h2>
        <p>If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
      </div>

      <div className="card">
        <h2>21. Acknowledgment</h2>
        <p>By using the Tender Management System, users acknowledge that they have read, understood, and agree to be bound by these terms and conditions.</p>
      </div>
     </div>
    </div>
    </>
  );
};

export default TermsOfService;
