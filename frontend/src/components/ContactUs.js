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
    <section className='contact'>
      <form onSubmit={onSubmit}>

        <h2>Contact Us</h2>
        <div className='.input-box'>
          <label style={{ fontSize: '20px',color:'black' }}>Full Name</label>
          <input type='text' className='field' placeholder='Enter your name' name='name' required></input>
        </div>

        <div className='.input-box'>
          <label style={{ fontSize: '20px',color:'black' }}>Email Address</label>
          <input type='email' className='field' placeholder='Enter your email' name='email'required></input>
        </div>

        <div className='.input-box'>
          <label style={{ fontSize: '20px',color:'black' }}>Your Message</label>
          <textarea name='message' id='' className='fieldmess' placeholder='enter your message' required></textarea>
        </div>

        <button type='submit'>Send Message</button>
      </form>
      {/* Additional Info Section */}

      <div className="additional-info">
          <h3>Other Details</h3>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <p>Address: Walchand College of Engineering, Sangli-416 416</p>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <p>Phone: +91 12389-45670</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="icon" />
            <p>Email: support.tenderbus@gmail.com</p>
          </div>
          <div className="info-item">
            
            <p>Business Hours: Mon - Fri: 9 AM - 6 PM</p>
          </div>
        </div>

    </section>

  );
};

export default ContactUs;
