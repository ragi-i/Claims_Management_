import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './UserRegister.css';

 
const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "", 
    password: "",
    contact: ""
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
    general: ""
  });

  const navigate = useNavigate();

  const regexValidations = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    fullname: /^[A-Za-z]+(\s[A-Za-z]+)*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    contact: /^[1-9]\d{9}$/
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    let errorMessage = "";
    if (value === "") {
      errorMessage = "This field is required.";
    } else if (!regexValidations[id].test(value)) {
      switch (id) {
        case 'password':
          errorMessage = "Password must have at least one lower and one upper case letter, one special character, and one number.";
          break;
        case 'fullname':
          errorMessage = "Full name must only contain English alphabets.";
          break;
        case 'email':
          errorMessage = "Invalid email format.";
          break;
        case 'contact':
          errorMessage = "Contact number must be a 10-digit number and not start with 0.";
          break;
        default:
          break;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));

    setErrors((prevState) => ({
      ...prevState,
      [id]: errorMessage,
      general: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = { ...errors };

    // Check for empty fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required.";
        hasErrors = true;
      } else if (errors[field]) {
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      setErrors((prevState) => ({
        ...prevState,
        general: "Please enter your details."
      }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Success:', response.data);
        navigate('/userlogin');
      }
    } catch (error) {
      if (error.response && error.response.status === 302) {
        setErrors((prevState) => ({
          ...prevState,
          general: "User already exists. Please log in with your credentials."
        }));
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <div className="user-register-row">
        <div>
          <form onSubmit={handleSubmit} className="userregisterform-container">
            <h1 className="register-heading">User Register</h1>

            <div>
              <label htmlFor='fullname' className='user-register-form-label'>Full Name</label>
              <input
                type='input'
                className="register-text-row"
                placeholder='Enter Your Name'
                id='fullname'
                value={formData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <p className="error-message">{errors.fullname}</p>}
            </div>

            <div>
              <label htmlFor='email' className='user-register-form-label'>Email</label>
              <input
                type='email'
                placeholder='Email Address'
                className="register-text-row"
                id='email'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor='password' className='user-register-form-label'>Password</label>
              <input
                type='password'
                placeholder='Enter Password'
                className="register-text-row"
                id='password'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor='contact' className='user-register-form-label'>Contact</label>
              <input
                type='input'
                placeholder='Enter Contact Details'
                className="register-text-row"
                id='contact'
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && <p className="error-message">{errors.contact}</p>}
            </div>

            <div className="btn-container">
              <button type="submit" className="register-btn-primary">Register</button>
            </div>

            {errors.general && <p className="error-message">{errors.general}</p>}

            <div>
              <Link to="/userlogin" className="user-Login-link">
                Already have a user account? Login!
              </Link>
            </div>
            <div>
              <Link to="/adminlogin" className="admin-link">
                Redirect to admin account? Admin Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
