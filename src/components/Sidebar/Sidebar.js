// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/actions/authActions';

const Sidebar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the SIGN_OUT action to set isAuthenticated to false
    dispatch(signOut());

    // Redirect to the home page after logout
    navigate('/');
  };

  return (
    <nav className={`sidebar ${isAuthenticated ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
