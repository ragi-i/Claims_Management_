

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './PendingClaimsModal.css';

Modal.setAppElement('#root'); // Set the app element for accessibility

const PendingClaimsModal = ({ isOpen, onRequestClose }) => {
  const [pendingClaims, setPendingClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [currentClaimId, setCurrentClaimId] = useState(null);
  // const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchPendingClaims = async () => {
        try {
          const response = await axios.get('https://claims-management-0yw1.onrender.com/admin/getpendingclaims');
          setPendingClaims(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error fetching pending claims');
          setLoading(false);
        }
      };

      fetchPendingClaims();
    }
  }, [isOpen]);

  const handleAcceptClaim = async (claimId) => {
    try {
      await axios.patch('https://claims-management-0yw1.onrender.com/admin/approveclaim', { claimId });
      alert('Claim accepted successfully');
      // Update the pending claims state after acceptance
      setPendingClaims(pendingClaims.filter(claim => claim.claimId !== claimId));
    } catch (err) {
      console.error('Error accepting claim:', err);
      alert('Error accepting claim. Please try again.');
    }
  };

  const handleRejectClaim = async (claimId) => {
    // if (!rejectionReason) {
    //   alert('Please provide a reason for rejection.');
    //   return;
    // }

    try {
      await axios.patch('https://claims-management-0yw1.onrender.com/admin/rejectclaim', { claimId: claimId,
        //  rejectionReason 
        });
      alert('Claim rejected successfully');
      // Update the pending claims state after rejection
      setPendingClaims(pendingClaims.filter(claim => claim.claimId !== currentClaimId));
      // setRejectModalOpen(false);
      // setRejectionReason('');
      setCurrentClaimId(null);
    } catch (err) {
      console.error('Error rejecting claim:', err);
      alert('Error rejecting claim. Please try again.');
    }
  };



  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Pending Claims">
      <div className='pendingclaims-image'>
      <div className='pending-claim'>Pending Claims</div>
      <div className='pendingclaims-history'>
      <div className='view-pendingclaims-container'>
      {pendingClaims.length > 0 ? (
          pendingClaims.map((claim) => (
            <div key={claim.claimId} className='pendingclaim-box'>
              <div className='pendingclaim-sidebox'>
              <p className='pending-claim-details'>UserId: {claim.user.userId}</p>
              <p className='pending-claim-details'>ClaimId: {claim.claimId}</p>
              <p className='pending-claim-details'>PolicyId: {claim.policy.policyId}</p>
              <p className='pending-claim-details'>Policy Name: {claim.policy.category}</p>
              <p className='pending-claim-details'>Claim Amount: {claim.claimDetails.claimAmount}</p>
              <p className='pending-claim-details'>Claim Reason: {claim.claimDetails.claimReason}</p>
              <p className='pending-claim-details'>Status: {claim.status}</p>
              <div className='button'>
              <button style={{ color: 'green' }}  className='accept-button' onClick={() => handleAcceptClaim(claim.claimId)}>Accept</button>
              <button style={{ color: 'red' }} className='reject-button' onClick={() => handleRejectClaim(claim.claimId)}>Reject</button>
              </div>
            </div>
            </div>
          ))
       
      ) : (
        <p>No pending claims.</p>
      )}
      </div>
      </div>
      <button onClick={onRequestClose} className='clo-button'>Close</button>

      </div>
    </Modal>
  );
};

export default PendingClaimsModal;


