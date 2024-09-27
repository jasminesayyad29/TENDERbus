import React, { useState } from 'react';
import './RegistrationPage.css';  // Assuming you have CSS for styling
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePasswords = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      e.target.submit(); // Submit the form if passwords match
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <div className="form-container">
          <h1>Sign up</h1>
          <form action="/register" method="POST" onSubmit={validatePasswords}>
            <div className="input-group">
              <label htmlFor="name"><i className="fas fa-user"></i></label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="input-group">
              <label htmlFor="email"><i className="fas fa-envelope"></i></label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password"></label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div className="input-group">
              <label htmlFor="confirm-password"></label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                required
              />
              <i
                className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>
            <div className="input-group checkbox">
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms">
                I agree to all statements in the <Link to="/terms">Terms of service</Link>
              </label>
            </div>
            <button type="submit">Register</button>
          </form>
          <p><Link to="/login">I am already a member</Link></p>  {/* Use Link for internal navigation */}
        </div>
        <div className="image-container">
          <img src="/signup-image.jpg" alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
