import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AllUsersModal from './AllUsersModal';
import RejectedClaimsModal from './RejectedClaimsModal';
import AcceptedClaimsModal from './AcceptedClaimsModal';
import PendingClaimsModal from './PendingClaimsModal';
import AddPolicyModal from './AddPolicyModal';
import './AdminPage.css';

const AdminPage = () => {
  const [isAllUsersModalOpen, setIsAllUsersModalOpen] = useState(false);
  const [isRejectedClaimsModalOpen, setIsRejectedClaimsModalOpen] = useState(false);
  const [isAcceptedClaimsModalOpen, setIsAcceptedClaimsModalOpen] = useState(false);
  const [isPendingClaimsModalOpen, setIsPendingClaimsModalOpen] = useState(false);
  const [isAddPolicyModalOpen, setIsAddPolicyModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored admin info
    localStorage.removeItem('adminToken');
    localStorage.removeItem('Profile');
    
    // Redirect to admin login page
    navigate('/adminlogin');
  };

  return (
    <div className='admin-page'>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="sidenav">
        <Link to="/adminpolicy">Check All Available Policies</Link>
        <Link onClick={() => setIsAddPolicyModalOpen(true)}>Add New Policy</Link>
      </div>
      <div className="content">
        <h1 className='admin-title'>Admin Home!</h1>
        <div className='modal-box-container'>
          <div className='modal-row'>
            <div className='modal-box all-users-box' onClick={() => setIsAllUsersModalOpen(true)}>
              <h2>Show All Users</h2>
            </div>
            <div className='modal-box pending-claims-box' onClick={() => setIsPendingClaimsModalOpen(true)}>
              <h2>Show Pending Claims</h2>
            </div>
          </div>
          <div className='modal-row'>
            <div className='modal-box accepted-claims-box' onClick={() => setIsAcceptedClaimsModalOpen(true)}>
              <h2>Show Accepted Claims</h2>
            </div>
            <div className='modal-box rejected-claims-box' onClick={() => setIsRejectedClaimsModalOpen(true)}>
              <h2>Show Rejected Claims</h2>
            </div>
          </div>
        </div>
        <AllUsersModal 
          isOpen={isAllUsersModalOpen} 
          onRequestClose={() => setIsAllUsersModalOpen(false)} 
        />
        <RejectedClaimsModal 
          isOpen={isRejectedClaimsModalOpen} 
          onRequestClose={() => setIsRejectedClaimsModalOpen(false)} 
        />
        <AcceptedClaimsModal 
          isOpen={isAcceptedClaimsModalOpen} 
          onRequestClose={() => setIsAcceptedClaimsModalOpen(false)} 
        />
        <PendingClaimsModal 
          isOpen={isPendingClaimsModalOpen} 
          onRequestClose={() => setIsPendingClaimsModalOpen(false)} 
        />
        <AddPolicyModal
          isOpen={isAddPolicyModalOpen}
          onRequestClose={() => setIsAddPolicyModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default AdminPage;