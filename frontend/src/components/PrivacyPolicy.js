import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="header">
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>
      </div>

      {/* Privacy Policy Content */}
      <div className="privacy-content">
        <h2>1. Information We Collect</h2>
        <p>We collect personal information when you register on our platform, including your name, email address, and contact details. We also collect data about your usage of our services.</p>

        <h2>2. How We Use Your Information</h2>
        <p>Your information is used to provide and improve our services, process transactions, communicate with you, and personalize your experience.</p>

        <h2>3. Data Sharing</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information with trusted partners to help us operate our services.</p>

        <h2>4. Data Security</h2>
        <p>We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>5. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. You can also withdraw your consent to the processing of your data at any time.</p>

        <h2>6. Changes to This Policy</h2>
        <p>We may update our privacy policy from time to time. Any changes will be communicated to you via our platform.</p>

        <h2>7. Contact Us</h2>
        <p>If you have any questions about this privacy policy or our data practices, please contact us at support@tenderbus.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
