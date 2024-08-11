import React, { useState } from 'react';
import axios from 'axios';

const DonorForm = () => {
  const [donor, setDonor] = useState({
    name: '',
    bloodType: '',
    contactInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/donors', donor);
      alert('Donor registered successfully');
    } catch (error) {
      console.error('Error registering donor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={donor.name} onChange={handleChange} placeholder="Name" required />
      <input name="bloodType" value={donor.bloodType} onChange={handleChange} placeholder="Blood Type" required />
      <input name="contactInfo" value={donor.contactInfo} onChange={handleChange} placeholder="Contact Info" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default DonorForm;
