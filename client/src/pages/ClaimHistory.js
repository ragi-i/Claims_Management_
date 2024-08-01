import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClaimHistory.css';

const ClaimHistory = ({ onClose }) => {
  const [claims, setClaims] = useState([]);
  const user = JSON.parse(localStorage.getItem('Profile'));
  useEffect(() => {
    const fetchClaimsHistory = async () => {
    
      console.log("user:",user);
      try {
        const response = await axios.post('http://localhost:8080/user/claimhistory', {
          userId: user.userId
        });
        console.log('response:', response);
        setClaims(response.data.claims);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };
    fetchClaimsHistory();
  }, []);

  return (
    <div className='claims-image'>
      <div className='claims-name'>
        Your Claims
      </div> 
      <div className='claim-history'>
    <div className='view-claim-container'>
      {claims.length > 0 ? (
        claims.map((claim) => (
          
          <div key={claim.claimDetails.claimId} className='claims-container'>
            <div className='claims-sidebox'>
            <h3 className='claim-details'>ClaimId: {claim.claimDetails.claimId}</h3>
            <h3 className='claim-details'> UserId: {user.userId}</h3>
            <h3 className='claim-details'>PolicyId: {claim.policyDetails.policyId}</h3>
            <p className='claim-details'>Policy Name: {claim.policyDetails.policyCategory}</p>
            <p className='claim-details'>Coverage Amount: {claim.policyDetails.coverageAmount}</p>
            <p className='claim-details'>Claim Amount: {claim.claimDetails.claimAmount}</p>
            <p className='claim-details'>Status: {claim.claimDetails.status}</p>
          </div>
          </div>
        ))
      ) : (
        <p>No claims found</p>
      )}
      
    </div>
    </div>
    </div>
  );
};

export default ClaimHistory;
