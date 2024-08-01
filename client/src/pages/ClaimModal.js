// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// Modal.setAppElement('#root');

// const ClaimModal = ({ isOpen, onRequestClose, onSubmit, userId, policyId, coverageAmount, coverageAmount }) => {
//     // const user = JSON.parse(localStorage.getItem('profile')
//   const [claimDetails, setClaimDetails] = useState({
//     userId: userId,
//     policyId: policyId,
//     claimReason: '',
//     claimAmount: '',
//     coverageAmount: coverageAmount,
//     remAmount: '',
//     status: '',
//     reason: '',
//     description: '',
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setClaimDetails((prevDetails) => ({
//       ...prevDetails,
//       userId: userId,
//       policyId: policyId,
//       coverageAmount: coverageAmount,
//     }));
//   }, [userId, policyId, coverageAmount]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setClaimDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (parseFloat(claimDetails.claimAmount) > parseFloat(claimDetails.coverageAmount)) {
// //       setError('Claim amount cannot be greater than coverage amount.');
// //       alert('Claim amount cannot be greater than coverage amount.');
// //       console.log('')
// //     } else {
// //       setError('');
// //       onSubmit(claimDetails);
// //     }
// //   };


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(coverageAmount);
//     try {
//     if (parseFloat(claimDetails.claimAmount) > parseFloat(claimDetails.coverageAmount)) {
//       setError('Claim amount cannot be greater than coverage amount.');
//       alert('Claim amount cannot be greater than coverage amount.');
//       console.log('Claim amount cannot be greater than coverage amount.')
//     }
//       const response = await axios.post('http://localhost:8080/user/claimpolicy', claimDetails);
//       console.log('Claim submitted successfully:', response.data);
//       alert('Claim submitted successfully');
//       onRequestClose(); // Close the modal after successful submission
//     } catch (error) {
//       console.error('Error submitting claim:', error);
//       alert('Error submitting claim. Please try again.');
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Claim Policy">
//       <h2>Claim Policy</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//       <div>
//           <label>UserId:</label>
//           <input type="text" name="userId" value={claimDetails.userId} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>policyId:</label>
//           <input type="text" name="policyId" value={claimDetails.policyId} onChange={handleChange} required />
//         </div>
//         {/* <div>
//           <label>coverageAmount:</label>
//           <input type="text" name="coverageAmount" value={claimDetails.coverageAmount} onChange={handleChange} required />
//         </div> */}
//         <div>
//           <label>Reason:</label>
//           <input type="text" name="claimReason" value={claimDetails.claimReason} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea name="description" value={claimDetails.description} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Claim Amount:</label>
//           <input type="number" name="claimAmount" value={claimDetails.claimAmount} onChange={handleChange} required />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <button onClick={onRequestClose}>Close</button>
//     </Modal>
//   );
// };

// export default ClaimModal;




import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './ClaimModal.css';

Modal.setAppElement('#root');

const ClaimModal = ({ isOpen, onRequestClose, onSubmit, userId, policyId, coverageAmount,policyCategory }) => {
  const [claimDetails, setClaimDetails] = useState({
    userId: userId,
    policyId: policyId,
    claimReason: '',
    claimAmount: '',
    coverageAmount: coverageAmount,
    policyCategory:policyCategory,
    remAmount: '',
    status: 'Pending',
    reason: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setClaimDetails((prevDetails) => ({
      ...prevDetails,
      userId: userId,
      policyId: policyId,
      coverageAmount: coverageAmount,
      policyCategory:policyCategory
    }));
  }, [userId, policyId, coverageAmount,policyCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(claimDetails.claimAmount) > parseFloat(claimDetails.coverageAmount)) {
      setError('Claim amount cannot be greater than coverage amount.');
      alert('Claim amount cannot be greater than coverage amount.');
      console.log('Claim amount cannot be greater than coverage amount.');
    } else {
      setError('');
      try {
        const response = await axios.post('http://localhost:8080/user/claimpolicy', claimDetails);
        console.log('Claim submitted successfully:', response.data);
        alert('Claim submitted successfully');
        onRequestClose(); // Close the modal after successful submission
      } catch (error) {
        console.error('Error submitting claim:', error);
        alert('Error submitting claim. Please try again.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Claim Policy"
    className="custom-modal">
      <h2>Claim Policy</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
          <label>UserId:</label>
          <input type="text" name="userId" value={claimDetails.userId} onChange={handleChange} required disabled />
        </div>
        
        <div>
          <label>policyId:</label>
          <input type="text" name="policyId" value={claimDetails.policyId} onChange={handleChange}required disabled />
        </div>
        {/* <div>
          <label>coverageAmount:</label>
          <input type="text" name="coverageAmount" value={claimDetails.coverageAmount} onChange={handleChange} required />
        </div> */}

          <div>
          <label>Policy Name:</label>
          <input type="text" name="policyCategory" value={claimDetails.policyCategory} onChange={handleChange} required disabled />
        </div>

        <div>
          <label>Coverage Amount:</label>
          <input type="text" name="coverageAmount" value={claimDetails.coverageAmount} onChange={handleChange} required disabled />
        </div>
       
        <div>
          <label>Claim Amount:</label>
          <input type="number" name="claimAmount" value={claimDetails.claimAmount} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Reason:</label>
          <input type="text" name="claimReason" value={claimDetails.claimReason} onChange={handleChange} required />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={claimDetails.status} onChange={handleChange} required disabled />
        </div>
     
        <div className='button-container'>
        <button type="submit" className='submit-button'>Submit</button>
        <button className='close-button' onClick={onRequestClose} >Close</button>
        </div>
      </form>
      
    </Modal>
  );
};

export default ClaimModal;

