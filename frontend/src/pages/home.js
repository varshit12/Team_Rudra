import React from 'react';
import { Link } from 'react-router-dom';
import DonorList from '../components/DonorList';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Community Seva</h1>
      <Link to="/register">Register as a Donor</Link>
      <DonorList />
    </div>
  );
};

export default Home;
