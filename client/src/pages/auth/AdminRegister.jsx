import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AdminRegister.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    general: ""
  });

  const navigate = useNavigate();

  const regexValidations = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    fullname: /^[A-Za-z]+(\s[A-Za-z]+)*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

    // Check for empty fields and existing errors
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
      const response = await axios.post('http://localhost:8080/admin/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Success:', response.data);
        navigate('/adminlogin');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
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
    <div className="admin-register-row">
      <div>
        <form onSubmit={handleSubmit} className='adminform-register-container'>
          <h1 className='admin-register-name'>Admin Register</h1>

          <div className='input-box'>
            <label htmlFor='fullname' className='form-label-register'>FullName</label>
            <input
              type='text'
              className="text-row-register"
              placeholder='Enter Your Name'
              id='fullname'
              value={formData.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <p className="error-adminregister-message">{errors.fullname}</p>}
          </div>

          <div className='input-box'>
            <label htmlFor='email' className='form-label-register'>Email</label>
            <input
              type='email'
              placeholder='Enter Email Address'
              className="text-row-register"
              id='email'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-adminregister-message">{errors.email}</p>}
          </div>

          <div className='input-box'>
            <label htmlFor='password' className='form-label-register'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              className="text-row"
              id='password'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-adminregister-message">{errors.password}</p>}
          </div>

          <div className="btn-container">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
          {errors.general && <p className="error-adminregister-message">{errors.general}</p>}
          <div>
            <Link to="/adminlogin" className="admin-register-link">
              Already have an Admin account? Login!
            </Link>
          </div>
          <div>
            <Link to="/userlogin" className="user-redirect-link">
              Redirect to user account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
