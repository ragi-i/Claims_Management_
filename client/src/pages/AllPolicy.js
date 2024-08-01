import React,  { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';



const AllPolicy = () => {
   const [policies, setpolicies] = useState([]);

   useEffect(()=>{
   const fetchPolicies = async(e) =>{
    try {
    const response = await axios.get('http://localhost:8080/user/getallpolicy',{});
    console.log('response',response);
    setpolicies(response.data.policy); 
      
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
   }
   fetchPolicies();
     }, [])

     
  return (
    <div className='home-container'>
        <div className='all-available-policy' style={allAvailablePolicyStyle}>All Available Policy</div>
    <div className='filtered-policy'>
    <div className='view-policies-container'>
      {policies.length > 0 ? ( 
        policies.map((policy)=>(
          <div key={policy._id} className='policy-box'>
            <div className='policy-container'>
            <h2 className='policy-name'>{policy.policyCategory}</h2>
            <p className='policydetail'> PolicyId : {policy.policyId}</p>
            <p className='policydetail'> coverageAmount: {policy.coverageAmount}</p>
            <p className='policydetail'> PremiumAmount : {policy.premium}</p>
           
            </div>
          </div>
        ))

      ):(
        <p>No policies available.</p>
      )} 
    </div>
    </div>
  </div>
  )
}

export default AllPolicy;

const allAvailablePolicyStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
    color: 'darkcyan',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 235, 205, 0.9)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'absolute', // Positioning type
    top: '0px', // Adjust top position
    left: '400px'
  };