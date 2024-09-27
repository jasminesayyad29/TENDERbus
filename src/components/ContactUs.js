// src/components/ContactUs.js
import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please fill out the form below or reach out to us.</p>
      </div>
      <div className="contact-grid">
        <div className="info-card">
          <h2>Get in Touch</h2>
          <p><strong>Email:</strong> support@tenderbus.com</p>
          <p><strong>Phone:</strong> +1 (234) 567-8900</p>
          <p><strong>Address:</strong> 123 Tender Lane, Suite 100, Cityville, ST 12345</p>
        </div>
        <div className="form-card">
          <h2>Contact Form</h2>
          <form>
            <label>Name:</label>
            <input type="text" required />
            <label>Email:</label>
            <input type="email" required />
            <label>Message:</label>
            <textarea required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
