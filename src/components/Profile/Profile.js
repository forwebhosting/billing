// src/components/Profile/Profile.js
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <strong>Profile Picture:</strong> <img src={user.picture} alt="Profile" />
      </div>
     
      <div>
        <strong>Name:</strong> {user.name} {/* Assuming displayName is used for the user's name */}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
    </div>
  );
};

export default Profile;
