// // import React, { useState } from 'react';
// // import './LoginPage.css'; // Assuming you'll have a similar style like `Login.css`
// // import { useTender } from '../context/TenderContext';

// // const LoginPage = () => {
// //   const { login } = useTender(); // Use the login function from context
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //     role: 'bidder',
// //   });
// //   const [error, setError] = useState('');

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Mock authentication logic
// //     const { email, password, role } = formData;
// //     const user = { email, role: email.includes('@admin.com') ? 'tender-officer' : 'bidder' };

// //     // if (password === 'password') {
// //       // login(user); // Log in user

// //       try {
// //         // Example API request
// //         await axios.post("http://localhost:5000/api/login", {
// //           email,
// //           password,
// //           role,
// //       });
// //       alert('Registration successful!');
// //       navigate('/login');
// //     } catch (error) {
// //       console.error('Registration failed', error);

// //       if (error.response && error.response.data.message) {
// //         setError(error.response.data.message);
// //       } else {
// //         setError('Registration failed. Please try again.');
// //       }
// //     }
// //       window.location.href = user.role === 'tender-officer' ? '/admin-dashboard' : '/bidder-dashboard'; // Redirect based on role
// //     // } else {
// //     //   setError('Invalid email or password');
// //     // }
// //   };

// //   return ( 
// //   <>

// //     <h2>Login Here</h2>
// //     <div className="login-container">
      
// //       <form onSubmit={handleSubmit} className="login-form">
// //         <div className="form-group">
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="role">Role</label>
// //           <select
// //             name="role"
// //             value={formData.role}
// //             onChange={handleChange}
// //           >
// //             <option value="bidder">Bidder</option>
// //             <option value="admin">Tender Officer</option>
// //           </select>
// //         </div>
// //         {error && <p className="error">{error}</p>} {/* Display error */}
// //         <button type="submit">Login</button>
// //         <p>
// //           Don't have an account? <a href="/Register">Sign up</a>
// //         </p>
// //       </form>
// //     </div>
// //     </>
// //   );
// // };

// // export default LoginPage;
// import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
// import './LoginPage.css'; // Assuming you'll have a similar style like `Login.css`
// import { useTender } from '../context/TenderContext';
// import axios from 'axios'; // Import axios

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useTender(); // Use the login function from context
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: 'bidder',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => { // Mark as async
//     e.preventDefault();

//     const { email, password, role } = formData;
//     const user = { email, role }; // Use selected role

//     try {
//       // Example API request
//       await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//         role,
//       });
//       alert('Login successful!'); // Change alert message
//       // Redirect based on role after successful login
//       // window.location.href = user.role === 'admin' ? '/admin-dashboard' : '/bidder/dashboard';
//       navigate(role === 'admin' ? '/admin/dashboard' : '/bidder/dashboard');
//     } catch (error) {
//       console.error('Login failed', error);
//       setError(error.response?.data?.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <>
//       <h2>Login Here</h2>
//       <div className="login-container">
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="role">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="bidder">Bidder</option>
//               <option value="admin">Tender Officer</option>
//             </select>
//           </div>
//           {error && <p className="error">{error}</p>} {/* Display error */}
//           <button type="submit">Login</button>
//           <p>
//             Don't have an account? <a href="/Register">Sign up</a>
//           </p>
//         </form>
//       </div>
//     </>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import './LoginPage.css';
import { useTender } from '../context/TenderContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useTender(); // Use the login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'bidder',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => { // Mark as async
    e.preventDefault();
    const { email, password, role } = formData;

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role,
      });

        console.log(role)
      // Assuming the response contains user data, you can store it
      const user = response.data.user; // Adjust this according to your API response
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user)); // Store user details in local storage

      alert('Login successful!');
      navigate(role === 'admin' ? '/admin/dashboard' : '/bidder/dashboard'); // Navigate based on role
    } catch (error) {
      console.error('Login failed', error);
      if (error.response) {
        // API returned a response
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection.');
      } else {
        // Something else happened in setting up the request
        setError('Error occurred: ' + error.message);
      }
    }
  };

  return (
    <>
      <h2>Login Here</h2>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="bidder">Bidder</option>
              <option value="admin">Tender Officer</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>} {/* Display error */}
          <button type="submit">Login</button>
          <p>
            Don't have an account? <a href="/Register">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

