import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('Profile'));
  const navigate = useNavigate();
  console.log('User:', user);

  const handleLogout = () => {
    localStorage.removeItem('Profile');
    navigate('/userlogin');
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src='./assets/images/21.png' alt='Logo' />
        <div className='user-info'>
          <p>{user.fullname}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <p className='hello-user'>Hello {user.fullname} !</p>
      <div className='navbar-right'>
        <Link to="/yourpolicy" className="nav-link">Your Policies</Link>
        <Link to="/claimhistory" className="nav-link">Claim History</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
