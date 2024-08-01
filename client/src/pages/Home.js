import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/getallpolicy', {});
        console.log('response', response);
        setPolicies(response.data.policy);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };
    fetchPolicies();
  }, []);

  const handleBuyPolicy = async (policyId) => {
    const user = JSON.parse(localStorage.getItem('Profile'));
    try {
      const response = await axios.post('http://localhost:8080/user/buypolicy', {
        userId: user.userId,
        policyId: policyId,
      });
      if (response.data.message === "You have already bought the policy.") {
        alert("You have already bought this policy.");
      } else {
        console.log('Policy bought successfully:', response);
        alert('Successfully Bought the Policy');
      }
    } catch (error) {
      console.error('Error while Buying policies:', error);
    }
  };

  return (
    <div className='home-container'>
      <Navbar />
        <div className='filtered-policy'>
          <div className='view-policies-container'>
            {policies.length > 0 ? (
              policies.map((policy) => (
                <div key={policy._id} className='policy-box'>
                  <div className='policy-container'>
                    <h2 className='policy-name'>{policy.policyCategory}</h2>
                    <p className='policydetail'> PolicyId : {policy.policyId}</p>
                    <p className='policydetail'> coverageAmount: {policy.coverageAmount}</p>
                    <p className='policydetail'> PremiumAmount : {policy.premium}</p>
                    <button className='policy-button' onClick={() => handleBuyPolicy(policy.policyId)}>Buy Policy</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No policies available.</p>
            )}
          </div>
        </div>
      </div>

  );
};

export default Home;

