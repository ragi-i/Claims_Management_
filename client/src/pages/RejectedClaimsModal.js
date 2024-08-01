import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './RejectedClaimsModal.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const RejectedClaimsModal = ({ isOpen, onRequestClose }) => {
  const [rejectedClaims, setRejectedClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchRejectedClaims = async () => {
        try {
          const response = await axios.get('https://claims-management-0yw1.onrender.com/admin/getrejectedclaims');
          console.log('Fetched data:', response.data);
          setRejectedClaims(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching rejected claims');
          setLoading(false);
        }
      };

      fetchRejectedClaims();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Rejected Claims">
       <div className='rejectedclaims-image'>
       <div className='rejectedclaims-name'>
        All Rejected Claims
      </div> 
      <div className='rejectedclaims-history'>
      <div className='view-rejectedclaims-container'>
      {rejectedClaims.length > 0 ? (
          rejectedClaims.map((claim) => (
            <div key={claim._id} className='rejectedclaims-container'>
              <div className='rejectedclaims-sidebox'>
              <p className='rejectedclaims-details'>ClaimId: {claim.claimId}</p>
              <p className='rejectedclaims-details'>userId: {claim.userId}</p>
              <p className='rejectedclaims-details'>PolicyId: {claim.policyId}</p>
              <p className='rejectedclaims-details'>Claim Amount: {claim.claimAmount}</p>
              <p className='rejectedclaims-details'>Claim Reason: {claim.claimReason}</p>
              <p className='rejectedclaims-details'>Status: {claim.status}</p> 
            </div>
            </div>
          ))
      ) : (
        <p>No rejected claims.</p>
      )}
      </div>
      </div>
      </div>
      <button onClick={onRequestClose} className='closing-button'>Close</button>
    </Modal>
  );
};

export default RejectedClaimsModal;
