import React, { useState } from 'react';
import './RegistrationPage.css';  // Assuming you have CSS for styling
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate from react-router-dom
import axios from 'axios'; // Import axios for API requests

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');  // To store error messages
  const navigate = useNavigate();  // Hook for navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePasswords = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role, agreeTerms } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');  // Set error message
    } else {
      try {
        // Example API request
        await axios.post(`${process.env.REACT_APP_API_URL}/api/Auth`, {
          name, email, password, role,
        });

        alert('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.error('Registration failed', error);

        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={validatePasswords} className="signup-form">
        <h2>Register Here!</h2>

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name"><i className="fas fa-user"></i></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email"><i className="fas fa-envelope"></i></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role Dropdown */}
        <div className="form-group">
          <label>Are you a:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="bidder">Bidder</option>
            <option value="tender-officer">Tender Officer</option>
          </select>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password"></label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword"></label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <i
            className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            onClick={toggleConfirmPasswordVisibility}
          ></i>
        </div>

        {/* Agree to Terms Checkbox */}
        <div className="form-group">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeTerms">
            I agree to all statements in the <Link to="/terms-of-service">Terms of service</Link>
          </label>
        </div>

        {/* Register Button */}
        <button type="submit">Register</button>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Already a member */}
        <p>
          <Link to="/login">Already a member? Login</Link>
        </p>
        
      </form>
      <div className="image-container">
          <img src="/signup-image.jpg" alt="Sign up illustration" />
        </div>
    </div>
  );
};

export default RegistrationPage;
