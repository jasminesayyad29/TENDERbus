// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Footer Links */}
        <ul className="footer-links">
          <li>
            <a href="/about" className="about-link">
              <i className="fas fa-info-circle"></i> About Us
            </a>
          </li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>

        {/* Copyright */}
        <p>&copy; 2024 TENDERbus. All Rights Reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;
