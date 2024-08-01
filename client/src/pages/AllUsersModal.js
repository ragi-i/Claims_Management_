import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AllUserModal.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const AllUsersModal = ({ isOpen, onRequestClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isOpen) {
        try {
          const response = await axios.get('http://localhost:8080/admin/getalluser');
          setUsers(response.data.user);
          console.log("data:", response.data);
          console.log("user:", response.data.user);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };
    fetchUsers();
  }, [isOpen]);

  return (

    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="All Users">
      <div className='users-image'>
       <div className='users-name'>
        All Users
      </div> 
      <div className='user-history'>
      <div className='view-user-container'>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className='users-container'>
              <div className='users-sidebox'>
              <p className='user-details'>UserId: {user.userId}</p>
              <p className='user-details'>Username: {user.fullname}</p>
              <p className='user-details'>Email: {user.email}</p>
              <p className='user-details'>Contact: {user.contact}</p>
            </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
      </div>
      </div>
      <button onClick={onRequestClose} className='closing-button'>Close</button>
    </Modal>
  );
};

export default AllUsersModal;
