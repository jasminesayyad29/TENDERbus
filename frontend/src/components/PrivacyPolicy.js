// src/components/PrivacyPolicy.js
import React, { useState, useEffect } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Show Back to Top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const progress = (scrollY / scrollTotal) * 100;
      setScrollProgress(progress);

      if (scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll back to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle accordion sections
  const toggleAccordion = (index) => {
    const accordionItem = document.querySelectorAll('.policy-card')[index];
    accordionItem.classList.toggle('open');
  };

  return (
    <div className="privacy-container">
      {/* Scroll Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="header">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>
      </div>

      {/* Accordion Sections */}
      <div className="privacy-grid">
        {[
          { title: "1. Information We Collect", content: "We collect personal information when you register on our platform, including your name, email address, and contact details. We also collect data about your usage of our services." },
          { title: "2. How We Use Your Information", content: "Your information is used to provide and improve our services, process transactions, communicate with you, and personalize your experience." },
          { title: "3. Data Sharing", content: "We do not sell or rent your personal information to third parties. We may share your information with trusted partners to help us operate our services." },
          { title: "4. Data Security", content: "We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction." },
          { title: "5. Your Rights", content: "You have the right to access, correct, or delete your personal information. You can also withdraw your consent to the processing of your data at any time." },
          { title: "6. Changes to This Policy", content: "We may update our privacy policy from time to time. Any changes will be communicated to you via our platform." },
          { title: "7. Contact Us", content: "If you have any questions about this privacy policy or our data practices, please contact us at support@tenderbus.com." }
        ].map((section, index) => (
          <div className="policy-card" key={index}>
            <h2 onClick={() => toggleAccordion(index)}>{section.title}</h2>
            <div className="policy-content">{section.content}</div>
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop}>
          &#8679;
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicy;
