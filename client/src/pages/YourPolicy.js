
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ClaimModal from './ClaimModal';
import './YourPolicy.css';

const YourPolicy = () => {
  const [boughtPolicies, setBoughtPolicies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    const fetchBoughtPolicies = async () => {
      const user = JSON.parse(localStorage.getItem('Profile'));
      try {
        const response = await axios.get(`https://claims-management-0yw1.onrender.com/user/getBoughtPolicies/${user.userId}`);
        console.log('response', response);
        setBoughtPolicies(response.data.policies);
      } catch (error) {
        console.error('Error fetching bought policies:', error);
      }
    };
    fetchBoughtPolicies();
  }, []);

  const openModal = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPolicy(null);
  };

  const handleClaimPolicy = async (claimDetails) => {
    try {
      const response = await axios.post('https://claims-management-0yw1.onrender.com/user/claimpolicy', claimDetails);
      console.log('Claim submitted successfully:', response.data);
      alert('Claim submitted successfully');
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Error submitting claim. Please try again.');
    }
  };

  return (
    <div className='yourpolicy-container'>
      <Navbar />
      <div className='view-bought-policies-container'>
      <div className='box-container'>
        {boughtPolicies.length > 0 ? (
          boughtPolicies.map((policy) => (
            <div key={policy._id} className='policies-boxes'>
               <div className='policies-container'>
              <h2 className='policyname'>{policy.policyCategory}</h2>
              <p className='policydetails'>PolicyId: {policy.policyId}</p>
              <p className='policydetails'>Coverage Amount: {policy.coverageAmount}</p>
              <p className='policydetails'>Premium Amount: {policy.premium}</p>
              <button className='policy-button' onClick={() => openModal(policy)}>Claim Policy</button>
            </div>
            </div>
          ))
        ) : (
          <p>No policies bought.</p>
        )}
        </div>
      </div>
      {selectedPolicy && (
        <ClaimModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          onSubmit={handleClaimPolicy}
          userId={JSON.parse(localStorage.getItem('Profile')).userId}
          policyId={selectedPolicy.policyId}
          coverageAmount={selectedPolicy.coverageAmount}
          policyCategory={selectedPolicy.policyCategory}
        />
      )}
    </div>
  );
};

export default YourPolicy;
