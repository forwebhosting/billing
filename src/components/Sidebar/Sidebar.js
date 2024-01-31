// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/actions/authActions';
import './Sidebar.css'; // Import the corresponding CSS file

const Sidebar = ({ isOpen, closeSidebar }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the SIGN_OUT action to set isAuthenticated to false
    dispatch(signOut());

    // Redirect to the home page after logout
    navigate('/');
    closeSidebar(); // Close the sidebar after logout
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/dashboard" onClick={closeSidebar}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={closeSidebar}>
            Profile
          </Link>
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
