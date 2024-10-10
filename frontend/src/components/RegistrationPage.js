import React, { useState } from 'react';
import './RegistrationPage.css';  // Assuming you have CSS for styling
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate from react-router-dom
import axios from 'axios'; // Import axios for API requests

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(''); // To store error messages
  const navigate = useNavigate(); // Hook for navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePasswords = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;

    if (password !== confirmPassword) {
      setError('Passwords do not match'); // Set error message
    } else {
      try {
        // Make API request to register the user
        await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
          name: e.target.name.value,
          email: e.target.email.value,
          password,
        });

        // Handle successful registration (optional)
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page after successful registration
      } catch (error) {
        console.error('Registration failed', error);
        // Improved error handling with specific messages from the server
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Registration failed. Please try again.'); // Set general error message
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <div className="form-container">
          <h1>Sign up</h1>
          <form onSubmit={validatePasswords}>
            <div className="input-group">
              <label htmlFor="name"><i className="fas fa-user"></i></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                aria-label="Your Name" // Added for accessibility
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email"><i className="fas fa-envelope"></i></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                aria-label="Your Email" // Added for accessibility
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password"></label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                aria-label="Password" // Added for accessibility
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
                aria-label="Confirm Password" // Added for accessibility
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
                I agree to all statements in the <Link to="/terms-of-service">Terms of service</Link>
              </label>
            </div>
            <button type="submit">Register</button>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
          </form>
          <p><Link to="/login">I am already a member</Link></p> {/* Use Link for internal navigation */}
        </div>
        <div className="image-container">
          <img src="/signup-image.jpg" alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
