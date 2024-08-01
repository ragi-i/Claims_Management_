import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AcceptedClaimsModal.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const AcceptedClaimsModal = ({ isOpen, onRequestClose }) => {
  const [acceptedClaims, setAcceptedClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchAcceptedClaims = async () => {
        try {
          const response = await axios.get('https://claims-management-0yw1.onrender.com/admin/getapprovedclaims');
          setAcceptedClaims(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching accepted claims');
          setLoading(false);
        }
      };

      fetchAcceptedClaims();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Accepted Claims">
        <div className='acceptedclaims-image'>
       <div className='acceptedclaims-name'>
        All Accepted Claims
      </div> 
      <div className='acceptedclaims-history'>
      <div className='view-acceptedclaims-container'>
      { acceptedClaims.length > 0 ? (
         acceptedClaims.map((claim) => (
            <div key={claim.claimId} className='acceptedclaims-container'>
              <div className='acceptedclaims-sidebox'>
              <p className='acceptedclaims-details'>userId: {claim.user.userId}</p>
              <p className='acceptedclaims-details'>ClaimId: {claim.claimId}</p>
              <p className='acceptedclaims-details'>PolicyId: {claim.policy.policyId}</p>
             
              <p className='acceptedclaims-details'>Claim Amount: {claim.claimDetails.claimAmount}</p>
              <p className='acceptedclaims-details'>Status: {claim.status}</p>
            </div>
            </div>
          ))
      ) : (
        <p>No accepted claims.</p>
      )}
       </div>
      </div>
      </div>
      <button onClick={onRequestClose} className='closing-button'>Close</button>
    </Modal>
  );
};

export default AcceptedClaimsModal;
