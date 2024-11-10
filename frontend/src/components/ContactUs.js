// src/components/ContactUs.js
import React from 'react';
import './ContactUs.css';
import Swal from 'sweetalert2'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Importing icons

const ContactUs = () => {
  const [result, setResult] = React.useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "dce8220d-2078-4f19-8031-a0e334212bdc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        title: "Message Sent Successfully",
        text: "Thanks for reaching us",
        icon: "success"
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className='contactus-section'>
      <form onSubmit={onSubmit} className='contactus-form'>

        <h2 className='contactus-title'>Contact Us</h2>
        <div className='contactus-input-container'>
          <label className='contactus-input-label'>Full Name</label>
          <input type='text' className='contactus-input-field' placeholder='Enter your name' name='name' required></input>
        </div>

        <div className='contactus-input-container'>
          <label className='contactus-input-label'>Email Address</label>
          <input type='email' className='contactus-input-field' placeholder='Enter your email' name='email' required></input>
        </div>

        <div className='contactus-input-container'>
          <label className='contactus-input-label'>Your Message</label>
          <textarea name='message' className='contactus-input-textarea' placeholder='Enter your message' required></textarea>
        </div>

        <button type='submit' className='contactus-submit-button'>Send Message</button>
      </form>

      {/* Additional Info Section */}
      <div className="contactus-additional-info-container">
        <h3 className="contactus-additional-info-title">Other Details</h3>
        <div className="contactus-info-item">
          <FaMapMarkerAlt className="contactus-info-icon" />
          <p className="contactus-info-text">Address: Walchand College of Engineering, Sangli-416 416</p>
        </div>
        <div className="contactus-info-item">
          <FaPhoneAlt className="contactus-info-icon" />
          <p className="contactus-info-text">Phone: +91 12389-45670</p>
        </div>
        <div className="contactus-info-item">
          <FaEnvelope className="contactus-info-icon" />
          <p className="contactus-info-text">Email: support.tenderbus@gmail.com</p>
        </div>
        <div className="contactus-info-item">
          <p className="contactus-info-text">Business Hours: Mon - Fri: 9 AM - 6 PM</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
