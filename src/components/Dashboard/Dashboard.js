// src/components/Dashboard/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Profile Picture:</strong> <img src={user.picture} alt="Profile" />
      </div>
    </div>
  );
};

export default Dashboard;
