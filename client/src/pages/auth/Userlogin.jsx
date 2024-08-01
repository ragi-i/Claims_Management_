// src/pages/auth/UserLogin.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../../redux/features/authSlice';
import './Userlogin.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));

    // Reset specific field error when user starts typing
    setErrors((prevState) => ({
      ...prevState,
      [id]: "",
      general: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before sending request
    let hasErrors = false;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "This field is required.";
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = "This field is required.";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { fullname, email, userId } = response.data.existingUser;
        const userProfile = { fullname, email, userId };
        localStorage.setItem('Profile', JSON.stringify(userProfile));
        dispatch(login(userProfile)); // Dispatch login action
        navigate('/home');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      if (error.response) {
        setErrors((prevState) => ({
          ...prevState,
          general: error.response.data.message || "An error occurred. Please try again."
        }));
      } else {
        console.error('Error:', error);
        setErrors((prevState) => ({
          ...prevState,
          general: "An error occurred. Please try again."
        }));
      }
    }
  };

  return (
    <>
      <div className="user-row">
        <div>
          <form onSubmit={handleSubmit} className="userform-container">
            <h1 className="heading">User Login</h1>
            <div className='mb-3'>
              <label htmlFor='email' className='userform-label'>Email</label>
              <input
                type='email'
                placeholder='Email Address'
                className="text-row"
                id='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-login-message">{errors.email}</p>}
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='userform-label'>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                className="text-row"
                id='password'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error-login-message">{errors.password}</p>}
            </div>

            <div className="btn-container">
              <button type="submit" className="btn-primary">Submit</button>
            </div>
            {errors.general && <p className="error-login-message">{errors.general}</p>}
            <div>
              <Link to="/userregister" className="user-signup-link">
                Don't have a user account? Register!
              </Link>
            </div>
            <div>
              <Link to="/adminlogin" className="admin-login-link">
                Redirect to admin account? Admin Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
