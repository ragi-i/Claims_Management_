// src/pages/auth/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/authSlice';
import './AdminLogin.css';
const AdminLogin = () => {
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

    setErrors((prevState) => ({
      ...prevState,
      [id]: "",
      general: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.post('https://claims-management-0yw1.onrender.com/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { token, existingAdmin } = response.data;

        // Store the token and profile info in localStorage
        localStorage.setItem('adminToken', token);
        localStorage.setItem('Profile', JSON.stringify(existingAdmin));

        // Dispatch login action
        dispatch(login(existingAdmin));
        navigate('/adminhome');
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
    <div className="admin-row">
      <form onSubmit={handleSubmit} className='adminform-container'>
        <h1 className='admin-name'>Admin Login</h1>
        <div className='input-box'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            type='email'
            placeholder='Email Address'
            className="text-row"
            id='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-adminlogin-message">{errors.email}</p>}
        </div>

        <div className='input-box'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input
            type='password'
            placeholder='Enter Password'
            className="text-row"
            id='password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-adminlogin-message">{errors.password}</p>}
        </div>

        <div className="btn-container">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
        {errors.general && <p className="error-adminlogin-message">{errors.general}</p>}
        <div>
          <Link to="/adminregister" className="admin-register-link">
            Don't have an Admin account? Register!
          </Link>
        </div>
        <div>
          <Link to="/userlogin" className="user-redirect-link">
            Redirect to user account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
