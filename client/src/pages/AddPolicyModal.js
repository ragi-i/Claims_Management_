import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddPolicyModal.css';

const AddPolicyModal = ({ isOpen, onRequestClose }) => {
  const [policyCategory, setPolicyCategory] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [premium, setPremium] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://claims-management-0yw1.onrender.com/admin/postpolicy', {
        policyCategory,
        coverageAmount,
        premium
      });
      console.log('Policy added successfully:', response);
      setPolicyCategory([]);
      setCoverageAmount([]);
      setPremium([]);
      alert('Policy Added Successfully');
      onRequestClose();
    } catch (error) {
      console.error('Error adding policy:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="addpolicy-modal">
      <h2 className='addpolicy-name'>Add New Policy</h2>
      <form onSubmit={handleSubmit} className='addpolicy-form'>
        <div className="addpolicy-form-group">
          <label className='addpolicy-label' placeholder='Enter Policy Name'>Policy Name</label>
          <input
            type="text"
            className='addpolicy-text'
            value={policyCategory}
            onChange={(e) => setPolicyCategory(e.target.value)}
            required
          />
        </div>
        <div className="addpolicy-form-group">
          <label className='addpolicy-label'>Coverage Amount</label>
          <input
            type="number"
            className='addpolicy-text'
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            required
          />
        </div>
        <div className="addpolicy-form-group">
          <label className='addpolicy-label'>Premium</label>
          <input
            type="number"
            className='addpolicy-text'
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            required
          />
        </div>
        <div className='addpolicy-button'>
        <button type="submit" className='addpolicy-submit' onSubmit={handleSubmit}>Submit</button>
        <button type="button" onClick={onRequestClose} className='addpolicy-close' >Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPolicyModal;
