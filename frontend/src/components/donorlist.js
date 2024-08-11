import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorList = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/donors');
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div>
      <h2>Donor List</h2>
      <ul>
        {donors.map(donor => (
          <li key={donor._id}>{donor.name} ({donor.bloodType})</li>
        ))}
      </ul>
    </div>
  );
};

export default DonorList;
